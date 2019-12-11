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

      /**
       * Array of bikes
       * @type {*[]}
       */
      this.bikes = [];

      // Resources loaded by game manager
    };

    /**
     * Scene create callback
     */
    Arena.prototype.create = function (players) {
      console.log("ArenaScene loaded");

      this.roundFinished = false;

      // Building grid
      this.gridColor = 0x000040;
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
      this.level.loadLevelAleatory();

      // Bike trails
      this.bikeTrails = this.add.group();

      var spawnPoints = this.level.bikeSpawnPoints;
      this.bikeGroup = this.add.group();

      // Restart HUD
      for (var i = 0, length = players.length; i < length; ++i) {
        var player = players[i];
        var bike = this.add.bike(spawnPoints[i].x, spawnPoints[i].y, player.name, player.color.value);

        bike.player = player;
        this.scene.get('HUD').attach(i, bike);

        if (player.gamepad) {
          this.setupGamePad(player.gamepad, bike);
        } else {
          if (player.keyboard === Phaser.Input.Keyboard.KeyCodes.A) {
            this.setupKeyboard2(bike);
          } else if (player.keyboard === Phaser.Input.Keyboard.KeyCodes.LEFT) {
            this.setupKeyboard1(bike);
          }
        }
        this.bikeGroup.add(bike);
        this.bikes.push(bike);
      }

      // Generate power ups
      this.powerUps = this.add.group();
      this.shots = this.add.group();
      this.knifes = this.add.group();
      this.traps = this.add.group();

      this.spawnRandomPowerUps(5, 15);
      this.spawnRandomTraps();

      // Bike - walls collider
      this.physics.add.overlap(this.bikeGroup, this.wallGroup, this.bikeCollision, null, this);
      this.physics.add.overlap(this.bikeGroup, this.bikeTrails, this.bikeCollision, null, this);
      this.physics.add.overlap(this.bikeGroup, this.level.walls, this.bikeCollision, null, this);
      this.physics.add.overlap(this.bikeGroup, this.powerUps, this.bikeCollision, null, this);
      this.physics.add.overlap(this.bikeGroup, this.traps, this.bikeCollision, null, this);


      // Load press-any-key scene
      this.scene.get('Countdown').parentScene = this;
      this.scene.launch('Countdown');
      this.scene.bringToTop('Countdown');
      this.scene.pause();

      this.events.on('pause', this.pause, this);
      this.events.on('resume', this.resume, this);
      this.events.on('shutdown', this.shutdown, this);

      this.scene.get('GameManager').playMusic('background-sound', true);
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
        {key: KeyCodes.PERIOD, type: 'keydown', command: new deathrace.inputhandler.CommandUseInventoryItem(bike, 1)},
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
    };

    Arena.prototype.shutdown = function() {
      for(var i=0, length=this.bikes.length; i < length; i++) {
        if(this.bikes[i]) {
          this.bikes[i].destroy();
        }
      }
      this.bikes = [];
    };

    /**
     * @override Phaser.scene.update
     */
    Arena.prototype.update = function (time, delta) {
      if (this.bikeGroup.getLength() == 1 && !this.roundFinished) {
        this.roundFinished = true;
        var bikes = this.bikeGroup.getChildren();
        var winner = bikes[0];
        winner.player.score += winner.score + 100;
        winner.setActive(false);
        this.endRound(winner);
      }
    };

    /**
     * Handles bike collision
     * @param body Gameobject, the bike
     * @param other
     */
    Arena.prototype.bikeCollision = function (bike, other) {
      if (other instanceof deathrace.gameobjects.powerups.PowerUp) {
        if (bike.addPowerUp(other)) {
          this.powerUps.remove(other, true);
        }
      } else {
        if (bike.horn
          && !other.isExternalWall
          && !other.isTrail) {
          bike.breakWall(other);
        } else if (bike.ghost === false
          || other.isExternalWall
          || other instanceof deathrace.gameobjects.projectile.Projectile
          || other instanceof deathrace.gameobjects.Trap) {
          bike.setActive(false);
          bike.setVisible(false);
          bike.explode();
          this.bikeGroup.remove(bike);
        }
      }
    };

    Arena.prototype.endRound = function (winner) {
      this.time.delayedCall(1000, function() {
        console.log("Emitting round-end event");
        this.events.emit('round-end', winner.player);
      }, null, this);
    };

    Arena.prototype.spawnRandomPowerUps = function (min, max) {
      min = min || 3;
      max = max || 7;

      var numberOfPowerUps = Math.trunc(Math.random() * (max - min) + min);
      this.powerUps.clear(true);

      for (var i = 0; i < numberOfPowerUps; ++i) {
        var randomPosition = this.calculateRandomPosition();
        var powerUp = this.add.powerUp(randomPosition.x, randomPosition.y);
        this.powerUps.add(powerUp);
      }
    };

    Arena.prototype.spawnRandomTraps = function () {
      var numberOfTraps = Math.trunc(Math.random() * 3 + 1);
      this.traps.clear(true);

      for (var i = 0; i < numberOfTraps; ++i) {
        var trapsX = Math.trunc(Math.random() * this.horzLength);
        var trapsY = Math.trunc(Math.random() * this.vertLength);

        if ((this.horzLength / 2) < trapsX) {
          trapsX = trapsX - (this.margin + 32);
        } else {
          trapsX = trapsX + (this.margin + 32);
        }
        if ((this.vertLength / 2) < trapsY) {
          trapsY = trapsY - (this.margin + 32);
        } else {
          trapsY = trapsY + (this.margin + 32);
        }

        var trap = this.add.trap(trapsX, trapsY);
        this.traps.add(trap);
      }
    };

    Arena.prototype.calculateRandomPosition = function () {
      var margin = this.margin + 16;
      var position;

      var squared_radius = 10000; // 81 pixels squared

      do {
        position = new Phaser.Math.Vector2(
          Math.random() * (this.horzLength - margin) + margin,
          Math.random() * (this.vertLength - margin) + margin
        );

        var valid = true;

        for (var i = 0, length = this.powerUps.children.entries.length; i < length; ++i) {
          var other = this.powerUps.children.entries[i];
          var otherPosition = new Phaser.Math.Vector2(other.x, other.y);

          if (position.distanceSq(otherPosition) <= squared_radius) {
            // console.log("Position ({0},{1}) conflicts with ({2},{3})".format(position.x, position.y, otherPosition.x, otherPosition.y));
            valid = false;
            break;
          }
        }

        if (valid) {
          // console.log("Position ({0},{1}) is Valid!!".format(position.x, position.y));
        }
      } while (!valid);

      return position;
    };


    // Add to namespace
    deathrace.scenes.Arena = Arena;
  }
)();

