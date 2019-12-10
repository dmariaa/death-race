/*
 * Copyright 2019 NITROPC
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

(function () {
  var CreditMenu = function () {
    Phaser.Scene.call(this, {key: "CreditMenu"});
  };

  CreditMenu.prototype = Object.create(Phaser.Scene.prototype);
  CreditMenu.prototype.constructor = CreditMenu;

  CreditMenu.prototype.preload = function () {
    // Resources loaded by game manager
  };

  CreditMenu.prototype.create = function () {
    this.background = this.add.image(0, 0, 'background');
    this.background.setDisplaySize(this.game.canvas.width, this.game.canvas.height);
    this.background.setOrigin(0);

    this.showCredit();
    this.BacktoMainMenu();
  };

  CreditMenu.prototype.showCredit = function () {
    this.textPosition = new Phaser.Math.Vector2(this.game.canvas.width / 4, this.game.canvas.height / 4);
    this.textPosition_2 = new Phaser.Math.Vector2(this.game.canvas.width / 2, this.game.canvas.height / 2.5);
    var title = this.add.text(this.textPosition.x, this.textPosition.y, "Créditos:", {
      fontFamily: "Orbitron", fontSize: 100
    });
    var david_name = this.add.text(this.textPosition_2.x, this.textPosition_2.y, "David María Arribas", {
      fontFamily: "Orbitron", fontSize: 50
    });
    var pablo_name = this.add.text(this.textPosition_2.x, this.textPosition_2.y + 100, "Pablo Fernández-Vega Padilla", {
      fontFamily: "Orbitron", fontSize: 50
    });
    var dilan_name = this.add.text(this.textPosition_2.x, this.textPosition_2.y + 200, "Dilan Steven Rodríguez Triana", {
      fontFamily: "Orbitron", fontSize: 50
    });
    var alejandro_name = this.add.text(this.textPosition_2.x, this.textPosition_2.y + 300, "Alejandro Vera López", {
      fontFamily: "Orbitron", fontSize: 50
    });
    title.setOrigin(0.5, 0.5);
    david_name.setOrigin(0.5, 0.5);
    pablo_name.setOrigin(0.5, 0.5);
    dilan_name.setOrigin(0.5, 0.5);
    alejandro_name.setOrigin(0.5, 0.5);

    var textPosition = new Phaser.Math.Vector2(this.game.canvas.width / 2, this.game.canvas.height - 130);
    this.add.text(textPosition.x, textPosition.y, "<ESC> para salir", {fontFamily: "Orbitron", fontSize: 30})
      .setOrigin(0.5, 0).setAlign('center');

  };

  CreditMenu.prototype.BacktoMainMenu = function () {
    this.input.keyboard.on('keydown', function (event) {
      if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC) {
        this.scene.wake('MainMenu');
        this.scene.stop();
      }
    }, this);
  };

  deathrace.scenes.CreditMenu = CreditMenu;
})();