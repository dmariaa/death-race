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

(function() {
  /**
   * Bike trail class constructor
   * @param scene
   * @param bike
   * @constructor
   */
  var BikeTrail = function(scene, bike) {
    Phaser.GameObjects.GameObject.call(this, scene, "biketrail");

    /**
     * Trail walls array
     * @type {Array}
     */
    this.walls = [];

    /**
     * Parent bike
     * @type {deathrace.gameobjects.Bike}
     */
    this.bike = bike;

    /**
     * Bike color
     * @type {*|Phaser.Display.Color}
     */
    this.color = bike.color.clone().darken(50);

    /**
     * Trail length
     * @type {number}
     */
    this.length = 0;
    this._currentWallLength = 0;
  };

  // Inheritance, BikeTrail extends Phaser.GameObjects.GameObject
  BikeTrail.prototype = Object.create(Phaser.GameObjects.GameObject.prototype);
  BikeTrail.prototype.constructor = BikeTrail;

  /**
   * Adds a trail at position to the trails list
   * @param x Position X
   * @param y Position Y
   */
  BikeTrail.prototype.add = function(x, y) {
    var wall = this.scene.add.line();
    wall.isTrail = true;

    if(this.scene.physics) {
      this.scene.physics.add.existing(wall);
    }

    wall.setOrigin(0, 0);
    wall.setStrokeStyle(1, this.color.color);
    wall.setLineWidth(1);
    wall.setTo(x, y, x, y);
    this.length += this._currentWallLength;

    this._currentWall = wall;
    this.walls.splice(0, 0, this._currentWall);
    this.scene.bikeTrails.add(this._currentWall);
  };

  /**
   * Sets new end point at position for current trail
   * @param x Position X
   * @param y Position Y
   */
  BikeTrail.prototype.set = function(x, y) {
    if(!this._currentWall) {
      this.add(x, y);
    }

    var geom = this._currentWall.geom;
    var x1 = Math.min(geom.x1, x);
    var x2 = Math.abs(geom.x1 - x);
    var y1 = Math.min(geom.y1, y);
    var y2 = Math.abs(geom.y1 - y);

    this._currentWall.setTo(geom.x1, geom.y1, x, y);

    if(this.scene.physics) {
      this._currentWall.body.setOffset(x1, y1);
      this._currentWall.body.setSize(x2, y2, false);
    }

    this._currentWallLength = Math.max(x2, y2);
  };

  BikeTrail.prototype.getLength = function() {
    return this.length + this._currentWallLength;
  };

  /**
   * Builds a breach in a trail wall at position
   * @param wall wall to break
   * @param x Position X
   * @param y Position Y
   */
  BikeTrail.prototype.break = function(wall, x, y) {
    var index = this.findWallIndex(wall);
    if(index===-1) {
      console.error("Wall does not belong to this trail");
      return;
    }
  };

  /**
   * Returns index of wall in the trail walls array
   * @param wall Wall to search for
   * @returns {number} Index of wall in array
   */
  BikeTrail.prototype.findWallIndex = function(wall) {
    for(var i=0; i < this.walls.length; ++i) {
      if(this.walls[i].wall === wall) {
        return i;
      }
    }
    return -1;
  };

  deathrace.gameobjects.BikeTrail = BikeTrail;
})();
