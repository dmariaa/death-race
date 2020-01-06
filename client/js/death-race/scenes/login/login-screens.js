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
deathrace.scenes.login = deathrace.scenes.login || {};

(function (namespace) {
  var LoginScene = function () {
    Phaser.Scene.call(this, {
      key: "LoginScene"
    })
  };

  LoginScene.prototype = Object.create(Phaser.Scene.prototype);
  LoginScene.prototype.constructor = LoginScene;

  LoginScene.prototype.preload = function () {
    // Resources loaded by game manager
  };

  LoginScene.prototype.create = function () {
    this.createBackground();
    this.createTitle();
    this.loadLastPlayer();
  };

  LoginScene.prototype.createBackground = function () {
    this.background = this.add.image(0, 0, 'general-background');
    this.background.setDisplaySize(this.game.canvas.width, this.game.canvas.height);
    this.background.setOrigin(0);
  };

  LoginScene.prototype.createTitle = function () {
    this.textPosition = new Phaser.Math.Vector2(this.game.canvas.width / 2, this.game.canvas.height / 4);
    this.title = this.add.text(this.textPosition.x, this.textPosition.y, "Death Race", {
      fontFamily: "Orbitron", fontSize: 100
    });
    this.title.setOrigin(0.5, 0.5);
  };

  LoginScene.prototype.createDialog = function() {
    var lastPlayers = this.registry.get('players');
    var halfWidth = this.game.canvas.width / 2;
    var halfHeight = this.game.canvas.height / 2;
    var width = halfWidth * 0.5;
    var height = halfHeight * 0.3;
    var x = halfWidth - (width / 2);
    var y = halfHeight - (height / 2) - 50;

    var loginForm = this.add.dom(x,y).createFromCache('login-form-html');
    var node = loginForm.node;
    $(node).addClass('login-form');
    $(node).width(width);
    $(node).css('overflow', 'hidden');

    var keys = Object.keys(lastPlayers);

    for(var i=0, length=keys.length; i < length; ++i) {
      lastPlayer = lastPlayers[keys[i]];

      $(node).find('.login-form-container .current-users')
        .first()
        .append(
          $('<div>', {
            class: 'current-user'
           }).append(
              $('<span>', {
                'data-id': lastPlayer.uuid,
                'class': 'account'
              }).text(lastPlayer.name)
            )
        );
    }

    var currentAccount = "";

    loginForm.on('click', function(event) {
      var target = $(event.target);
      if(target.hasClass('account'))
      {
        if(!target.hasClass('other')) {
          currentAccount = target.attr('data-id');
          var name = target.text();
          $(node).find('input[name="username"]').val(name);
          $(node).find('.set-password-panel .login-form-title span').text(name);
          $(node).find('.login-form-container .username-panel').hide();
          $(node).find('.login-form-container .buttons .button.create').css('visibility', 'hidden');
        } else {
          $(node).find('.set-password-panel .login-form-title span').text("Inicia sesión");
          $(node).find('.login-form-container .username-panel').show();
          $(node).find('.login-form-container .buttons .button.create').css('visibility', 'visible');
        }
        $(node).addClass('panel2');
      } else if(target.hasClass('button')) {
        if(this.validateInput(node)) {
          var username = $(node).find('input[name="username"]').val();
          var password = $(node).find('input[name="password"]').val();

          if(target.hasClass('access')) {
            this.loginUser(currentAccount, username, password);
          } else if(target.hasClass('create')) {
            this.createUser(username, password);
          }
        }
      }
    }, this);

    loginForm.addListener('click');

    this.loginForm = loginForm;
  };

  LoginScene.prototype.createUser = function(username, password) {
    var data = {
      'name': username,
      'password': password,
      'preferences': {
        "game-sound": true,
        "game-sound-volume": 0.5,
        "game-music": true,
        "game-music-volume": 0.5
      }
    };

    var node = this.loginForm.node;

    $.ajax({
      url: '/players',
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data)
    })
      .done(function(data) {
        var players = this.registry.get('players') || {};
        players[data.uuid] = data;

        deathrace.utils.savePlayersToLocalStorage(players);
        this.registry.set('players', players);
        this.registry.set('current-player', data);

        this.scene.start('MainMenu');
        this.scene.stop();
      }.bind(this))
      .fail(function(jqXHR, textStatus, errorThrown) {
        var response = jqXHR.responseJSON;

        switch(jqXHR.status) {
          case 409:
            $(node).find('input[name="username"] + .error-message').text('Este usuario ya existe');
            break;
          default:
        }
      });
  };

  LoginScene.prototype.loginUser = function(uuid, username, password) {
    var data = {
      'uuid': uuid,
      'name': username,
      'password': password
    };

    var node = this.loginForm.node;
    var scene = this;

    $.ajax({
      url: '/players/login',
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data)
    })
      .done(function(data) {
        var players = this.registry.get('players') || {};
        players[data.uuid] = data;

        deathrace.utils.savePlayersToLocalStorage(players);

        this.registry.set('players', players);
        this.registry.set('current-player', data);
        deathrace.utils.saveSession();

        this.scene.start('MainMenu');
        this.scene.stop();
      }.bind(this))
      .fail(function(jqXHR, textStatus, errorThrown) {

      });
  };

  LoginScene.prototype.validateInput = function(loginFormNode) {
    var valid = true;

    var username = $(loginFormNode).find('input[name="username"]').val();
    if(!username || username.trim().length===0) {
      $(loginFormNode).find('input[name="username"] + .error-message').text('El usuario no puede estar vacio');
      valid = false;
    } else {
      $(loginFormNode).find('input[name="username"] + .error-message').text('');
    }

    var password = $(loginFormNode).find('input[name="password"]').val();
    if(!password || password.trim().length===0) {
      $(loginFormNode).find('input[name="password"] + .error-message').text('La password no puede estar vacia');
      valid = false;
    } else {
      $(loginFormNode).find('input[name="password"] + .error-message').text('');
    }

    return valid;
  };

  LoginScene.prototype.loadLastPlayer = function () {
    var currentPlayerUUID = deathrace.utils.getSession();
    if (currentPlayerUUID) {
      $.ajax({
        url: '/players/' + currentPlayerUUID,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json'
      })
        .done(function (data) {
          this.registry.set('current-player', data);
          this.scene.start('MainMenu');
          this.scene.stop();
        }.bind(this))
        .fail(function() {
          this.loadLoginDialog();
        }.bind(this));
    } else {
      this.loadLoginDialog();
    }
  };

  LoginScene.prototype.loadLoginDialog = function() {
    var lastPlayers = window.localStorage.getItem('last-players');

    if (lastPlayers) {
      var requests = $.map(lastPlayers.split(','), function(element) {
        return $.ajax('/players/' + element);
      });

      $.when.apply(
        undefined,
        requests
      ).then(function() {
        if(requests.length===1) {
          arguments = [ arguments ];
        }

        var responses = $.map(arguments, function (response) {
          if(response[1]=='success') {
            return JSON.parse(response[0]);
          }
          return false;
        });

        this.registry.set('players', deathrace.utils.playerArrayToObject(responses));
        this.dialog = this.createDialog();
      }.bind(this));
    } else {
      this.registry.set('players', {});
      this.dialog = this.createDialog();
    }
  };


  namespace.LoginScene = LoginScene;
})(deathrace.scenes.login);
