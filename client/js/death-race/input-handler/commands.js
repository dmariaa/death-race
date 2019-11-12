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
  var Command = function(bike) {
    /**
     * Bike tied to this command
     * @type {deathrace.gameobjects.Bike}
     */
    this.bike = bike;
  };

  Command.prototype.execute = function(bike) {
    throw new Error("Must be implemented");
  };

  namespace.Command = Command;

  /**
   * Bike left steering
   * @constructor
   * @extends InputHandler
   */
  var CommandSteerLeft = function(bike) {
    Command.call(this, bike);
  };

  CommandSteerLeft.prototype = Object.create(Command.prototype);
  CommandSteerLeft.constructor = CommandSteerLeft;

  CommandSteerLeft.prototype.execute = function() {
    if(this.bike.active) {
      this.bike.turnLeft();
    }
  };

  namespace.CommandSteerLeft = CommandSteerLeft;

  /**
   * Bike right steering
   * @constructor
   * @extends InputHandler
   */
  var CommandSteerRight = function(bike) {
    Command.call(this, bike);
  };

  CommandSteerRight.prototype = Object.create(Command.prototype);
  CommandSteerRight.constructor = CommandSteerLeft;

  CommandSteerRight.prototype.execute = function() {
    if(this.bike.active) {
      this.bike.turnRight();
    }
  };

  namespace.CommandSteerRight = CommandSteerRight;

  var CommandToggleBreak = function(bike, press) {
    Command.call(this, bike);
    this.press = press;
  };

  CommandToggleBreak.prototype = Object.create(Command.prototype);
  CommandToggleBreak.constructor = CommandToggleBreak;

  CommandToggleBreak.prototype.execute = function() {
    this.bike.toggleBreak(this.press);
  };

  namespace.CommandToggleBreak = CommandToggleBreak;

  /**
   * Bike inventory item using
   * @constructor
   * @extends InputHandler
   */
  var CommandUseInventoryItem = function(bike, item) {
    Command.call(this, bike);
    this.itemSlot = item;
  };

  CommandUseInventoryItem.prototype = Object.create(Command.prototype);
  CommandUseInventoryItem.constructor = CommandSteerLeft;

  CommandUseInventoryItem.prototype.execute = function() {
    if(this.bike.active) {
      this.bike.launchPowerUp(this.itemSlot);
    }
  };

  namespace.CommandUseInventoryItem = CommandUseInventoryItem;
})(deathrace.inputhandler);