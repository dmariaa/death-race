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
  var PressAnyKey = function() {
    Phaser.Scene.call(this, {
      key: "PressAnyKey",
      input: { gamepad: true }
    });
  };

  PressAnyKey.prototype = Object.create(Phaser.Scene.prototype);
  PressAnyKey.constructor = PressAnyKey;

  PressAnyKey.prototype.create = function(data) {
    var textString = "Pulsa cualquier tecla para comenzar.";
    var textPosition = new Phaser.Math.Vector2(this.game.canvas.width / 2, this.game.canvas.height / 2);

    var text = this.add.text(textPosition.x, textPosition.y, textString, {
      fontFamily: "Orbitron", fontSize: 52
    });

    text.setOrigin(0.5, 0.5);

    this.input.keyboard.on('keydown', this.handleInput, this);
    this.input.gamepad.on('down', this.handleInput, this);
  };

  PressAnyKey.prototype.handleInput = function() {
    if (game.sound.context.state === 'suspended') {
      game.sound.context.resume();
    }

    if(this.parentScene) {
      this.scene.stop();
      this.parentScene.scene.resume();
    }
  };

  deathrace.scenes.PressAnyKey = PressAnyKey;
})();