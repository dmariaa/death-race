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

(function() {
  var coordinates = [
    { x: 30,   y: 30,  xalign: "left",  yalign: "top" },
    { x: 1370, y: 30,  xalign: "right", yalign: "top" },
    { x: 30,   y: 870, xalign: "left",  yalign: "bottom" },
    { x: 1370, y: 870, xalign: "right", yalign: "bottom" }
  ];

  var Hud = function() {
    Phaser.Scene.call(this, {
      key: 'HUD',
      plugins: []
    });

    this.huds = {};
    this.graphics = undefined;
    this.scoreFormat = "Puntuación: {0}";
    this.textStyle = { fontFamily: 'Orbitron', fontSize: 30 };
  };

  Hud.prototype = Object.create(Phaser.Scene.prototype);
  Hud.prototype.constructor = Hud;

  Hud.prototype.create = function() {
    var arena = this.scene.get('ArenaScene');
    arena.events.on('score', this.updateScore, this);
    arena.events.on('powerup-attached', this.savePowerup, this);
    arena.events.on('powerup-released', this.releasePowerup, this);

    this.events.on('shutdown', this.shutdown, this);
  };

  Hud.prototype.shutdown = function() {
    console.log("HUD SHUTDOWN");
    this.huds = {};
    this.graphics = undefined;
  };

  Hud.prototype.createHud = function(hud) {
    if(!this.graphics) {
      this.graphics = this.add.graphics();
    }

    var coords = coordinates[hud];
    var xalign = coords.xalign;
    var yalign = coords.yalign;
    var x = coords.x;
    var y = coords.y;
    var inventoryBoxSize = 20;
    var slots = [];

    var score = this.add.text(x, y, this.scoreFormat.format(0), this.textStyle);
    score.setOrigin(xalign=='right' ? 1 : 0, yalign=='bottom' ? 1 : 0);
    this.graphics.lineStyle(1, 0xffffff);

    y += 55 * (yalign=='bottom' ? -1 : 1);
    x += inventoryBoxSize * (xalign=='right' ? -1 : 0);
    this.graphics.strokeRect(x, y, inventoryBoxSize, inventoryBoxSize);

    slots[xalign=='left' ? 0 : 2] = { x: x, y: y};

    x += (inventoryBoxSize + 10) * (xalign=='right' ? -1 : 1);
    this.graphics.strokeRect(x, y, inventoryBoxSize, inventoryBoxSize);
    slots[1] = { x: x, y: y };

    x += (inventoryBoxSize + 10) * (xalign=='right' ? -1 : 1);
    this.graphics.strokeRect(x, y, inventoryBoxSize, inventoryBoxSize);
    slots[xalign=='left' ? 2 : 0] = { x: x, y: y };

    return {
      score: score,
      slots: slots
    };
  };

  Hud.prototype.attach = function(id, bike) {
    var hud = this.createHud(id);
    this.huds[bike.name] = hud;
    console.log("HUD ATTACHED TO " + bike.name + " => " + JSON.stringify(this.huds));
  };

  Hud.prototype.updateScore = function(bike, score) {
    var hud = this.huds[bike.name];
    if(hud) {
      hud.score.setText(this.scoreFormat.format(score));
    }
  };

  Hud.prototype.savePowerup = function(bike, powerup, slot) {
    var hud = this.huds[bike.name];
    if(hud) {
      var slot = hud.slots[slot];
      slot.item = this.add.sprite(slot.x + 2, slot.y + 2, powerup.texture.key);
      slot.item.setScale(0.5, 0.5);
      slot.item.setOrigin(0, 0);
    }
  };

  Hud.prototype.releasePowerup = function(bike, slot) {
    var hud = this.huds[bike.name];
    if(hud) {
      var slot = hud.slots[slot];
      slot.item.destroy();
      slot.item = undefined;
    }
  };

  deathrace.scenes.Hud = Hud;
})();