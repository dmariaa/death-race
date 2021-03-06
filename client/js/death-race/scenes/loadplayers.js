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

(function() {
  var LoadPlayers = function() {
    Phaser.Scene.call(this, {
      key: "LoadPlayers",
      input: {
        gamepad: true
      }
    });
  };

  LoadPlayers.prototype = Object.create(Phaser.Scene.prototype);
  LoadPlayers.prototype.constructor = LoadPlayers;

  LoadPlayers.prototype.preload = function () {
    // Resources loaded by game manager
    this.players = [];
    this.renderedPlayers = [];
  };

  LoadPlayers.prototype.updatePlayers = function() {
    var xpos = this.game.canvas.width / 2 - 300;
    var ypos = 450;

    for(var i=0, length=this.players.length; i < length; ++i) {
      if(this.players[i] && !this.players[i].rendered) {
        this.add.text(xpos, ypos, "Jugador: {0} \t {1}".format(this.players[i].name, this.getPlayerInfo(this.players[i])),
          { fontFamily: "Orbitron", fontSize: 25 }).setOrigin(0, 0);
        this.players[i].rendered = true;
      }

      ypos += 50;
    }

    if(this.players.length >= 2) {
      this.helpText.setText("<A> para teclado izquierdo\n<LEFT> para teclado derecho\n" +
        "o cualquier boton del gamepad\npara entrar en la partida\n\n\n<SPACE> para iniciar la partida\n<ESC> para salir");
    }
  };

  LoadPlayers.prototype.getPlayerInfo = function(player) {
    var input;

    if(player.gamepad) {
      input = "Gamepad";
    } else if(player.keyboard) {
      if(player.keyboard===Phaser.Input.Keyboard.KeyCodes.A) {
        input = "Keyboard izquierdo";
      } else if(player.keyboard===Phaser.Input.Keyboard.KeyCodes.LEFT) {
        input = "Keyboard derecho";
      }
    }

    return "{0} - Color {1}".format(input, player.color.name);
  };

  LoadPlayers.prototype.create = function() {
    this.background = this.add.image(0, 0, 'general-background');
    this.background.setDisplaySize(this.game.canvas.width,this.game.canvas.height);
    this.background.setOrigin(0);

    // Title
    var textPosition = new Phaser.Math.Vector2(this.game.canvas.width / 2, 20);
    this.add.text(textPosition.x, textPosition.y, "Selección de jugadores", {
      fontFamily: "Orbitron", fontSize: 50
    }).setOrigin(0.5, 0);

    textPosition.y += 100;

    this.helpText = this.add.text(textPosition.x, textPosition.y, "<A> para teclado izquierdo\n<LEFT> para teclado derecho\n" +
      "o cualquier boton del gamepad\npara entrar en la partida\n\n\n<ESC> para salir",
      { fontFamily: "Orbitron", fontSize: 25 }).setOrigin(0.5, 0).setAlign('center');

    this.addCurrentPlayer();
    this.waitForPlayers();

    this.events.on('shutdown', this.shutdown, this);
  };

  LoadPlayers.prototype.shutdown = function() {
  };

  LoadPlayers.prototype.addCurrentPlayer = function() {
    var currentPlayer = this.registry.get('current-player');

    this.players.push({
      keyboard: Phaser.Input.Keyboard.KeyCodes.A,
      player: 0,
      name: currentPlayer.name,
      color: colors[0],
      score: 0
    });

    this.updatePlayers();
  };

  LoadPlayers.prototype.waitForPlayers = function() {
    this.input.gamepad.once('down', function (gamepad) {
      var last = this.players.length;
      for(var i=0; i < last; ++i) {
        if(this.players[i].gamepad && this.players[i].gamepad===gamepad) {
          return;
        }
      }
      this.players.push({
        gamepad: gamepad,
        player: last,
        name: "Player {0}".format(last),
        color: colors[last],
        score: 0
      });
      this.updatePlayers();
      console.log(this.players);
    }, this);

    this.input.keyboard.on('keydown', function(event) {
      if(event.keyCode === Phaser.Input.Keyboard.KeyCodes.A ||
        event.keyCode === Phaser.Input.Keyboard.KeyCodes.LEFT) {
        var last = this.players.length;
        for(var i=0; i < last; ++i) {
          if(this.players[i].keyboard && this.players[i].keyboard===event.keyCode) {
            return;
          }
        }
        this.players.push({
          keyboard: event.keyCode,
          player: last,
          name: "player{0}".format(last),
          color: colors[last],
          score: 0
        });
        console.log(this.players);
        this.updatePlayers();
      } else if(event.keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE) {
        if(this.players.length >= 2) {
          this.scene.get('GameManager').stopMusic('menu-sound');
          this.scene.start("ArenaManager", this.players);
          this.scene.stop();
        } else {
          console.log("Cannot launch with less than 2 players");
        }
      } else if(event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC) {
        this.scene.wake('MainMenu');
        this.scene.stop();
      }
    }, this);
  };

  deathrace.scenes.LoadPlayers = LoadPlayers;
})();
