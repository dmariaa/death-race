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

    pluginManager.registerGameObject('knife', this.createKnife);
    pluginManager.registerGameObject('shot', this.createShot);
      pluginManager.registerGameObject('trap', this.createTrap);

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
    return level;
  };

  GameObjectsPlugin.prototype.createPowerUp = function (x, y, powerUpType) {
    powerUpType = powerUpType || deathrace.gameobjects.powerups.Types.randomType();
    var powerup = deathrace.gameobjects.powerups.PowerUpFactory(this.scene, x, y, powerUpType);
    return powerup;
  };

 GameObjectsPlugin.prototype.createKnife = function(x,y, directionVector){
    var knife = new deathrace.gameobjects.projectile.Knife(this.scene, x, y, directionVector);
    this.scene.add.existing(knife);
    this.scene.physics.add.existing(knife);
    return knife;
  };

  GameObjectsPlugin.prototype.createShot = function(x,y, directionVector){
        var shot = new deathrace.gameobjects.projectile.Shot(this.scene, x, y, directionVector);
        this.scene.add.existing(shot);
        this.scene.physics.add.existing(shot);
        return shot;
  };

    GameObjectsPlugin.prototype.createTrap = function (x, y, texture) {
        var trap = new deathrace.gameobjects.Trap (this.scene, x, y, texture);
        return trap;
    };

    deathrace.gameobjects.GameObjectsPlugin = GameObjectsPlugin;
})();