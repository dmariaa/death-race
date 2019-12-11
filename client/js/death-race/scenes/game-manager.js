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

(function(namespace) {
  var GameManager = function() {
    Phaser.Scene.call(this, {
      key: "GameManager"
    });
  };

  GameManager.prototype = Object.create(Phaser.Scene.prototype);
  GameManager.prototype.constructor = GameManager;

  GameManager.prototype.preload = function() {
    console.log("Loading global resources");

    // Backgrounds
    this.load.image('background', 'img/backgrounds/start_screen.png');
    this.load.image('general-background', 'img/backgrounds/general_background.png');

    // Menu music
    this.load.audio('menu-sound', 'sounds/menu-sound.wav');

    // Game music
    this.load.audio('background-sound', 'sounds/background-sound.wav');

    // Sound effects
    this.load.audio('bike-engine', 'sounds/bike-engine.wav');
    this.load.audio('bike-explosion', 'sounds/explosion-05.wav');

    // HTML AND CSS TEMPLATES
    this.load.html('settings-html', 'html/settings.html');
    this.load.css('settings-css', 'css/settings.css');
    this.load.html('login-form-html', 'html/login.html');
    this.load.css('login-form-css', 'css/login.css');

    // Sprites
    this.load.image('bike', 'img/sprites/bike.png');
    this.load.image('shot', 'img/sprites/shot.png');
    this.load.image('knife', 'img/sprites/knife.png');
    this.load.image('trap', 'img/sprites/TRAP.png');
    this.load.image('powerups.GB', 'img/sprites/powerups/GB.png');
    this.load.image('powerups.LS', 'img/sprites/powerups/LS.png');
    this.load.image('powerups.MS', 'img/sprites/powerups/MS.png');
    this.load.image('powerups.PW', 'img/sprites/powerups/PW.png');
    this.load.image('powerups.SD', 'img/sprites/powerups/SD.png');
    this.load.image('powerups.SK', 'img/sprites/powerups/SK.png');
    this.load.image('powerups.SP', 'img/sprites/powerups/SP.png');
    this.load.image('powerups.DH', 'img/sprites/powerups/DH.png');
    this.load.image('powerups.FP', 'img/sprites/powerups/FP.png');
    this.load.image('powerups.TW', 'img/sprites/powerups/TW.png');
    this.load.image('powerups.GC', 'img/sprites/powerups/GC.png');
    this.load.image('powerups.unknown', 'img/sprites/powerups/unknown.png');
  };

  GameManager.prototype.create = function() {
    this.music = {
      'menu-sound': this.sound.add('menu-sound'),
      'background-sound': this.sound.add('background-sound')
    };

    this.effects = {
      'bike-engine': this.sound.add('bike-engine'),
      'bike-explosion': this.sound.add('bike-explosion')
    };

    this.registry.events.on('setdata', function(parent, key, value) {
      if(key=='current-player') {
        var preferences = value.preferences;
        this.setMusicPreferences(preferences);
        this.setEffectsPreferences(preferences);
        this.saveUserPreferences();
      }
    }, this);

    this.registry.events.on('changedata', function(parent, key, value) {
      if(key=='current-player') {
        var preferences = value.preferences;
        this.setMusicPreferences(preferences);
        this.setEffectsPreferences(preferences);
        this.saveUserPreferences();
      }
    }, this);

    console.log("GameManager launching LoginScene");
    this.scene.launch('LoginScene');
  };

  GameManager.prototype.setMusicPreferences = function(preferences) {
    var mute = !preferences['game-music'];
    this.music['menu-sound'].setMute(mute);
    this.music['background-sound'].setMute(mute);

    var volume = preferences['game-music-volume'];
    this.music['menu-sound'].setVolume(volume);
    this.music['background-sound'].setVolume(volume);

    console.log("Music preferences set to: [{0},{1}]".format(mute ? 'muted' : 'not muted', volume));
  };

  GameManager.prototype.setEffectsPreferences = function(preferences) {
    var mute = !preferences['game-sound'];
    var volume = preferences['game-sound-volume'];

    var effectsKeys = Object.keys(this.effects);
    for(var i=0, length=effectsKeys.length; i<length; ++i) {
      var effect = this.effects[effectsKeys[i]];
      effect.setMute(mute);
      effect.setVolume(volume);
    }

    console.log("Effects preferences set to: [{0},{1}]".format(mute ? 'muted' : 'not muted', volume));
  };

  GameManager.prototype.playMusic = function(name, loop = false) {
    if(this.music[name]) {
      console.log("Playing music: " + name);
      this.music[name].play({ loop: loop });
    }
  };

  GameManager.prototype.stopMusic = function(name) {
    if(this.music[name]) {
      console.log("Stopping music: " + name);
      this.music[name].stop();
    }
  };

  GameManager.prototype.playEffect = function(name, loop = false) {
    if(this.effects[name]) {
      console.log("Playing effect: " + name);
      this.effects[name].play({ loop: loop });
    }
  };

  GameManager.prototype.stopEffect = function(name) {
    if(this.effects[name]) {
      console.log("Stopping effect: " + name);
      this.effects[name].stop();
    }
  };

  GameManager.prototype.saveUserPreferences = function() {
    var data = this.registry.get('current-player');
    $.ajax({
      url: '/players/' + data.uuid,
      method: 'PUT',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data)
    })
  };

  namespace.GameManager = GameManager;
})(deathrace.scenes);
