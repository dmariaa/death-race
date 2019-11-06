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

(function() {
  /**
   * Game Arena class constructor
   * @constructor
   */
  var Arena = function() {
    Phaser.Scene.call(this, {
      key: "ArenaScene",
      physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
      }
    });
  };

  // Inheritance, Arena extends Phaser.Scene
  Arena.prototype = Object.create(Phaser.Scene.prototype);
  Arena.prototype.constructor = Arena;

  /**
   * Scene Preloading callback
   */
  Arena.prototype.preload = function() {
    /**
     * Margin between arena ending and limit walls
     * @type {number}
     */
    this.margin = 10;

    /**
     * Width of limit wall lines
     * @type {number}
     */
    this.wallWidth = 3;

    /**
     * Inside limits arena width
     * @type {number}
     */
    this.horzLength = this.game.canvas.width - 2 * this.margin;

    /**
     * Inside limits arena height
     * @type {number}
     */
    this.vertLength = this.game.canvas.height - 2 * this.margin;

    this.load.image('bike', 'img/sprites/blackbike.png');
    this.load.image('yellow-bike', 'img/sprites/yellowbike.png');
    this.load.audio('bike-engine', 'sounds/bike-engine.wav');
    this.load.audio('bike-explosion', 'sounds/explosion-05.wav');

    this.load.image('powerups.CM', 'img/sprites/powerups/CM.png');
    this.load.image('powerups.GB', 'img/sprites/powerups/GB.png');
    this.load.image('powerups.LS', 'img/sprites/powerups/LS.png');
    this.load.image('powerups.MS', 'img/sprites/powerups/MS.png');
    this.load.image('powerups.PW', 'img/sprites/powerups/PW.png');
    this.load.image('powerups.SD', 'img/sprites/powerups/SD.png');
    this.load.image('powerups.SK', 'img/sprites/powerups/SK.png');
    this.load.image('powerups.SP', 'img/sprites/powerups/SP.png');
    this.load.image('powerups.unknown', 'img/sprites/powerups/unknown.png');
  };

  /**
   * Scene create callback
   */
  Arena.prototype.create = function() {
    console.log("ArenaScene loaded");

    // Building grid
    this.grid = this.add.grid(this.margin, this.margin, this.horzLength, this.vertLength, 32, 32,0x000000, 1, this.gridColor, 1);
    this.grid.setOrigin(0, 0);

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

    // Building level
    this.level = this.add.level();
    this.level.loadLevel(4);

    // Building red bike
    this.bike = this.add.bike(74, 74, 'yellow-bike', new Phaser.Display.Color(255, 255, 0));

    // Generate power ups
    this.powerUps = this.add.group();
    this.spawnRandomPowerUps();

    // Bike - walls collider
    this.physics.add.overlap(this.bike, this.wallGroup, this.bikeCollision, null, this);
    this.physics.add.overlap(this.bike, this.bike.trail.walls, this.bikeCollision, null, this);
    this.physics.add.overlap(this.bike, this.level.walls, this.bikeCollision, null, this);
    this.physics.add.overlap(this.bike, this.powerUps, this.bikeCollision, null, this);

    // Input
    this.input.keyboard.on('keydown', this.handleInput, this);
    this.input.keyboard.on('keyup', this.handleInput, this);

    // Load press-any-key scene
    this.scene.get('PressAnyKey').parentScene = this;
    this.scene.launch('PressAnyKey');
    this.scene.pause();

    this.events.on('pause', this.pause, this);
    this.events.on('resume', this.resume, this);
  };

  /**
   * Pauses Arena execution
   */
  Arena.prototype.pause = function() {
    this.sound.setMute(true);
  };

  /**
   * Resumes Arena execution
   */
  Arena.prototype.resume = function() {
    this.sound.setMute(false);
  };

  /**
   * @override Phaser.scene.update
   */
  Arena.prototype.update = function(time, delta) {
  };

  /**
   * Handles bike collision
   * @param body Gameobject, the bike
   * @param other
   */
  Arena.prototype.bikeCollision = function(body, other) {
    if(other instanceof deathrace.gameobjects.powerups.PowerUp) {
      console.log("Powerup '" + other.name + "'picked up");
      this.powerUps.remove(other, true);
    } else {
      if(this.bike.active) {
        this.bike.setActive(false);
        this.bike.explode();
      }
    }
  };

  Arena.prototype.spawnRandomPowerUps = function() {
    var numberOfPowerUps = Math.trunc(Math.random() * 7 + 3);
    this.powerUps.clear(true);

    for(var i=0; i<numberOfPowerUps; ++i) {
      var powerUpX = Math.trunc(Math.random() * this.horzLength + this.margin);
      var powerUpY = Math.trunc(Math.random() * this.vertLength + this.margin);
      var powerUp = this.add.powerUp(powerUpX, powerUpY);
      this.powerUps.add(powerUp);
    }
  };

  /**
   * Input handler
   * @param e
   */
  Arena.prototype.handleInput = function(e) {
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
  };

  // Add to namespace
  deathrace.scenes.Arena = Arena;
})();

