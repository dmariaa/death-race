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

var game;
var arenaWidth = 1400;
var arenaHeight = 900;

window.addEventListener('load', function() {
  WebFont.load({
    google: { families: [ 'Orbitron:400,500,700,900' ] },
    active: loadPhaser
  });
});

var loadPhaser = function() {
  game = new Phaser.Game({
    type: Phaser.AUTO,
    pixelArt: true,
    width: arenaWidth,
    height: arenaHeight,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
      deathrace.scenes.Arena,
      deathrace.scenes.MainMenu,
      deathrace.scenes.PlayMenu,
      deathrace.scenes.Loading,
      deathrace.scenes.PressAnyKey,
      deathrace.scenes.Hud
    ],
    plugins: {
      global: [
        { key: 'GameObjectsPlugin', plugin: deathrace.gameobjects.GameObjectsPlugin, start: true }
      ],
      scene: [
        { key: 'MenuPlugin', plugin: deathrace.scenes.plugins.MenuPlugin, mapping: 'menu' }
      ]
    }
  });
};

if(!String.prototype.format) {
  /**
   * Modificación de string para añadir función format
   * Fuente: https://www.iteramos.com/pregunta/1176/javascript-equivalente-a-printfstringformat
   * @return {String}
   * @constructor
   */
  String.prototype.format = function() {
    var formatted = this;

    for (var i = 0; i < arguments.length; i++) {
      var regexp = new RegExp('\\{'+i+'\\}', 'gi');
      formatted = formatted.replace(regexp, arguments[i]);
    }

    return formatted;
  };
}
