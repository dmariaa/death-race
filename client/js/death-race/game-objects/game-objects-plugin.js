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

class GameObjectsPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
    pluginManager.registerGameObject('bike', this.createBike);
    pluginManager.registerGameObject('trail', this.createTrail);
    pluginManager.registerGameObject('level', this.createLevel);
  }
  createBike(x, y, texture, color) {
    var bike = new Bike(this.scene, x, y, texture, color);
    this.scene.add.existing(bike);
    this.scene.physics.add.existing(bike);
    return bike;
  }
  createTrail(bike) {
    var trail = new BikeTrail(this.scene, bike);
    this.scene.add.existing(trail);
    return trail;
  }
  createLevel() {
    var level = new Level(this.scene);
    this.scene.add.existing(level);
    return level;
  }
  createPowerUp(x, y) {
    var powerup = new PowerUp(x, y);
    this.scene.add.existing(powerup);
    this.scene.physics.add.existin(powerup);
    return powerup;
  }
}