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
  var PlayerLoading = function () {
    Phaser.Scene.call(this, {
      key: "PlayerLoading",
      input: {
        gamepad: true
      }
    });

    this.panels = [];

    this.maxSeconds = 10;
  };

  PlayerLoading.prototype = Object.create(Phaser.Scene.prototype);
  PlayerLoading.prototype.constructor = PlayerLoading;

  PlayerLoading.prototype.create = function(data) {
    this.currentPlayer = this.registry.get('current-player');
    this.data = data;
    this.startGame = false;

    // Create background
    this.background = this.add.image(0, 0, 'general-background');
    this.background.setDisplaySize(game.canvas.width, game.canvas.height);
    this.background.setOrigin(0);

    // Create Title
    var textPosition = new Phaser.Math.Vector2(game.canvas.width / 2, 20);
    var gameName = this.add.text(textPosition.x, textPosition.y, data.game.name, {
      fontFamily: "Orbitron", fontSize: 50
    }).setOrigin(0.5, 0).setAlign('center');

    textPosition.y += 60

    this.title = this.add.text(textPosition.x, textPosition.y, "Esperando jugadores...", {
      fontFamily: "Orbitron", fontSize: 30
    }).setOrigin(0.5, 0).setAlign('center');

    // Reposition title
    var bounds = this.title.getBounds();
    this.title.setOrigin(0, 0).setAlign('left').setPosition(bounds.x, bounds.y);

    this.keyboardMessage = this.add.text(textPosition.x, game.canvas.height - 100, "<ESC> para salir", {
      fontFamily: "Orbitron", fontSize: 30
    }).setOrigin(0.5, 0).setAlign('center');

    var dom = this.add.dom(0, 0).createFromCache('players');
    this.panel = $(dom.node);
    this.panel.css('width', '100%');
    this.panel.find('.game-type').text(data.game.private ? "Partida privada" : "Partida pública");
    this.panel.find('.game-password').text(data.game.private ? "Password: " + data.game.gamePassword : "");

    this.connection = new WebSocket('ws://' + location.host  + '/game-play');
    this.connection.onmessage = this.handleMessage.bind(this);
    this.connection.onopen = this.handleOpen.bind(this);

    this.input.keyboard.on('keydown', this.handleKey, this);
    this.events.on('shutdown', this.handleSceneShutdown, this);
  };

  PlayerLoading.prototype.handleSceneShutdown = function() {
  };

  PlayerLoading.prototype.handleOpen = function(msg) {
    var command = {
      command: "JOIN_GAME",
      game: this.data.game.id,
      player: this.data.player,
      host: this.data.command==="GAME_ADDED" ? true : false
    };

    this.connection.send(JSON.stringify(command));
  };

  PlayerLoading.prototype.handleKey = function(event) {
    if(event.keyCode===Phaser.Input.Keyboard.KeyCodes.ESC) {
      this.connection.close();
      this.scene.wake('MainMenu');
      this.scene.stop();
    }
  };

  PlayerLoading.prototype.handleMessage = function(msg) {
    var message = JSON.parse(msg.data);
    if(message.command==="GAME_JOINED" || message.command==="GAME_LEAVED") {
      var game = message.game;
      this.panel.find('.players-container').empty();
      this.panel.find('.game-type').text(game.private ? "Partida privada" : "Partida pública");
      this.panel.find('.game-password').text(game.private ? "Password: " + game.gamePassword : "");
      this.panel.find('.game-players').text("Jugadores: {0}/{1}".format(game.players.length, game.minPlayers));
      this.isHost = (game.players[0].uuid===this.currentPlayer.uuid);
      this.game = game;

      for(var i=0, length=game.players.length; i<length; i++) {
        game.players[i].color = i;
        game.players[i].score = 0;
        this.addPlayer(game.players[i]);
      }

      if(game.players.length===game.minPlayers) {
        this.startGame = true;
        this.seconds = 0;
      } else {
        this.startGame = false;
      }
    } else if(message.command==="COUNTDOWN") {
      var game = this.game;
      var seconds = message.seconds;
      this.title.setText("Partida completa, comenzando en {0} segundos".format(seconds.toFixed(1)));
      var bounds = this.title.getBounds();
      this.title.setOrigin(0, 0).setAlign('left').setPosition(bounds.x, bounds.y);

      if(seconds <= 0) {
        this.launchGame(game);
      }
    }
  };

  PlayerLoading.prototype.launchGame = function(game) {
    this.scene.get('GameManager').stopMusic('menu-sound');

    this.scene.start("ArenaManager", {
      game: game,
      connection: this.connection
    });

    this.scene.stop();
  };

  PlayerLoading.prototype.addPlayer = function(playerData) {
    var template = this.panel.find('.player-template').first();
    var playerPanel = template.clone();
    playerPanel.find('.player-name').text(playerData.name);
    playerPanel.find('.player-color').css('background-color', deathrace.utils.colors[playerData.color].value.rgba);
    this.panel.find('.players-container').append(playerPanel);
    playerPanel.removeClass('player-template').addClass('player-container');
  };

  // Not used anymore
  PlayerLoading.prototype.showPanel = function(panel)
  {
      this.panels[panel].setVisible(true);
  };

  PlayerLoading.prototype.createPanels = function() {
    // Create panels, hidden
    var marginTop = 90;
    var halfWidth = game.canvas.width / 4;
    var halfHeight = (game.canvas.height - marginTop) / 4;
    var numberOfPanels = 4;
    for(var i=0; i < numberOfPanels; i++) {
      var row = Math.trunc(i / 2);
      var col = Math.trunc(i % 2);

      console.log("Grid ({0},{1})".format(row, col));
      var playerPanel = this.add.playerLoadingPanel(
        (col + 1) * halfWidth,
        marginTop + (row + 1) * halfHeight,
        halfWidth,
        halfHeight).setVisible(false);
      this.panels.push(playerPanel);
    }
  };

  PlayerLoading.prototype.update = function(time, delta)
  {
    if(!this.startGame) {
      var numberOfDots = (Math.trunc(time / 350) % 4);
      var dots = "...".substring(0, numberOfDots);
      this.title.setText("Esperando jugadores" + dots);
      this.prevSeconds = 0;
    } else {
      if(this.isHost) {
        this.seconds += (delta / 1000);

        if(this.seconds - this.prevSeconds >= 0.1) {
          this.prevSeconds = this.seconds;
          this.connection.send(JSON.stringify({
            command: "COUNTDOWN",
            game: this.game.id,
            player: this.currentPlayer.uuid,
            seconds: this.maxSeconds - this.seconds
          }));
        }
      }
    }
  };

  namespace.PlayerLoading = PlayerLoading;
})(deathrace.scenes);
