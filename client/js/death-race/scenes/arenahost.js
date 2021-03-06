/*
 * Copyright 2020 dmariaa
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

(function (namespace) {
  var ArenaHost = function () {
    deathrace.scenes.Arena.call(this, {
      key: "ArenaHostScene",
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

    this.parent = deathrace.scenes.Arena.prototype;

    this.isHost = true;

    this.networkCommands = {
      'steer-left': new deathrace.inputhandler.CommandSteerLeft,
      'steer-right': new deathrace.inputhandler.CommandSteerRight,
      'break-on': new deathrace.inputhandler.CommandBreakOn,
      'break-off': new deathrace.inputhandler.CommandBreakOff,
      'use-item-1': new deathrace.inputhandler.CommandUseInventoryItem1,
      'use-item-2': new deathrace.inputhandler.CommandUseInventoryItem2,
      'use-item-3': new deathrace.inputhandler.CommandUseInventoryItem3
    };

    this.handleMessageBinded = this.handleMessage.bind(this);
  };

  // Inheritance, Arena extends Phaser.Scene
  ArenaHost.prototype = Object.create(deathrace.scenes.Arena.prototype);
  ArenaHost.prototype.constructor = ArenaHost;

  /**
   * Scene Preloading callback
   */
  ArenaHost.prototype.preload = function () {
    namespace.Arena.prototype.preload.call(this);
  };

  /**
   * Scene create callback
   */
  ArenaHost.prototype.create = function (data) {
    console.log("ArenaHostScene created");
    this.hostData = data;

    this.currentPlayer = this.registry.get('current-player');

    this.sceneData = {
      levelId: Math.floor(Math.random() * deathrace.gameobjects.levels.LevelData.length),
      powerUpsPositions: this.spawnRandomPowerUps(5, 15),
      trapsPositions: this.spawnRandomTraps(3, 6),
      players: data.game.players
    };

    this.connection = data.connection;
    this.connection.removeEventListener('message', this.handleMessageBinded);
    this.connection.addEventListener('message', this.handleMessageBinded);
    var createCommand = {
      command: "GAME_STARTED",
      data: this.sceneData,
      game: data.game.id,
      player: this.currentPlayer.uuid
    };

    this.connection.send(JSON.stringify(createCommand));
    namespace.Arena.prototype.create.call(this);
  };

  ArenaHost.prototype.handleMessage = function (msg) {
    var message = JSON.parse(msg.data);
    if(message.command==='INPUT') {
      console.log("INPUT " + message.input + " received");
      var command = this.networkCommands[message.input];
      var bike = this.bikes[message.bike];
      command.bike = bike;
      command.execute();
    }
  };

  ArenaHost.prototype.endRound = function (winner) {
    console.log("END_ROUND SENT");

    this.connection.send(JSON.stringify({
      command: "GAME_UPDATED",
      type: "END_ROUND",
      game: this.hostData.game.id,
      player: winner.player.uuid,
      bike: winner.player.bikeId
    }));

    this.parent.endRound.call(this, winner);
  };

  ArenaHost.prototype.handleOpen = function (message) {
  };

  ArenaHost.prototype.handleClose = function (message) {
  };

  namespace.ArenaHost = ArenaHost;
})(deathrace.scenes);
