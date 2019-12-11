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

  ArenaManager.prototype.create = function(players) {
    this.players = players;
    this.arena = this.scene.get('ArenaScene');

    this.add.rectangle(0, 0, this.game.canvas.width, this.game.canvas.height, 0x000000, 0.5)
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
        this.scene.stop('ArenaScene');
        this.scene.wake('MainMenu');
        this.scene.stop();

      } else if(event.keyCode===Phaser.Input.Keyboard.KeyCodes.SPACE) {
        this.input.keyboard.off('keydown');
        this.scene.stop('ArenaScene');
        this.launchArena();

      }
    }, this);
  };

  ArenaManager.prototype.drawPlayersScore = function() {
    var textPosition = new Phaser.Math.Vector2(this.game.canvas.width / 2, this.game.canvas.height / 2 - 100);
    var textStyle = { fontFamily: "Orbitron", fontSize: 40 };

    this.playersScores.clear(true, true);

    this.players = this.players.sort(function(a, b) {
      return b.score - a.score;
    });

    for(var i=0, length=this.players.length; i < length; ++i) {
      var player = this.players[i];
      var score = this.add.text(textPosition.x, textPosition.y, "{0} - {1}".format(player.name, player.score),
        textStyle).setOrigin(0.5, 0).setAlign('center');
      this.playersScores.add(score);
      textPosition.y += 55;
    }
  };

  ArenaManager.prototype.launchArena = function() {
    this.scene.launch('HUD');
    this.scene.launch('ArenaScene', this.players);

    this.scene.bringToTop('ArenaScene');
    this.scene.bringToTop('HUD');

    this.arena.events.once('round-end', function(player) {
      console.log("Received round-end event");
      this.scene.get('ArenaScene').pause();
      this.showWinner();
      this.currentRound++;
    }, this);
  };

  namespace.ArenaManager = ArenaManager;
})(deathrace.scenes);