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

class BikeTrail extends Phaser.GameObjects.GameObject {
  constructor(scene, bike) {
    super(scene, "biketrail");
    this.walls = [];
    this.bike = bike;
    this.color = bike.color.clone().darken(50);
  }

  add(x, y) {
    var wall = this.scene.add.line();
    this.scene.physics.add.existing(wall);
    wall.setOrigin(0, 0);
    wall.setStrokeStyle(1, this.color.color);
    wall.setLineWidth(1);
    wall.setTo(x, y, x, y);
    this._currentWall = wall;
    this.walls.splice(0, 0, this._currentWall);
  }

  set(x, y) {
    if(!this._currentWall) {
      this.add(x, y);
    }
    var geom = this._currentWall.geom;
    this._currentWall.setTo(geom.x1, geom.y1, x, y);
    this._currentWall.body.setOffset(Math.min(geom.x1, geom.x2), Math.min(geom.y2, geom.y1));
    this._currentWall.body.setSize(Math.abs(geom.x2 - geom.x1), Math.abs(geom.y2 - geom.y1), false);
  }

  break(wall, x, y) {
    var index = this._findWallIndex(wall);

    if(index===-1) {
      console.error("Wall does not belong to this trail");
      return;
    }
  }

  _findWallIndex(wall) {
    for(var i=0; i < this.walls.length; ++i) {
      if(this.walls[i].wall === wall) {
        return i;
      }
    }
    return -1;
  }
}