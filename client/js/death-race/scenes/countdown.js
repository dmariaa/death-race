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
  var Countdown = function() {
    Phaser.Scene.call(this, {
      key: "Countdown"
    });

    this.textString = "{0} segundos para comenzar.";
    this.text;
  };

  Countdown.prototype = Object.create(Phaser.Scene.prototype);
  Countdown.constructor = Countdown;

  Countdown.prototype.create = function(data) {


    var textPosition = new Phaser.Math.Vector2(this.game.canvas.width / 2, this.game.canvas.height / 2);
    this.text = this.add.text(textPosition.x, textPosition.y, "", { fontFamily: "Orbitron", fontSize: 52 });
    this.text.setOrigin(0.5, 0.5);

    this.waiting = true;
    this.wait = 6000;
    this.timer = 0;
  };

  /**
   * @override Phaser.scene.update
   */
  Countdown.prototype.update = function (time, delta) {
    this.timer += delta;
    this.text.setText(this.textString.format(Math.trunc((this.wait - this.timer) / 1000)));

    if(this.waiting && this.wait - this.timer <= 0) {
      if(this.parentScene) {
        this.scene.stop();
        this.parentScene.scene.resume();
      }
      this.waiting = false;
    }
  };

  deathrace.scenes.Countdown = Countdown;
})();

