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

(function () {
    /**
     * Game Arena class constructor
     * @constructor
     */
    var Arena = function () {
      Phaser.Scene.call(this, {
        key: "ArenaScene",
        physics: {
          default: 'arcade',
          arcade: {
            debug: false
          }
        },
        input: {
          gamepad: true
        }
      });
    };

    // Inheritance, Arena extends Phaser.Scene
    Arena.prototype = Object.create(Phaser.Scene.prototype);
    Arena.prototype.constructor = Arena;

    /**
     * Scene Preloading callback
     */
    Arena.prototype.preload = function () {
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
      this.load.image('Shot', 'img/sprites/powerups/Shot.png');
      this.load.image('Knife', 'img/sprites/powerups/Knife.png');

      this.load.image('powerups.GB', 'img/sprites/powerups/GB.png');
      this.load.image('powerups.LS', 'img/sprites/powerups/LS.png');
      this.load.image('powerups.MS', 'img/sprites/powerups/MS.png');
      this.load.image('powerups.PW', 'img/sprites/powerups/PW.png');
      this.load.image('powerups.SD', 'img/sprites/powerups/SD.png');
      this.load.image('powerups.SK', 'img/sprites/powerups/SK.png');
      this.load.image('powerups.SP', 'img/sprites/powerups/SP.png');
      this.load.image('powerups.DH', 'img/sprites/powerups/DH.png');
      this.load.image('powerups.FP', 'img/sprites/powerups/FP.png');
      this.load.image('powerups.TW', 'img/sprites/powerups/TW.png');
      this.load.image('powerups.GC', 'img/sprites/powerups/GC.png');
      this.load.image('powerups.unknown', 'img/sprites/powerups/unknown.png');

      this.load.image('knife', 'img/sprites/powerups/Knife.png');
    };

    /**
     * Scene create callback
     */
    Arena.prototype.create = function () {
      console.log("ArenaScene loaded");

      // Building grid
      this.grid = this.add.grid(this.margin, this.margin, this.horzLength, this.vertLength, 32, 32, 0x000000, 1, this.gridColor, 1);
      this.grid.setOrigin(0, 0);

      // Building external walls
      this.wallGroup = this.physics.add.group();

      this.northWall = this.add.rectangle(this.margin, this.margin, this.horzLength, this.wallWidth, 0x00ff00);
      this.northWall.setOrigin(0, 0);
      this.northWall.name = "north";
      this.northWall.isExternalWall = true;

      this.southWall = this.add.rectangle(this.margin, this.vertLength + this.margin - this.wallWidth, this.horzLength, this.wallWidth, 0x00ff00);
      this.southWall.setOrigin(0, 0);
      this.southWall.name = "south";
      this.southWall.isExternalWall = true;

      this.eastWall = this.add.rectangle(this.margin + this.horzLength - this.wallWidth, this.margin, this.wallWidth, this.vertLength, 0x00ff00);
      this.eastWall.setOrigin(0, 0);
      this.eastWall.name = "east";
      this.eastWall.isExternalWall = true;

      this.westWall = this.add.rectangle(this.margin, this.margin, this.wallWidth, this.vertLength, 0x00ff00);
      this.westWall.setOrigin(0, 0);
      this.westWall.name = "west";
      this.westWall.isExternalWall = true;

      this.wallGroup.add(this.northWall);
      this.wallGroup.add(this.southWall);
      this.wallGroup.add(this.eastWall);
      this.wallGroup.add(this.westWall);

      // Building level
      this.level = this.add.level();
      this.level.loadLevel(4);

      // Bike trails
      this.bikeTrails = this.add.group();

      // Building red bike
      this.bike = this.add.bike(74, 74, 'yellow', new Phaser.Display.Color(255, 255, 0));
      this.bike2 = this.add.bike(1154, 74, 'red', new Phaser.Display.Color(255, 255, 0));

      this.bikeGroup = this.add.group([
        this.bike,
        this.bike2
      ]);

      // Generate power ups
      this.powerUps = this.add.group();

      this.shots = this.add.group();
      this.knifes = this.add.group();


      this.spawnRandomPowerUps();

      // Bike - walls collider
      this.physics.add.overlap(this.bikeGroup, this.wallGroup, this.bikeCollision, null, this);
      this.physics.add.overlap(this.bikeGroup, this.bikeTrails, this.bikeCollision, null, this);
      this.physics.add.overlap(this.bikeGroup, this.level.walls, this.bikeCollision, null, this);
      this.physics.add.overlap(this.bikeGroup, this.powerUps, this.bikeCollision, null, this);
      this.physics.add.overlap(this.bikeGroup, this.bike.rectangle, this.bikeCollision, null, this);

      this.input.gamepad.once('down', function (gamepad) {
        this.setupGamePad(gamepad, this.bike);
      }, this);

      this.setupKeyboard1(this.bike);
      this.setupKeyboard2(this.bike2);

      // Load press-any-key scene
      this.scene.get('PressAnyKey').parentScene = this;
      this.scene.launch('PressAnyKey');
      this.scene.pause();

      this.events.on('pause', this.pause, this);
      this.events.on('resume', this.resume, this);

    };

    Arena.prototype.setupGamePad = function (gamepad, bike) {
      this.controller1 = new deathrace.inputhandler.GamepadController();
      this.controller1.setGamepad(gamepad);
      this.controller1.setCommands([
        {key: this.controller1.actions.CURSOR_LEFT, command: new deathrace.inputhandler.CommandSteerLeft(bike)},
        {key: this.controller1.actions.CURSOR_RIGHT, command: new deathrace.inputhandler.CommandSteerRight(bike)},
        {key: this.controller1.actions.CURSOR_DOWN, command: new deathrace.inputhandler.CommandToggleBreak(bike, true)}
      ]);
    };

    Arena.prototype.setupKeyboard1 = function (bike) {
      var KeyCodes = Phaser.Input.Keyboard.KeyCodes;
      this.keyboard1 = new deathrace.inputhandler.KeyboardController();
      this.keyboard1.setKeyboard(this.input.keyboard);
      this.keyboard1.setCommands([
        {key: KeyCodes.LEFT, type: 'keydown', command: new deathrace.inputhandler.CommandSteerLeft(bike)},
        {key: KeyCodes.RIGHT, type: 'keydown', command: new deathrace.inputhandler.CommandSteerRight(bike)},
        {key: KeyCodes.DOWN, type: 'keydown', command: new deathrace.inputhandler.CommandToggleBreak(bike, true)},
        {key: KeyCodes.DOWN, type: 'keyup', command: new deathrace.inputhandler.CommandToggleBreak(bike, false)},
        {key: KeyCodes.COMMA, type: 'keydown', command: new deathrace.inputhandler.CommandUseInventoryItem(bike, 0)},
        {key: KeyCodes.COLON, type: 'keydown', command: new deathrace.inputhandler.CommandUseInventoryItem(bike, 1)},
        {key: KeyCodes.MINUS, type: 'keydown', command: new deathrace.inputhandler.CommandUseInventoryItem(bike, 2)}
      ]);
    };

    Arena.prototype.setupKeyboard2 = function (bike) {
      var KeyCodes = Phaser.Input.Keyboard.KeyCodes;
      this.keyboard1 = new deathrace.inputhandler.KeyboardController();
      this.keyboard1.setKeyboard(this.input.keyboard);
      this.keyboard1.setCommands([
        {key: KeyCodes.A, type: 'keydown', command: new deathrace.inputhandler.CommandSteerLeft(bike)},
        {key: KeyCodes.D, type: 'keydown', command: new deathrace.inputhandler.CommandSteerRight(bike)},
        {key: KeyCodes.S, type: 'keydown', command: new deathrace.inputhandler.CommandToggleBreak(bike, true)},
        {key: KeyCodes.S, type: 'keyup', command: new deathrace.inputhandler.CommandToggleBreak(bike, false)},
        {key: KeyCodes.Q, type: 'keydown', command: new deathrace.inputhandler.CommandUseInventoryItem(bike, 0)},
        {key: KeyCodes.W, type: 'keydown', command: new deathrace.inputhandler.CommandUseInventoryItem(bike, 1)},
        {key: KeyCodes.E, type: 'keydown', command: new deathrace.inputhandler.CommandUseInventoryItem(bike, 2)}
      ]);
    };

    /**
     * Pauses Arena execution
     */
    Arena.prototype.pause = function () {
      this.sound.setMute(true);
    };

    /**
     * Resumes Arena execution
     */
    Arena.prototype.resume = function () {
      this.sound.setMute(false);
      this.scene.launch('HUD');
    };

    /**
     * @override Phaser.scene.update
     */
    Arena.prototype.update = function (time, delta) {
    };

    /**
     * Handles bike collision
     * @param body Gameobject, the bike
     * @param other
     */
    Arena.prototype.bikeCollision = function (bike, other) {
      console.log("Collision");
      if (other instanceof deathrace.gameobjects.powerups.PowerUp) {
        console.log("Powerup '" + other.name + "'picked up");
        bike.addPowerUp(other);
        this.powerUps.remove(other, true);

      } else {
        bike.puppet = true;
        if (bike.horn) {
          bike.ghost = true;
          this.level.breakWall(4);
          if (bike.ghost === false) {
            if (bike.active) {
              bike.setActive(false);
              bike.explode();

            }
          }
        }

        if (bike.ghost === false || other.isExternalWall || other instanceof deathrace.gameobjects.proyectile.Projectile) {
          bike.setActive(false);
          bike.explode();
        }
      }
    };

    Arena.prototype.spawnRandomPowerUps = function () {
      var numberOfPowerUps = Math.trunc(Math.random() * 7 + 3);
      this.powerUps.clear(true);

      for (var i = 0; i < numberOfPowerUps; ++i) {
        var powerUpX = Math.trunc(Math.random() * this.horzLength + this.margin);
        var powerUpY = Math.trunc(Math.random() * this.vertLength + this.margin);
        var powerUp = this.add.powerUp(powerUpX, powerUpY);
        this.powerUps.add(powerUp);
      }
    };

    /**
     * Input handler
     * @param e
     *
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
        case 'KeyQ':
          this.bike.launchPowerUp(0);
          break;
        case 'KeyW':
          this.bike.launchPowerUp(1);
          break;
        case 'KeyE':
          this.bike.launchPowerUp(2);
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
     */

    // Add to namespace
    deathrace.scenes.Arena = Arena;
  }
)();

