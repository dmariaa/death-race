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
deathrace.gameobjects = deathrace.gameobjects || {};

(function () {
  var HALF_PI = Math.PI / 2;
  var PI = Math.PI;

  /**
   * Bike class constructor.
   * @param scene scene
   * @param x Position vector X
   * @param y Position vector Y
   * @param texture Bike texture
   * @param color Bike color
   * @constructor
   */
  var Bike = function (scene, x, y, name, color) {
    texture = 'bike';
    Phaser.GameObjects.Sprite.call(this, scene, x, y, texture);
    scene.physics.add.existing(this);

    this.genericColor = 0xff0000;
    this.name = name + '-bike';
    this.speed = 0.15;
    this.color = color;
    this.directionVector = new Phaser.Math.Vector2(0, 1);
    this.trail = this.scene.add.trail(this);
    this.active = true;
    this.rotation = 0;
    this.ghost = false;
    this.collided = false;
    this.ghost = false;
    this.horn = false;
    this.radius = 150;
    this.puppet = false;

    this.body.syncBounds = true;
    this.setDisplayOrigin(6, 6.5);
    this.physicsCorrectionOffset = 7;
    this.trailOffset = this.physicsCorrectionOffset + 1;

    // Explosion texture
    var rt = scene.textures.createCanvas(this.name + '-bikepieces', 5, 5);
    rt.context.fillStyle = this.color.rgba;
    rt.context.fillRect(0, 0, 5, 5);
    rt.refresh();

    // Explosion particles
    var expl = scene.add.particles(this.name + '-bikepieces');
    this.explosion = expl.createEmitter({
      speed: {min: -800, max: 800},
      alpha: {start: 1.0, end: 0},
      angle: {min: 0, max: 360},
      blendMode: Phaser.BlendModes.NORMAL,
      radial: true,
      quantity: 100,
      lifespan: 800,
      on: false
    });

    // Engine sound
    this.engineSound = scene.sound.add('bike-engine');
    this.engineSound.play({
      volume: .3,
      loop: true
    });


    // Explosion sound
    this.explosionSound = scene.sound.add('bike-explosion');

    // Set color
    this.setColors();

    this.score = 0;

    //PowerUps
    this.inventory = {
      0: undefined,
      1: undefined,
      2: undefined
    };
  };

  // Inheritance, Bike extends Phaser.GameObjects.Sprite
  Bike.prototype = Object.create(Phaser.GameObjects.Sprite.prototype);
  Bike.prototype.constructor = Bike;

  /**
   * Destroys bike, with explosion particle system and sounds
   */
  Bike.prototype.explode = function () {
    this.engineSound.stop();
    this.explosionSound.play();
    this.explosion.setPosition(this.x, this.y);
    this.trail.set(this.x, this.y);
    this.explosion.explode();
    this.destroy();
  };

  /**
   * Adds three PowerUp
   */
  Bike.prototype.addPowerUp = function (powerup) {
    for(var i=0; i<3; ++i) {
      if(!this.inventory[i]) {
        this.inventory[i] = powerup;
        this.scene.events.emit('powerup-attached', this, powerup, i);
        return true;
      }
    }

    return false;
  };

  /**
   * Launch powerup in given slot
   * @param index Slot
   */
  Bike.prototype.launchPowerUp = function (slot) {
    if(this.inventory[slot]) {
      this.inventory[slot].on('powerup-finished', this.removePowerUp.bind(this, slot));
      this.inventory[slot].launch(this);
    }
  };

  /**
   * Removes powerup from spot and destroy it
   * @param index
   */
  Bike.prototype.removePowerUp = function(slot) {
    if(this.inventory[slot]) {
      this.inventory[slot].destroy;
      this.inventory[slot] = undefined;
      this.scene.events.emit('powerup-released', this, slot);
    }
  };

  Bike.prototype.inRadius = function () {
    console.log("Bike.inRadius");
  };

  Bike.prototype.spawnKnife = function () {
    var knife = this.scene.add.knife(this.x, this.y, this.directionVector.clone());
    this.scene.knifes.add(knife);
  };

  Bike.prototype.spawnShot = function () {
    this.scene.shots.add(this.scene.add.shot(this.x, this.y, this.directionVector.clone()));
  };

  Bike.prototype.breakWall = function(wall) {
    this.scene.level.breakWall(wall, this.x, this.y);
    this.emit('break-wall');
  };

  /**
   * Replaces this bike colors
   * with selected color palette.
   */
  Bike.prototype.setColors = function () {
    var tx = this.texture;
    var img = tx.getSourceImage();
    var textureName = this.name + '-texture';

    var ct = this.scene.textures.createCanvas(textureName, img.width, img.height);
    ct.context.drawImage(img, 0, 0);

    var pixelsData = ct.context.getImageData(0, 0, ct.width, ct.height);
    var pixels = pixelsData.data;
    for (var i = 0, length = pixels.length; i < length - 4; i += 4) {
      var r = pixels[i],
        g = pixels[i + 1],
        b = pixels[i + 2],
        a = pixels[i + 3];

      if (r === 255 & g === 0 & b === 0 & a === 255) {
        pixels[i] = this.color.red;
        pixels[i + 1] = this.color.green;
        pixels[i + 2] = this.color.blue;
        pixels[i + 3] = this.color.alpha;
      }
    }
    ct.context.putImageData(pixelsData, 0, 0);
    ct.refresh();
    this.setTexture(textureName);
  };

  /**
   * Pre update, needed to call update
   * @param time
   * @param delta
   */
  Bike.prototype.preUpdate = function (time, delta) {
    Phaser.GameObjects.Sprite.prototype.preUpdate.call(this, time, delta);
    this.update(time, delta);
  };

  /**
   * Update method, updates bike position and trail
   * @param time
   * @param delta
   */
  Bike.prototype.update = function (time, delta) {
    this.setPosition(
      this.x + this.directionVector.x * this.speed * delta,
      this.y + this.directionVector.y * this.speed * delta
    );

    this.trail.set(
      this.x - this.directionVector.x * this.trailOffset,
      this.y - this.directionVector.y * this.trailOffset
    );

    this.score = Math.trunc(this.trail.getLength() * 0.1);
    this.scene.events.emit('score', this, this.score);
  };

  Bike.prototype.getPosX = function () {
    return this.x;
  };
  Bike.prototype.getPosY = function () {
    return this.y;
  };
  /**
   * Toggles breaks
   * @param breaking true to break, false to release brake
   */
  Bike.prototype.toggleBreak = function (breaking) {
    if (breaking && !this.breaking) {
      this.speed = this.speed * 0.85;
      this.engineSound.setDetune(-50);
      this.breaking = true;
    } else if(!breaking && this.breaking) {
      this.breaking = false;
      this.speed = this.speed * 1.15;
      this.engineSound.setDetune(50);
    }
  };

  /**
   * Turns bike left
   */
  Bike.prototype.turnLeft = function () {
    this.turnBikeAndTrail(this.directionVector.y, -this.directionVector.x);
  };

  /**
   * Turns bike right
   */
  Bike.prototype.turnRight = function () {
    this.turnBikeAndTrail(-this.directionVector.y, this.directionVector.x);
  };

  /**
   * Computes bike data for new direction
   * @param newVectorX Direction vector X
   * @param newVectorY Direction vector Y
   */
  Bike.prototype.turnBikeAndTrail = function (newVectorX, newVectorY) {
    // End current trail
    this.trail.set(
      this.x,
      this.y
    );

    // Start new one
    this.trail.add(
      this.x,
      this.y
    );

    this.directionVector.set(newVectorX, newVectorY);
    this.setRotation(this.directionVector.x * HALF_PI + (Math.abs(this.directionVector.x) + 1 - this.directionVector.y) * HALF_PI);

    // This needs to be done to correct the physics AABB, which doesn't update correctly when
    // bike is rotated against positive axis (-1,0) or (0,-1)
    this.body.setOffset(
      (this.physicsCorrectionOffset * this.directionVector.x - this.physicsCorrectionOffset) * Math.abs(this.directionVector.x),
      (this.physicsCorrectionOffset * this.directionVector.y - this.physicsCorrectionOffset) * Math.abs(this.directionVector.y));

    this.setPosition(
      this.x + this.directionVector.x * this.physicsCorrectionOffset,
      this.y + this.directionVector.y * this.physicsCorrectionOffset
    );
  };

  deathrace.gameobjects.Bike = Bike;
})();