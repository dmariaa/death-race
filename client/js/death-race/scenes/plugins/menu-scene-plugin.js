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
deathrace.scenes.plugins = deathrace.scenes.plugins || {};

(function() {
  var MenuPlugin = function(scene) {
    this.scene = scene;
    this.systems = scene.sys;

    if(!scene.sys.settings.isBooted) {
      scene.sys.events.once('boot', this.boot, this);
    }
  };

  MenuPlugin.prototype.register = function(pluginManager) {
    pluginManager.register('MenuPlugin', MenuPlugin, 'menu');
  };

  MenuPlugin.prototype.boot = function() {
    var eventEmitter = this.systems.events;
    eventEmitter.on('start', this.start, this);
  };

  MenuPlugin.prototype.start = function() {};

  MenuPlugin.prototype.create = function(config) {
    this.config = config;
    this.setupMenu();
    this.setupInput();
  };

  MenuPlugin.prototype.setupMenu = function() {
    var menuMarginLeft = this.config.marginLeft || 10;
    var menuMarginBottom = this.config.marginBottom || 10;
    var options = this.config.options;
    var menustyle = { fontFamily: "Orbitron", fontSize: 25 };

    var menuPosition = new Phaser.Math.Vector2(
      menuMarginLeft,
      this.scene.game.canvas.height - menuMarginBottom
    );

    this.menuGroup = this.scene.add.group();
    this.menuGroup.classType = Phaser.GameObjects.Text;

    for(var i = options.length - 1; i >= 0; i--) {
      var option = this.menuGroup.create(menuPosition.x, menuPosition.y, options[i].label, menustyle);
      option.setName(options[i].id);
      option.setOrigin(0, 1);
      option.setInteractive();
      menuPosition.y -= 40;
    }
  };

  MenuPlugin.prototype.setupInput = function() {
    this.scene.input.on('gameobjectdown', this.handleMenuClick, this);
    this.scene.input.on('gameobjectover', this.handleMenuOver, this);
    this.scene.input.on('gameobjectout', this.handleMenuOut, this);
    this.scene.input.keyboard.on('keydown', this.handleKeyDown, this);
  };

  MenuPlugin.prototype.handleKeyDown = function(event) {
    switch(event.code) {
      case 'ArrowDown':
        this.selectNext();
        break;
      case 'ArrowUp':
        this.selectPrevious();
        break;
      case 'Enter':
        if(!this.selectedMenu) return;
        this.scene.events.emit('menuselected', this.selectedMenu.name);
        break;
    };
  };

  MenuPlugin.prototype.handleMenuClick = function(pointer, gameObject) {
    console.log("Clicked on " + gameObject.name);
    this.scene.events.emit('menuselected', gameObject.name);
  };

  MenuPlugin.prototype.handleMenuOver = function(pointer, gameObject) {
    this.setSelected(gameObject);
  };

  MenuPlugin.prototype.handleMenuOut = function(pointer, gameObject) {
    if(this.selectedMenu) {
      this.selectedMenu.setFontStyle('normal');
      this.selectedMenu = undefined;
    }
  };

  MenuPlugin.prototype.getSelected = function() {
    return this.selectedMenu;
  };

  MenuPlugin.prototype.setSelected = function(gameObject) {
    if(this.selectedMenu) {
      this.selectedMenu.setFontStyle('normal');
    }
    gameObject.setFontStyle('bold');
    this.selectedMenu = gameObject;
  };

  MenuPlugin.prototype.selectNext = function() {
    var options = this.menuGroup.getChildren();
    var currentIdx = !this.selectedMenu ? options.length - 1 : options.indexOf(this.selectedMenu);
    if(this.selectedMenu) {
      var nextIdx = currentIdx - 1 < 0 ? options.length - 1 : currentIdx - 1;
    } else {
      var nextIdx = currentIdx;
    }
    this.setSelected(options[nextIdx]);
  };

  MenuPlugin.prototype.selectPrevious = function() {
    var options = this.menuGroup.getChildren();
    var currentIdx = !this.selectedMenu ? 0 : options.indexOf(this.selectedMenu);
    if(this.selectedMenu) {
      var nextIdx = currentIdx + 1 > options.length - 1 ? 0 : currentIdx + 1;
    } else {
      var nextIdx = currentIdx;
    }
    this.setSelected(options[nextIdx]);
  };


  deathrace.scenes.plugins.MenuPlugin = MenuPlugin;
})();