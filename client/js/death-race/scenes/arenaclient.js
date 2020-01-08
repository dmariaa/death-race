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
  var ArenaClient = function() {
    deathrace.scenes.Arena.call(this, {
      key: 'ArenaClientScene',
      input: {
        gamepad: true
      }
    });

    this.isHost = false;
  };

  ArenaClient.prototype = Object.create(deathrace.scenes.Arena.prototype);
  ArenaClient.prototype.constructor = ArenaClient;

  ArenaClient.prototype.create = function(data) {
    this.connection = data.connection;
    this.connection.addEventListener('message', this.handleMessage.bind(this));
  };

  ArenaClient.prototype.handleMessage = function (msg) {
    var message = JSON.parse(msg.data);
    if(message.command==='GAME_UPDATED') {
      var bikesData = message.data;
      for(var i=0, length=bikesData.length; i < length; ++i) {
        var bikeData = bikesData[i];
        var bike = this.bikes[bikeData.bikeIdx];

        if(bike.directionVector.x != bikeData.directionX || bike.directionVector.y != bikeData.directionY) {
          bike.turnBikeAndTrail(bikeData.directionX, bikeData.directionY);
        } else {
          bike.updateBike(bikeData.x, bikeData.y, bikeData.score);
        }


      }
    } else if(message.command==='GAME_STARTED') {
      this.sceneData = message.data;
      namespace.Arena.prototype.create.call(this);
    }
  };

  ArenaClient.prototype.update = function(time, delta) {
  };

  namespace.ArenaClient = ArenaClient;
})(deathrace.scenes);
