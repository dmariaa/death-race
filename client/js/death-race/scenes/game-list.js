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
  var GameList = function() {
    Phaser.Scene.call(this, {
      key: "GameList"
    });

    this.gameFontSize = 19;
    this.gameStyle = { fontFamily: "Orbitron", fontSize: this.gameFontSize };
    this.updateGames = false;
  };

  GameList.prototype = Object.create(Phaser.Scene.prototype);
  GameList.prototype.constructor = GameList;

  GameList.prototype.preload = function() {
    this.gamesGroup = this.add.group();

    // TODO: Move to game manager
    this.load.svg('lock-icon', 'img/icons/lock-24px.svg');
  };

  GameList.prototype.create = function() {
    // BACKGROUND
    this.background = this.add.image(0, 0, 'general-background');
    this.background.setDisplaySize(this.game.canvas.width, this.game.canvas.height);
    this.background.setOrigin(0);

    // TITLE
    var textPosition = new Phaser.Math.Vector2(this.game.canvas.width / 2, 20);
    this.title = this.add.text(textPosition.x, textPosition.y, "Buscando partidas", {
      fontFamily: "Orbitron", fontSize: 50
    }).setOrigin(0.5, 0).setAlign('center');

    // Reposition title
    var bounds = this.title.getBounds();
    this.title.x = bounds.x;
    this.title.setOrigin(0,0).setAlign('left');

    textPosition.y += 60;
    this.add.text(textPosition.x, textPosition.y, "<N> para nueva partida\n<ESC> para salir",
      { fontFamily: "Orbitron", fontSize: 30 }).setOrigin(0.5, 0).setAlign('center');

    textPosition.y += 130;
    this.textPosition = textPosition;

    // Game list
    var domList = this.add.dom(0, 0).createFromCache('games');
    this.gameListPanel = $(domList.node);

    // New game form
    var halfWidth = this.game.canvas.width / 2;
    var halfHeight = this.game.canvas.height / 2;
    var x = halfWidth;
    var y = halfHeight;
    var dom = this.add.dom(x, y).createFromCache('new-game-html');
    this.panel = $(dom.node).children().first();
    this.panel.removeClass('visible');

    // Game manager websocket
    this.connection = new WebSocket('ws://' + location.host + '/game-manager');
    this.connection.onmessage = this.handleMessage.bind(this);

    // Events
    dom.addListener('click');
    dom.on('click', this.handleForm, this);
    domList.addListener('click');
    domList.on('click', this.handleListClick, this);

    this.input.keyboard.on('keydown', this.handleKeys, this);
  };

  GameList.prototype.handleForm = function(event) {
    var target = $(event.target);
    if(target.hasClass('create')) {
      var data = {
        command: 'ADD_GAME',
        player: this.registry.get('current-player').uuid,
        name: this.panel.find('[name="game-name"]').val(),
        private: this.panel.find('[name="game-private"]').prop('checked'),
        minplayers: this.panel.find('[name="min-players"]').val()
      };

      this.connection.send(JSON.stringify(data));
      $(this.panel).removeClass('visible');
    } else if(target.hasClass('cancel')) {
      $(this.panel).removeClass('visible');
    }
  };

  GameList.prototype.handleKeys = function(event) {
    if(event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC) {
      this.scene.wake('MainMenu');
      this.scene.stop();
    } else if(event.keyCode === Phaser.Input.Keyboard.KeyCodes.N) {
      $(this.panel).addClass('visible');
    }
  };

  GameList.prototype.handleMessage = function(msg) {
    var message = JSON.parse(msg.data);
    switch(message.command) {
      case 'GAME_ADDED':
        message.game = message.data[0];
        message.player = this.registry.get('current-player').uuid;
        delete message['data'];
        this.scene.start('PlayerLoading', message);
        this.scene.stop();
        break;
      case 'UPDATE_GAMES':
        this.games = message.data;
        this.updateGamesList();
        break;
    }
  };

  GameList.prototype.handleListClick = function(event) {
    var target = $(event.target);

    if(target.hasClass('game-container')) {
      var gameId = target.attr('data-id');
      var game = this.getGame(gameId);

      if(game) {
        var data = {
          command: 'JOIN_GAME',
          game: game,
          player: this.registry.get('current-player').uuid
        };

        this.scene.start('PlayerLoading', data);
        this.scene.stop();
      } else {
        throw Error("Game {0} missing".format(gameId));
      }
    }
  };

  GameList.prototype.updateGamesList = function() {
    this.gameListPanel.find('.games-container').empty();
    for(var i=0, length=this.games.length; i < length; ++i) {
        var game = this.games[i];
        this.addGame(game);
    }
  };

  GameList.prototype.addGame = function(game) {
    var template = this.gameListPanel.find('.game-template').first();
    var gamePanel = template.clone();

    gamePanel.attr('data-id', game.id);
    gamePanel.find('.game-name').text(game.name);
    gamePanel.find('.game-players-count').text(
      (game.players.length===4 ? '(completo)' : ("({0}/{1} jugadores)".format(game.players.length, 4)))
    );
    gamePanel.find('.game-icon').text(game.private ? 'lock' : '');

    this.gameListPanel.find('.games-container').append(gamePanel);
    gamePanel.removeClass('game-template').addClass('game-container');
  };


  GameList.prototype.update = function(time, delta)
  {
    var numberOfDots = (Math.trunc(time / 350) % 4);
    var dots = "...".substring(0, numberOfDots);
    this.title.setText("Buscando partidas" + dots);
  };

  GameList.prototype.getGame = function(gameId) {
    for(var i=0, length=this.games.length; i<length; ++i) {
      var game = this.games[i];
      if(game.id===gameId) {
        return game;
      }
    }
    return false;
  };

  namespace.GameList = GameList;
})(deathrace.scenes);
