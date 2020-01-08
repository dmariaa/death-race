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

    this.isHost = true;
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
    console.log("ArenaHostScene loaded");
    this.hostData = data;

    this.currentPlayer = this.registry.get('current-player');

    this.sceneData = {
      levelId: Math.floor(Math.random() * deathrace.gameobjects.levels.LevelData.length),
      powerUpsPositions: this.spawnRandomPowerUps(5, 15),
      trapsPositions: this.spawnRandomTraps(3, 6),
      players: data.game.players
    };

    this.connection = data.connection;
    this.connection.addEventListener('message', this.handleMessage.bind(this));
    var createCommand = {
      command: "GAME_STARTED",
      data: this.sceneData,
      game: data.game.id,
      player: this.currentPlayer.uuid
    };

    this.connection.send(JSON.stringify(createCommand));
    namespace.Arena.prototype.create.call(this);
  };

  ArenaHost.prototype.handleMessage = function (message) {
  };

  ArenaHost.prototype.handleOpen = function (message) {
  };

  ArenaHost.prototype.handleClose = function (message) {
  };

  namespace.ArenaHost = ArenaHost;
})(deathrace.scenes);
