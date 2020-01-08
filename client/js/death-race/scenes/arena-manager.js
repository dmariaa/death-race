/*
 * Copyright 2019 dmariaa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var deathrace = deathrace || {};
deathrace.scenes = deathrace.scenes || {};

(function(namespace) {
  var ArenaManager = function() {
    Phaser.Scene.call(this, {
      key: "ArenaManager"
    });

    this.currentRound = 1;
  };

  ArenaManager.prototype = Object.create(Phaser.Scene.prototype);
  ArenaManager.prototype.constructor = ArenaManager;

  ArenaManager.prototype.preload = function() {
    this.currentRound = 1;
    this.playersScores = this.add.group();
  };

  ArenaManager.prototype.create = function(gamedata) {
    this.gamedata = gamedata;
    this.arena = this.scene.get('ArenaHostScene');
    this.currentPlayer = this.registry.get('current-player');

    this.add.rectangle(0, 0, this.game.canvas.width, this.game.canvas.height, 0x000000, 0.65)
      .setOrigin(0,0);

    var textPosition = new Phaser.Math.Vector2(this.game.canvas.width / 2, this.game.canvas.height / 2 - 200);
    this.message = this.add.text(textPosition.x, textPosition.y, "", {
      fontFamily: "Orbitron", fontSize: 70
    }).setOrigin(0.5, 0).setAlign('center');

    var textPosition = new Phaser.Math.Vector2(this.game.canvas.width / 2, this.game.canvas.height - 165);
    this.add.text(textPosition.x, textPosition.y, "<ESPACIO> para seguir jugando\n<ESC> para salir", {fontFamily: "Orbitron", fontSize: 30})
      .setOrigin(0.5, 0).setAlign('center');

    this.launchArena();
  };

  ArenaManager.prototype.showWinner = function() {
    this.message.setText("¡Ronda {0} finalizada!".format(this.currentRound));
    this.drawPlayersScore();
    this.scene.bringToTop();

    this.input.keyboard.on('keydown', function(event) {
      if(event.keyCode===Phaser.Input.Keyboard.KeyCodes.ESC) {
        this.input.keyboard.off('keydown');
        this.saveScores();
        this.scene.stop('ArenaHostScene');
        this.scene.wake('MainMenu');
        this.scene.bringToTop('MainMenu');
        this.scene.stop();

      } else if(event.keyCode===Phaser.Input.Keyboard.KeyCodes.SPACE) {
        this.input.keyboard.off('keydown');
        this.scene.stop('ArenaHostScene');
        this.launchArena();
      }
    }, this);
  };

  ArenaManager.prototype.saveScores = function() {
    for(var i=0, length=this.gamedata.game.players.length; i < length; ++i) {
      var player = this.players[i];
      var date = moment().format('YYYY-MM-DD');
      var data = {
        "player-name": player.name,
        "score": player.score,
        "score-date": date
      };

      $.ajax({
        url: '/high-scores',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data)
      })
    }
  };

  ArenaManager.prototype.drawPlayersScore = function() {
    var textPosition = new Phaser.Math.Vector2(this.game.canvas.width / 2, this.game.canvas.height / 2 - 100);
    var textStyle = { fontFamily: "Orbitron", fontSize: 40 };

    this.playersScores.clear(true, true);

    var sortedPlayers = this.gamedata.game.players.sort(function(a, b) {
      return b.score - a.score;
    });

    for(var i=0, length=sortedPlayers.length; i < length; ++i) {
      var player = sortedPlayers[i];
      var score = this.add.text(textPosition.x, textPosition.y, "{0} - {1}".format(player.name, player.score),
        textStyle).setOrigin(0.5, 0).setAlign('center');
      this.playersScores.add(score);
      textPosition.y += 55;
    }
  };

  ArenaManager.prototype.launchArena = function() {
    var arenaScene = "ArenaClientScene";
    var data = {
      game: this.gamedata.game,
      connection: this.gamedata.connection
    };

    if(this.gamedata.game.players[0].uuid===this.currentPlayer.uuid) {
      arenaScene = "ArenaHostScene";
    }

    this.scene.launch('HUD');
    this.scene.launch(arenaScene, data);

    this.scene.bringToTop(arenaScene);
    this.scene.bringToTop('HUD');

    this.arena.events.once('round-end', function(player) {
      console.log("Received round-end event");
      this.scene.get(arenaScene).pause();
      this.showWinner();
      this.currentRound++;
    }, this);
  };

  namespace.ArenaManager = ArenaManager;
})(deathrace.scenes);
