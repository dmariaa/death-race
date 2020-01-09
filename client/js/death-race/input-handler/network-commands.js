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
deathrace.inputhandler = deathrace.inputhandler || {};

(function(namespace) {
  /**
   * Abstract command class
   * @constructor
   */
  var NetworkCommand = function(bike, data) {
    /**
     * Bike tied to this command
     * @type {deathrace.gameobjects.Bike}
     */
    this.bike = bike;
    this.data = data;
    this.input_type;
  };

  NetworkCommand.prototype.execute = function() {
    if(this.bike.active && this.input_type) {
      console.log(this.input_type + " sent");
      this.data.connection.send(JSON.stringify({
        command: "INPUT",
        game: this.data.game.id,
        player: this.bike.player.uuid,
        bike: this.bike.player.bikeId,
        input: this.input_type
      }));
    }
  };

  namespace.NetworkCommand = NetworkCommand;

  /**
   * Bike left steering
   * @constructor
   * @extends InputHandler
   */
  var NetworkSteerLeft = function(bike, data) {
    NetworkCommand.call(this, bike, data);
    this.input_type="steer-left";
  };

  NetworkSteerLeft.prototype = Object.create(NetworkCommand.prototype);
  NetworkSteerLeft.constructor = NetworkSteerLeft;
  namespace.NetworkSteerLeft = NetworkSteerLeft;

  /**
   * Bike right steering
   * @constructor
   * @extends InputHandler
   */
  var NetworkSteerRight = function(bike, data) {
    NetworkCommand.call(this, bike, data);
    this.input_type="steer-right";
  };

  NetworkSteerRight.prototype = Object.create(NetworkCommand.prototype);
  NetworkSteerRight.constructor = NetworkSteerLeft;

  namespace.NetworkSteerRight = NetworkSteerRight;

  var NetworkToggleBreak = function(bike, press, data) {
    NetworkCommand.call(this, bike, data);
    this.press = press;
  };

  NetworkToggleBreak.prototype = Object.create(NetworkCommand.prototype);
  NetworkToggleBreak.constructor = NetworkToggleBreak;

  NetworkToggleBreak.prototype.execute = function() {
    if(this.press) {
      this.input_type="break-on";
    } else {
      this.input_type="break-off";
    }

    namespace.NetworkCommand.prototype.execute.call(this);
  };

  namespace.NetworkToggleBreak = NetworkToggleBreak;

  /**
   * Bike inventory item using
   * @constructor
   * @extends InputHandler
   */
  var NetworkUseInventoryItem = function(bike, item, data) {
    NetworkCommand.call(this, bike, data);
    this.itemSlot = item;
    this.input_type = "use-item-" + item;
  };

  NetworkUseInventoryItem.prototype = Object.create(NetworkCommand.prototype);
  NetworkUseInventoryItem.constructor = NetworkUseInventoryItem;

  namespace.NetworkUseInventoryItem = NetworkUseInventoryItem;
})(deathrace.inputhandler);
