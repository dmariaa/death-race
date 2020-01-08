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
deathrace.inputhandler = deathrace.inputhandler || {};

(function(namespace) {
  var NetworkController = function(webSocket) {
    this.actions = Object.freeze({
      STEER_LEFT: "steerleft",
      STEER_RIGHT: "steerright",
      BREAK: "break",
      POWERUP_1: "powerup1",
      POWERUP_2: "powerup2",
      POWERUP_3: "powerup3"
    });

    this.clients = {};

    this.connection = webSocket;
    this.connection.addEventListener('message', this.handleWebsocketMessage.bind(this));
  };

  NetworkController.prototype.addClient = function(playerId, bike) {
    this.clients[playerId] = bike;
  };

  NetworkController.prototype.handleWebsocketMessage = function(msg) {
    var message = JSON.parse(msg.data);
    if(message.command==='INPUT') {
      this.handleCommand(message.player, message.input_string);
    }
  };

  NetworkController.prototype.setCommands = function(commands) {
    this.commands = commands;
  };

  NetworkController.prototype.handleCommand = function(player, input_string) {
    var bike = this.clients[player];
    if(!bike) return;

    var command = this.commands.find(function(data) {
      return data.key===input_string;
    });

    if(!command) return;
    command.command.execute(bike);
  };

  deathrace.inputhandler.NetworkController = NetworkController;
})(deathrace.inputhandler);
