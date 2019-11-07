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

  MainMenu.prototype.create = function() {
    // Show main title
    this.showTitle();

    this.menu.create({
      title: "Main menu",
        marginLeft: 100,
        marginBottom: 100,
        options: [
          { id: 'play', label: 'Jugar' },
          { id: 'settings', label: 'Opciones' },
          { id: 'scores', label: 'Puntuaciones' },
          { id: 'credits', label: 'Créditos' },
          { id: 'exit', label: 'Exit' }
        ]
      }
    );

    this.events.on('menuselected', this.handleMenuSelected, this);
  };

  MainMenu.prototype.showTitle = function() {
    this.textPosition = new Phaser.Math.Vector2(this.game.canvas.width / 2, this.game.canvas.height / 4);
    var title = this.add.text(this.textPosition.x, this.textPosition.y, "Death Race", {
      fontFamily: "Orbitron", fontSize: 50
    });
    title.setOrigin(0.5, 0.5);
  };

  MainMenu.prototype.handleMenuSelected = function(menuName) {
    switch(menuName) {
      case 'play':
        this.scene.switch('PlayMenu');
        break;
      case 'exit':
        game.destroy(true);
      default:
        console.log("Menu " + menuName + " not handled");
    }
  };

  deathrace.scenes.MainMenu = MainMenu;
})();