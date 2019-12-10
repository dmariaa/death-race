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
  var HighScores = function() {
    Phaser.Scene.call(this, {
      key: "HighScores"
    });
  };

  HighScores.prototype = Object.create(Phaser.Scene.prototype);
  HighScores.prototype.constructor = HighScores;

  HighScores.prototype.preload = function() {
    // Resources loaded by game manager
  };

  HighScores.prototype.create = function() {
    this.background = this.add.image(0, 0, 'general-background');
    this.background.setDisplaySize(this.game.canvas.width, this.game.canvas.height);
    this.background.setOrigin(0);

    // Title
    var textPosition = new Phaser.Math.Vector2(this.game.canvas.width / 2, 20);
    this.add.text(textPosition.x, textPosition.y, "Puntuaciones", {
      fontFamily: "Orbitron", fontSize: 50
    }).setOrigin(0.5, 0).setAlign('center');

    textPosition.y += 100;

    $.ajax('/high-scores')
      .done(this.drawCredits.bind(this));

    this.input.keyboard.on('keydown', this.handleKeys, this);
  };

  HighScores.prototype.handleKeys = function(event) {
    if(event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC) {
      this.scene.wake('MainMenu');
      this.scene.stop();
    }
  };

  HighScores.prototype.drawCredits = function(highscores_string) {
    var highscores = JSON.parse(highscores_string);

    var textPosition = new Phaser.Math.Vector2(this.game.canvas.width / 2, 120);

    for(var i=0, length = 12; i < length; ++i) {
      if(i < highscores.length) {
        var highscore = highscores[i];
        this.createHighScore(textPosition.x, textPosition.y, highscore);

      }

      textPosition.y += 58;
    }

    this.add.text(textPosition.x, textPosition.y, "<ESC> para salir", { fontFamily: "Orbitron", fontSize: 30 })
      .setOrigin(0.5, 0).setAlign('center');
  };

  HighScores.prototype.createHighScore = function(x, y, highscore) {
    var style =  { fontFamily: "Orbitron", fontSize: 30 };
    var left = x - 300;
    var container = this.add.container(left, y);
    container.add(this.add.text(0, 0, highscore['player-name'], style).setOrigin(0.5, 0).setAlign('center'));
    container.add(this.add.text(300, 0, highscore['score'], style).setOrigin(0.5, 0).setAlign('center'));
    container.add(this.add.text(600, 0, moment(highscore['score-date']).format("DD/MM/YYYY h:mm:ss a"), style).setOrigin(0.5, 0).setAlign('center'));
    return container;
  };


  namespace.HighScores = HighScores;
})(deathrace.scenes);