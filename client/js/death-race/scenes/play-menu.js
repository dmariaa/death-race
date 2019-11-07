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
  var PlayMenu = function() {
    Phaser.Scene.call(this, {
      key: "PlayMenu",
      menu: {
        title: "Play Menu",
        marginLeft: 100,
        marginBottom: 100,
        options: [
          { id: 'create', label: 'Crear partida' },
          { id: 'exit', label: 'Volver' }
        ]
      }
    });
  };

  PlayMenu.prototype = Object.create(Phaser.Scene.prototype);
  PlayMenu.prototype.constructor = PlayMenu;

  PlayMenu.prototype.create = function() {
    this.events.on('menuselected', this.handleMenuSelected, this);
  };

  PlayMenu.prototype.handleMenuSelected = function(menuName) {
    switch(menuName) {
      case 'exit':
        this.scene.switch('MainMenu');
        break;
      default:
        console.log("Menu " + menuName + " not handled");
    }
  };

  deathrace.scenes.PlayMenu = PlayMenu;
})();