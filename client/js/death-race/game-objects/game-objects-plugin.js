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

(function () {

  var GameObjectsPlugin = function (pluginManager) {
    Phaser.Plugins.BasePlugin.call(this, pluginManager);
    pluginManager.registerGameObject('bike', this.createBike);
    pluginManager.registerGameObject('trail', this.createTrail);
    pluginManager.registerGameObject('level', this.createLevel);
    pluginManager.registerGameObject('powerUp', this.createPowerUp);
  };

  GameObjectsPlugin.prototype = Object.create(Phaser.Plugins.BasePlugin.prototype);
  GameObjectsPlugin.prototype.constructor = GameObjectsPlugin;

  GameObjectsPlugin.prototype.createBike = function (x, y, texture, color) {
    var bike = new deathrace.gameobjects.Bike(this.scene, x, y, texture, color);
    this.scene.add.existing(bike);
    this.scene.physics.add.existing(bike);
    return bike;
  };

  GameObjectsPlugin.prototype.createTrail = function (bike) {
    var trail = new deathrace.gameobjects.BikeTrail(this.scene, bike);
    this.scene.add.existing(trail);
    return trail;
  };

  GameObjectsPlugin.prototype.createLevel = function () {
    var level = new deathrace.gameobjects.Level(this.scene);
    this.scene.add.existing(level);
    return level;
  };

  GameObjectsPlugin.prototype.createPowerUp = function (x, y, powerUpType) {
    var powerup = new deathrace.gameobjects.PowerUp(this.scene, x, y);
    this.scene.add.existing(powerup);
    this.scene.physics.add.existing(powerup);
    return powerup;
  };

  deathrace.gameobjects.GameObjectsPlugin = GameObjectsPlugin;
})();