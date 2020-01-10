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
    this.currentPlayer = this.registry.get('current-player');
    this.gamedata = gamedata;
    this.isHost = (this.gamedata.game.players[0].uuid===this.currentPlayer.uuid);
    this.arenaScene = this.isHost ? 'ArenaHostScene' : 'ArenaClientScene';
    this.arena = this.scene.get(this.arenaScene);

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

    var players = this.arena.getPlayers();
    var playersStart = new Array();

    if(!this.waitingText) {
      this.waitingText = this.add.text(this.game.canvas.width / 2, this.game.canvas.height - 80,
        "Esperando que {0} jugadores estén preparados".format(players.length - playersStart.length),
        {fontFamily: "Orbitron", fontSize: 30})
        .setOrigin(0.5, 0).setAlign('center');
    }

    var waitForSpace = function(msg) {
      var message = JSON.parse(msg.data);
      if(message.command==="START_PRESSED") {
        if(!playersStart.includes(message.player)) {
          playersStart.push(message.player);
        }
        if(playersStart.length===players.length) {
          this.gamedata.connection.removeEventListener('message', waitForSpace);
          this.input.keyboard.off('keydown');
          this.scene.stop(this.arenaScene);
          console.log("LAUNCHING ARENA FROM WAITFORSPACE");
          this.launchArena();
        } else {
          this.waitingText.setText("Esperando que {0} jugadores esten preparados"
            .format(players.length - playersStart.length));
        }
      }
    }.bind(this);

    this.gamedata.connection.addEventListener('message', waitForSpace);
    // this.startPressed = false;

    this.input.keyboard.off('keydown');

    this.input.keyboard.on('keydown', function(event) {
      if(event.keyCode===Phaser.Input.Keyboard.KeyCodes.ESC) {
        this.input.keyboard.off('keydown');
        this.saveScores();
        this.scene.stop(this.arenaScene);
        this.scene.stop('GameList');
        this.gamedata.connection.close();
        this.scene.wake('MainMenu');
        this.scene.bringToTop('MainMenu');
        this.scene.stop();
      } else if(event.keyCode===Phaser.Input.Keyboard.KeyCodes.SPACE && !this.startPressed) {
        // this.startPressed = true;
        this.input.keyboard.off('keydown');
        this.gamedata.connection.send(JSON.stringify({
          command: "START_PRESSED",
          game: this.gamedata.game.id,
          player: this.currentPlayer.uuid
        }));
      }
    }, this);
  };

  ArenaManager.prototype.saveScores = function() {
    var players = this.arena.getPlayers();

    for(var i=0, length=players.length; i < length; ++i) {
      var player = players[i];
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
    var players = this.arena.getPlayers();

    this.playersScores.clear(true, true);

    var sortedPlayers = players.concat().sort(function(a, b) {
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
    var data = {
      game: this.gamedata.game,
      connection: this.gamedata.connection
    };

    this.scene.stop('HUD');
    this.scene.launch('HUD', this.arenaScene);
    this.scene.launch(this.arenaScene, data);

    this.scene.bringToTop(this.arenaScene);
    this.scene.bringToTop('HUD');

    this.arena.events.once('round-end', function(player) {
      console.log("Received round-end event");
      this.scene.pause(this.arenaScene);
      this.showWinner();
      this.currentRound++;
    }, this);
  };

  namespace.ArenaManager = ArenaManager;
})(deathrace.scenes);
