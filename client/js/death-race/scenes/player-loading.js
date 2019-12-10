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
  var PlayerLoading = function () {
    Phaser.Scene.call(this, {
      key: "PlayerLoading",
      input: {
        gamepad: true
      }
    });

    this.panels = [];
  };

  PlayerLoading.prototype = Object.create(Phaser.Scene.prototype);
  PlayerLoading.prototype.constructor = PlayerLoading;

  PlayerLoading.prototype.create = function() {
    // Create background
    this.background = this.add.image(0, 0, 'general-background');
    this.background.setDisplaySize(this.game.canvas.width, this.game.canvas.height);
    this.background.setOrigin(0);

    // Create Title
    var textPosition = new Phaser.Math.Vector2(this.game.canvas.width / 2, 20);
    this.title = this.add.text(textPosition.x, textPosition.y, "Esperando jugadores...", {
      fontFamily: "Orbitron", fontSize: 50
    }).setOrigin(0.5, 0).setAlign('center');

    // Reposition title
    var bounds = this.title.getBounds();
    this.title.setOrigin(0, 0).setAlign('left').setPosition(bounds.x, bounds.y);

    // Create panels, hidden
    var marginTop = 90;
    var halfWidth = this.game.canvas.width / 4;
    var halfHeight = (this.game.canvas.height - marginTop) / 4;
    var numberOfPanels = 4;
    for(var i=0; i < numberOfPanels; i++) {
      var row = Math.trunc(i / 2);
      var col = Math.trunc(i % 2);

      console.log("Grid ({0},{1})".format(row, col));
      var playerPanel = this.add.playerLoadingPanel(
        (col + 1) * halfWidth,
        marginTop + (row + 1) * halfHeight,
        halfWidth,
        halfHeight).setVisible(false);
      this.panels.push(playerPanel);
    }

    this.showPanel(0);
  };

  PlayerLoading.prototype.showPanel = function(panel)
  {
      this.panels[panel].setVisible(true);
  };

  PlayerLoading.prototype.update = function(time, delta)
  {
    var numberOfDots = (Math.trunc(time / 350) % 4);
    var dots = "...".substring(0, numberOfDots);
    this.title.setText("Esperando jugadores" + dots);
  };

  namespace.PlayerLoading = PlayerLoading;
})(deathrace.scenes);