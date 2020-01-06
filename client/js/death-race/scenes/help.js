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
  var Help = function() {
    Phaser.Scene.call(this, {
      key: 'Help'
    });
  };

  Help.prototype = Object.create(Phaser.Scene.prototype);
  Help.prototype.constructor = Help;

  Help.prototype.preload = function() {
  };

  Help.prototype.create = function() {
    this.background = this.add.image(0, 0, 'general-background');
    this.background.setDisplaySize(this.game.canvas.width,this.game.canvas.height);
    this.background.setOrigin(0);

    this.background = this.add.image(0, 0, 'help-background');
    this.background.setDisplaySize(this.game.canvas.width,this.game.canvas.height);
    this.background.setOrigin(0);

    var textPosition = new Phaser.Math.Vector2(this.game.canvas.width / 2, this.game.canvas.height - 100);
    this.add.text(textPosition.x, textPosition.y, "<ESC> para salir", {fontFamily: "Orbitron", fontSize: 30})
      .setOrigin(0.5, 0).setAlign('center');

    this.input.keyboard.on('keydown', function (event) {
      if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC) {
        this.scene.wake('MainMenu');
        this.scene.bringToTop('MainMenu');
        this.scene.stop();
      }
    }, this);
  };

  namespace.Help = Help;
})(deathrace.scenes);