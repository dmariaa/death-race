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
  var KeyboardController = function(commands, keyboard) {
    /**
     * Current keyboard plugin
     * @type {Phaser.Input.Keyboard.KeyboardPlugin}
     */
    this.keyboard;

    /**
     * Array of commands tied to actions
     */
    this.commands;

    this.setKeyboard(keyboard);
    this.setCommands(commands);
  };

  KeyboardController.prototype.setKeyboard = function(keyboard) {
    if(this.keyboard) {
      this.keyboard.removeAllListeners();
    }

    this.keyboard = keyboard;

    if(keyboard) {
      this.keyboard.on('keydown', this.handleInput, this);
      this.keyboard.on('keyup', this.handleInput, this);
    }
  };

  KeyboardController.prototype.setCommands = function(commands) {
    this.commands = commands;
  };

  KeyboardController.prototype.handleInput = function(event) {
    console.log(event.type);

     var command = this.commands.find(function(data) {
       return data.key==event.keyCode && data.type==event.type;
     });

     if(command) {
       command.command.execute();
     }
  };

  namespace.KeyboardController = KeyboardController;
})(deathrace.inputhandler);