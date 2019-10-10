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

    this.gridColor = 0x061539;
  }

  preload() {
    this.margin = 10;
    this.wallWidth = 3;

    this.horzLength = this.game.canvas.width - 2 * this.margin;
    this.vertLength = this.game.canvas.height - 2 * this.margin;

    this.load.image('bike', 'img/sprites/blackbike.png');
    this.load.image('yellow-bike', 'img/sprites/yellowbike.png');
    this.load.audio('bike-engine', 'sounds/bike-engine.wav');
    this.load.audio('bike-explosion', 'sounds/explosion-05.wav');
  }

  create() {
    console.log("ArenaScene loaded");

    // Building grid
    this.grid = this.add.grid(this.margin, this.margin, this.horzLength, this.vertLength, 32, 32,0x000000, 1, this.gridColor, 1);
    this.grid.setOrigin(0, 0);

    // Building external walls
    this.wallGroup = [];

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

    this.physics.add.existing(this.northWall);
    this.physics.add.existing(this.southWall);
    this.physics.add.existing(this.eastWall);
    this.physics.add.existing(this.westWall);

    this.wallGroup.push(this.northWall);
    this.wallGroup.push(this.southWall);
    this.wallGroup.push(this.eastWall);
    this.wallGroup.push(this.westWall);

    // Building red bike
    this.bike = this.add.bike(74, 74, 'yellow-bike', new Phaser.Display.Color(255, 255, 0));

    // Bike - walls collider
    this.physics.add.overlap(this.bike, this.wallGroup, this.bikeCollision, null, this);
    this.physics.add.overlap(this.bike, this.bike.trail.walls, this.bikeCollision, null, this);

    // Input
    this.input.keyboard.on('keydown', this.handleInput, this);
    this.input.keyboard.on('keyup', this.handleInput, this);

    // Load press-any-key scene
    this.scene.get('PressAnyKeyScene').parentScene = this;
    this.scene.launch('PressAnyKeyScene');
    this.scene.pause();

    this.events.on('pause', this.pause, this);
    this.events.on('resume', this.resume, this);
  }

  pause() {
    this.sound.setMute(true);
  }

  resume() {
    this.sound.setMute(false);
  }

  update(time, delta) {
  }

  bikeCollision(body, other) {
    if(this.bike.active) {
      this.bike.setActive(false);
      this.bike.explode();
    }
  }

  generateRandomWall() {
  }

  handleInput(e) {
    if(!this.bike.active) return;

    console.log("Key pressed: " + e.code);
    if(e.type=='keydown') {
      switch (e.code) {
        case 'ArrowLeft':
          this.bike.turnLeft();
          break;
        case 'ArrowRight':
          this.bike.turnRight();
          break;
        case 'ArrowDown':
          this.bike.toggleBreak(true);
          break;
      }
    } else if(e.type=='keyup') {
      switch (e.code) {
        case 'ArrowDown':
          this.bike.toggleBreak(false);
          break;
      }
    }
  }
}