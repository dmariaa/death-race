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
  var Hud = function() {
    Phaser.Scene.call(this, {
      key: 'HUD',
      plugins: []
    });

    this.scoreFormat = "Puntuación: {0}";
  };

  Hud.prototype = Object.create(Phaser.Scene.prototype);
  Hud.prototype.constructor = Hud;

  Hud.prototype.preload = function() {
  };

  Hud.prototype.create = function() {
    this.score = this.add.text(30, 30, this.scoreFormat.format(0), { fontFamily: 'Orbitron', fontSize: 30 });

    var arena = this.scene.get('ArenaScene');
    arena.events.on('score', function(score) {
      this.score.setText(this.scoreFormat.format(score));
    }, this);
  };

  deathrace.scenes.Hud = Hud;
})();