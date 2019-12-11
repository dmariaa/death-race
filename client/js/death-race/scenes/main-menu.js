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
  var MainMenu = function() {
    Phaser.Scene.call(this, {
      key: "MainMenu",
    });
  };

  MainMenu.prototype = Object.create(Phaser.Scene.prototype);
  MainMenu.prototype.constructor = MainMenu;

  MainMenu.prototype.preload = function () {
    // Resources loaded by game manager
  };

  MainMenu.prototype.create = function() {
    // Show main title
    this.background = this.add.image(0, 0, 'background');
    this.background.setDisplaySize(this.game.canvas.width,this.game.canvas.height);
    this.background.setOrigin(0);

    this.scene.get('LoadPlayers').parentScene = this;
    this.scene.get('GameManager').playMusic('menu-sound', true);

    this.showTitle();

    this.showUser();

    this.menu.create({
      title: "Main menu",
        marginLeft: 100,
        marginBottom: 100,
        options: [
          { id: 'play', label: 'Jugar' },
          { id: 'settings', label: 'Ajustes' },
          { id: 'scores', label: 'Puntuaciones' },
          { id: 'credits', label: 'Créditos' },
          { id: 'exit', label: 'Salir' }
        ]
      }
    );

    this.events.on('menuselected', this.handleMenuSelected, this);
  };

  MainMenu.prototype.showUser = function() {
    var users = this.registry.get('players');
    var currentUser = this.registry.get('current-player');

    this.userName = this.add.text(30, 10, currentUser.name, {
      fontFamily: "Orbitron", fontSize: 50
    });
  };

  MainMenu.prototype.showTitle = function() {
    this.textPosition = new Phaser.Math.Vector2(this.game.canvas.width / 2, this.game.canvas.height / 4);
    var title = this.add.text(this.textPosition.x, this.textPosition.y, "Death Race", {
      fontFamily: "Orbitron", fontSize: 100
    });
    title.setOrigin(0.5, 0.5);
  };

  MainMenu.prototype.handleMenuSelected = function(menuName) {
    switch(menuName) {
      case 'play':
        this.scene.switch('LoadPlayers');
        this.scene.bringToTop('LoadPlayers');
        break;
      case 'scores':
        this.scene.switch('HighScores');
        this.scene.bringToTop('HighScores');
        break;
      case 'settings':
        this.scene.switch('Settings');
        this.scene.bringToTop('Settings');
        break;
      case 'credits':
        this.scene.switch('CreditMenu');
        this.scene.bringToTop('CreditMenu');
        break;
      case 'exit':
        this.scene.get('GameManager').stopMusic('menu-sound');
        this.scene.start('LoginScene');
        this.scene.bringToTop('LoginScene');
        break;
      default:
        console.log("Menu " + menuName + " not handled");
    }
  };

  deathrace.scenes.MainMenu = MainMenu;
})();