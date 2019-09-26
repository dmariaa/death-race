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

class ArenaScene extends Phaser.Scene {
  constructor() {
    super({
      key: "ArenaScene",
      physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
      }
    });
  }

  preload() {
    this.margin = 10;
    this.wallWidth = 3;

    this.horzLength = this.game.canvas.width - 2 * this.margin;
    this.vertLength = this.game.canvas.height - 2 * this.margin;
  }

  create() {
    console.log("ArenaScene loaded");

    this.physics.start();

    // Building external walls
    this.wallGroup = this.physics.add.group();

    this.northWall = this.add.rectangle(this.margin, this.margin , this.horzLength, this.wallWidth, 0x00ff00);
    this.northWall.setOrigin(0, 0);
    this.northWall.name = "north";

    this.southWall = this.add.rectangle(this.margin, this.vertLength + this.margin - this.wallWidth, this.horzLength, this.wallWidth, 0x00ff00);
    this.southWall.setOrigin(0, 0);
    this.southWall.name = "south";

    this.eastWall = this.add.rectangle(this.margin + this.horzLength - this.wallWidth, this.margin, this.wallWidth, this.vertLength, 0x00ff00);
    this.eastWall.setOrigin(0, 0);
    this.eastWall.name = "east";

    this.westWall = this.add.rectangle(this.margin, this.margin, this.wallWidth, this.vertLength, 0x00ff00);
    this.westWall.setOrigin(0, 0);
    this.westWall.name = "west";

    this.wallGroup.add(this.northWall);
    this.wallGroup.add(this.southWall);
    this.wallGroup.add(this.eastWall);
    this.wallGroup.add(this.westWall);

    // Building red bike
    this.bike = this.add.bike(100, 100, 0xff0000);
    this.bike.name = "bike";
    this.bike.setOrigin(0 , 0);
    this.bike.speed = 0.25;
    this.physics.add.existing(this.bike);

    // Bike - walls collider
    this.physics.add.collider(this.bike, this.wallGroup, this.bikeCollision, null, this);
  }

  update(time, delta) {
    this.bike.setPosition(this.bike.x, this.bike.y + this.bike.speed * delta);
  }

  bikeCollision(body, other) {
    console.log("Collision between " + body.name + " with speed: " + this.bike.speed + " and " + other.name);

    if(this.bike.speed > 0) {
      this.bike.setPosition(this.bike.x, other.y - body.height - 1);
    } else {
      this.bike.setPosition(this.bike.x, other.y + other.height + 1);
    }
    this.bike.speed *= -1;

  }

  generateRandomWall() {
  }

}