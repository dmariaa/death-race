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
  var Settings = function() {
    Phaser.Scene.call(this, {
      key: 'Settings'
    });
  };

  Settings.prototype = Object.create(Phaser.Scene.prototype);
  Settings.prototype.constructor = Settings;

  Settings.prototype.preload = function() {
    // Resources loaded by game manager
  };

  Settings.prototype.create = function() {
    var users = this.registry.get('players');
    var currentUser = this.registry.get('current-player');
    var preferences = currentUser.preferences;

    // Create background
    this.background = this.add.image(0, 0, 'general-background');
    this.background.setDisplaySize(this.game.canvas.width, this.game.canvas.height);
    this.background.setOrigin(0);

    // Create Title
    var textPosition = new Phaser.Math.Vector2(this.game.canvas.width / 2, 20);
    this.title = this.add.text(textPosition.x, textPosition.y, "Preferencias", {
      fontFamily: "Orbitron", fontSize: 50
    }).setOrigin(0.5, 0).setAlign('center');

    // Exit
    textPosition.y = this.game.canvas.height - 130;
    this.add.text(textPosition.x, textPosition.y, "<ESC> para salir", { fontFamily: "Orbitron", fontSize: 30 })
      .setOrigin(0.5, 0).setAlign('center');


    var dom = this.add.dom(500,300).createFromCache('settings-html');
    var node = dom.node;
    $(node).width(700);

    $(node).find('input[name="game-music"]').prop('checked', preferences['game-music']);
    $(node).find('input[name="game-music-volume"]').val(preferences['game-music-volume'] * 100);
    $(node).find('input[name="game-sound"]').prop('checked', preferences['game-sound']);
    $(node).find('input[name="game-sound-volume"]').val(preferences['game-sound-volume'] * 100);

    dom.addListener('click change');

    dom.on('click', function(event) {
      var target = $(event.target);
    }, this);

    dom.on('change', function(event) {
      var target = $(event.target);

      var preferences = {
        'game-music': $(node).find('input[name="game-music"]').prop('checked'),
        'game-music-volume': $(node).find('input[name="game-music-volume"]').val() / 100,
        'game-sound': $(node).find('input[name="game-sound"]').prop('checked'),
        'game-sound-volume': $(node).find('input[name="game-sound-volume"]').val() / 100
      };

      currentUser.preferences = preferences;
      users[currentUser.uuid] = currentUser;
      this.registry.set('players', users);
      this.registry.set('current-player', currentUser);
      return true;
    }, this);

    this.input.keyboard.on('keydown', this.handleKeys, this);
  };

  Settings.prototype.handleKeys = function(event) {
    if(event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC) {
      this.scene.wake('MainMenu');
      this.scene.stop();
    }
  };
  namespace.Settings = Settings;
})(deathrace.scenes);