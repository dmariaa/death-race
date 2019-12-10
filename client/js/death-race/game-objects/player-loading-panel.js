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
deathrace.gameobjects = deathrace.gameobjects || {};

(function(namespace) {
  var PlayerLoadingPanel = function(scene, x, y, width, height) {
    Phaser.GameObjects.Container.call(this, scene, x, y);
    scene.add.existing(this);
    this.setSize(width, height);
    this.margin = 10;

    this.drawPanel();
  };

  PlayerLoadingPanel.prototype = Object.create(Phaser.GameObjects.Container.prototype);
  PlayerLoadingPanel.prototype.constructor = PlayerLoadingPanel;

  PlayerLoadingPanel.prototype.drawPanel = function() {
    var panelTextStyle = {
      fontFamily: "Orbitron", fontSize: 30
    };

    this.border = this.scene.add.rectangle(
      this.margin,
      this.margin,
      this.width - this.margin * 2,
      this.height - this.margin * 2);
    this.border.setStrokeStyle(2, 0xffffff, 1);
    this.border.setOrigin(0, 0);
    this.add(this.border);

    this.text = this.scene.add.text(this.margin + 20, this.margin + 20, "Panel jugador", panelTextStyle)
      .setOrigin(0, 0).setAlign('left');
    this.add(this.text);
  };

  namespace.PlayerLoadingPanel = PlayerLoadingPanel;
})(deathrace.gameobjects);