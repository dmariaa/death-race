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
    var Arena = function (properties) {
      Phaser.Scene.call(this, properties);
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

      /**
       * Array of powerups
       * @type {*[]}
       */
      this.powerUpsArray = [];
      // Resources loaded by game manager
    };

    /**
     * Scene create callback
     */
    Arena.prototype.create = function () {
      console.log("ArenaScene created");

      if(this.bikes.length > 0) {
        for(var i=0, length=this.bikes.length; i < length; i++) {
          if(this.bikes[i]) {
            this.bikes[i].destroy();
          }
        }

        this.bikes = new Array();
      }

      this.roundFinished = false;

      // Create arena
      this.createArena();

      // Create level
      this.createLevel(this.sceneData.levelId);

      // Create bikes
      this.createBikes(this.sceneData.players);

      // Generate power ups
      this.createPowerups(this.sceneData.powerUpsPositions);

      // Generate traps
      this.createTraps(this.sceneData.trapsPositions);

      // Groups for other objects
      this.shots = this.add.group();
      this.knifes = this.add.group();

      if(this.physics) {
        this.physics.add.overlap(this.bikeGroup, this.wallGroup, this.bikeCollision, null, this);
        this.physics.add.overlap(this.bikeGroup, this.bikeTrails, this.bikeCollision, null, this);
        this.physics.add.overlap(this.bikeGroup, this.level.walls, this.bikeCollision, null, this);
        this.physics.add.overlap(this.bikeGroup, this.powerUps, this.bikeCollision, null, this);
        this.physics.add.overlap(this.bikeGroup, this.traps, this.bikeCollision, null, this);
      }

      // Load press-any-key scene
      this.scene.get('Countdown').parentScene = this;
      this.scene.launch('Countdown');
      this.scene.bringToTop('Countdown');
      this.scene.pause();

      this.events.on('pause', this.pauseScene, this);
      this.events.on('resume', this.resumeScene, this);
      this.events.on('shutdown', this.shutdownScene, this);

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

    Arena.prototype.setupNetworkInput = function(bike, playerId) {
      if(!this.networkController) {
        this.networkController = new deathrace.inputhandler.NetworkController(this.connection);
        this.networkController.setCommands([
          { key: this.networkController.actions.STEER_LEFT, command: new deathrace.inputhandler.CommandSteerLeft },
          { key: this.networkController.actions.STEER_RIGHT, command: new deathrace.inputhandler.CommandSteerRight },
          { key: this.networkController.actions.BREAK, command: new deathrace.inputhandler.CommandToggleBreak },

          { key: this.networkController.actions.POWERUP_1, command: new deathrace.inputhandler.CommandUseInventoryItem1 },
          { key: this.networkController.actions.POWERUP_2, command: new deathrace.inputhandler.CommandUseInventoryItem2 },
          { key: this.networkController.actions.POWERUP_3, command: new deathrace.inputhandler.CommandUseInventoryItem3 }
        ]);
      }

      this.networkController.addClient(playerId, bike);
    };

    /**
     * Pauses Arena execution
     */
    Arena.prototype.pauseScene = function () {
      this.sound.setMute(true);
    };

    /**
     * Resumes Arena execution
     */
    Arena.prototype.resumeScene = function () {
      this.sound.setMute(false);
    };

    /**
     * Shutdown handler
     */
    Arena.prototype.shutdownScene = function() {
      console.log("Destroying scene");
      for(var i=0, length=this.bikes.length; i < length; i++) {
        if(this.bikes[i]) {
          this.bikes[i].destroy();
        }
      }
      this.bikes = new Array();
    };

    /**
     * @override Phaser.scene.update
     */
    Arena.prototype.update = function (time, delta) {
      if(this.isHost) {
        this.updateBikes(time, delta);
      }
    };

    Arena.prototype.checkWinner = function() {
      if (this.bikeGroup.getLength() == 1 && !this.roundFinished) {
        this.roundFinished = true;
        var bikes = this.bikeGroup.getChildren();
        var winner = bikes[0];
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

          if(this.isHost) {
            console.log("Pickup powerup sent");

            this.connection.send(JSON.stringify({
              command: "GAME_UPDATED",
              type: "POWERUP_PICKUP",
              game: this.hostData.game.id,
              player: bike.player.uuid,
              bike: bike.player.bikeId,
              powerup: other.powerUpId
            }));
          }
        }
      } else {
        if (bike.horn && !other.isExternalWall && !other.isTrail) {
          bike.breakWall(other);
        } else if (bike.ghost === false
          || other.isExternalWall
          || other instanceof deathrace.gameobjects.projectile.Projectile
          || other instanceof deathrace.gameobjects.Trap) {

          if(bike.trail.walls[1]==other || bike.trail.walls[0]==other) {
            return;
          }

          if(bike.turning) {
            console.log("BIKE TURNING");
            if(bike.trail.getLength() > 20) {
              console.log("END BIKE TURNING");
              bike.turning = false;
            }
            return;
          }

          if(this.isHost) {
            console.log("Bike crash sent");

            this.connection.send(JSON.stringify({
              command: "GAME_UPDATED",
              type: "BIKE_CRASH",
              game: this.hostData.game.id,
              player: bike.player.uuid,
              bike: bike.player.bikeId
            }));
          }

          this.bikeCrash(bike);
          this.checkWinner();
        }
      }
    };

    Arena.prototype.bikeCrash = function(bike) {
      bike.setActive(false);
      bike.setVisible(false);
      bike.explode();
      this.bikeGroup.remove(bike);
    };

    Arena.prototype.updateBikes = function(time, delta) {
      var updateBikesData = [];
      for(var i=0, length=this.bikes.length; i < length; ++i) {
        var bike = this.bikes[i];

        if(!bike.active) {
          continue;
        }

        bike.update(time, delta);

        updateBikesData.push({
          bikeIdx: i,
          bike: bike.name,
          x: bike.x,
          y: bike.y,
          directionX: bike.directionVector.x,
          directionY: bike.directionVector.y,
          score: bike.score
        });
      }

      if(this.isHost) {
        this.connection.send(JSON.stringify({
          command: "GAME_UPDATED",
          game: this.hostData.game.id,
          player: this.currentPlayer.uuid,
          data: updateBikesData
        }));
      }
    };

    Arena.prototype.endRound = function (winner) {
      console.log("endRound called");

      winner.player.score += winner.score + 100;
      winner.setActive(false);
      this.bikeGroup.remove(winner);

      this.time.delayedCall(1000, function() {
        console.log("Emitting round-end event");
        this.events.emit('round-end', winner.player);
      }, null, this);
    };

    Arena.prototype.spawnRandomPowerUps = function (min, max) {
      min = min || 3;
      max = max || 7;

      var numberOfPowerUps = Math.trunc(Math.random() * (max - min) + min);
      var powerUpsPositions = [];

      for (var i = 0; i < numberOfPowerUps; ++i) {
        var randomPosition = this.calculateRandomPosition(powerUpsPositions);
        powerUpsPositions.push({
          type: deathrace.gameobjects.powerups.Types.randomType(),
          position: randomPosition
        });
      }

      return powerUpsPositions;
    };

    Arena.prototype.spawnRandomTraps = function (min, max) {
      min = min || 3;
      max = max || 7;

      var numberOfTraps = Math.trunc(Math.random() * (max - min) + min);
      var trapsPositions = [];

      for (var i = 0; i < numberOfTraps; ++i) {
        var randomPosition = this.calculateRandomPosition(trapsPositions);
        trapsPositions.push(randomPosition);
      }

      return trapsPositions;
    };

    Arena.prototype.calculateRandomPosition = function (alreadyUsedPositions) {
      var margin = this.margin + 32;
      var position;

      var squared_radius = 10000; // 81 pixels squared

      do {
        position = new Phaser.Math.Vector2(
          Math.random() * (this.horzLength - margin) + margin,
          Math.random() * (this.vertLength - margin) + margin
        );

        var valid = true;

        for (var i = 0, length = alreadyUsedPositions.length; i < length; ++i) {
          var otherPosition = alreadyUsedPositions[i];
          if (position.distanceSq(otherPosition) <= squared_radius) {
            valid = false;
            break;
          }
        }
      } while (!valid);

      return position;
    };

    Arena.prototype.createArena = function() {
      // Building grid
      this.gridColor = 0x000040;
      this.grid = this.add.grid(this.margin, this.margin, this.horzLength, this.vertLength, 32, 32, 0x000000, 1, this.gridColor, 1);
      this.grid.setOrigin(0, 0);

      // Building external walls
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

      if(this.physics) {
        this.wallGroup = this.physics.add.group();
        this.wallGroup.add(this.northWall);
        this.wallGroup.add(this.southWall);
        this.wallGroup.add(this.eastWall);
        this.wallGroup.add(this.westWall);
      }
    };

    Arena.prototype.createBikes = function(players) {
      console.log("CREATE BIKES CALLED");
      var spawnPoints = this.level.bikeSpawnPoints;
      this.bikeGroup = this.add.group();
      this.bikeTrails = this.add.group();

      var currentPlayer = this.registry.get('current-player');

      for (var i = 0, length = players.length; i < length; ++i) {
        var player = players[i];
        var bike = this.add.bike(spawnPoints[i].x, spawnPoints[i].y, player.name,
          deathrace.utils.colors[player.color].value);

        player.bikeId = i;
        bike.player = player;
        this.scene.get('HUD').attach(i, bike);

        /*
        if (player.gamepad) {
          this.setupGamePad(player.gamepad, bike);
        } else {
          if (player.keyboard === Phaser.Input.Keyboard.KeyCodes.A) {
            this.setupKeyboard2(bike);
          } else if (player.keyboard === Phaser.Input.Keyboard.KeyCodes.LEFT) {
            this.setupKeyboard1(bike);
          }
        }
        */

        if(player.uuid===currentPlayer.uuid) {
          this.setupKeyboard2(bike);
        } else {
          this.setupNetworkInput(bike, player.uuid);
        }

        this.bikeGroup.add(bike);
        this.bikes.push(bike);
      }
    };

    Arena.prototype.createLevel = function(levelId) {
      this.level = this.add.level();
      this.level.loadLevel(levelId);
    };

    Arena.prototype.createPowerups = function(powerUpsPositions) {
      if(!this.powerUps || !this.powerUps.children) {
        this.powerUps = this.add.group();
      } else {
        this.powerUps.clear(true);
      }

      for(var i=0, length=powerUpsPositions.length; i < length; ++i) {
        var powerupData = powerUpsPositions[i];
        var powerUp = this.add.powerUp(powerupData.position.x, powerupData.position.y, powerupData.type);
        powerUp.powerUpId = i;
        this.powerUps.add(powerUp);
        this.powerUpsArray.push(powerUp);
      }
    };

    Arena.prototype.createTraps = function(trapsPositions) {
      if(!this.traps || !this.traps.children) {
        this.traps = this.add.group();
      } else {
        this.traps.clear(true);
      }

      for(var i=0, length=trapsPositions.length; i < length; ++i) {
        var randomPosition = trapsPositions[i];
        var trap = this.add.trap(randomPosition.x, randomPosition.y);
        this.traps.add(trap);
      }
    };

    Arena.prototype.getPlayers = function() {
      return this.sceneData.players;
    };

    // Add to namespace
    deathrace.scenes.Arena = Arena;
  }
)();

