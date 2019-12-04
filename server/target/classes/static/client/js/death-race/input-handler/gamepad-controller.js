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
   *
   * @param gamepad
   * @param commands
   * @constructor
   */
  var GamepadController = function(commands, gamepad) {
    this.actions = Object.freeze({
      X_BUTTON: 0,
      CIRCLE_BUTTON: 1,
      SQUARE_BUTTON: 2,
      TRIANGLE_BUTTON: 3,
      CURSOR_UP: 12,
      CURSOR_DOWN: 13,
      CURSOR_LEFT: 14,
      CURSOR_RIGHT: 15,
      TRIGGER_L1: 4,
      TRIGGER_L2: 6,
      TRIGGER_R1: 5,
      TRIGGER_R2: 7
    });

    /**
     * Current gamepad
     * @type {Phaser.Input.Gamepad}
     */
    this.gamepad;

    /**
     * Array of commands tied to actions
     */
    this.commands;

    this.setCommands(commands);
    this.setGamepad(gamepad);
    this.pressed = [];
  };

  GamepadController.prototype.setGamepad = function(gamepad) {
    if(this.gamepad) {
        this.gamepad.removeAllListeners();
    }

    this.gamepad = gamepad;

    if(gamepad) {
      this.gamepad.on('down', this.handleButton, this);
    }
  };

  GamepadController.prototype.setCommands = function(commands) {
    this.commands = commands;
  };

  GamepadController.prototype.handleButton = function(index, status, button) {
      console.log("Gamepad button [{0}] status [{1}]: ".format(index, status) + button);
      var command = this.commands.find(function(data) {
        return data.key==button.index;
      });

      if(command) {
        command.command.execute();
      }

      this.pressed[index] = true;
  };

  namespace.GamepadController = GamepadController;
})(deathrace.inputhandler);