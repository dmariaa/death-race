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

(function() {
  var HALF_PI = Math.PI / 2;
  var PI = Math.PI;

  var Bike = function(scene, x, y, texture, color) {
    Phaser.GameObjects.Sprite.call(this, scene, x, y, texture);

    scene.physics.add.existing(this);

    this.speed = 0.35;
    this.name = texture + '-bike';
    this.color = color;
    this.directionVector = new Phaser.Math.Vector2(0, 1);
    this.trail = this.scene.add.trail(this);
    this.active = true;
    this.rotation = 0;

    this.body.syncBounds = true;
    this.setDisplayOrigin(6, 6.5);
    this.physicsCorrectionOffset = 7;
    this.trailOffset = this.physicsCorrectionOffset + 1;

    // Explosion texture
    var rt = scene.textures.createCanvas('bikepiece', 5, 5);
    rt.context.fillStyle = this.color.rgba;
    rt.context.fillRect(0,0,5,5);
    rt.refresh();

    // Explosion particles
    var expl = scene.add.particles('bikepiece');
    this.explosion = expl.createEmitter({
      speed: { min: -800, max: 800 },
      alpha: { start: 1.0, end: 0},
      angle: { min: 0, max: 360},
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
  };

  Bike.prototype = Object.create(Phaser.GameObjects.Sprite.prototype);
  Bike.prototype.constructor = Bike;

  Bike.prototype.explode = function() {
    this.engineSound.stop();
    this.explosionSound.play();
    this.explosion.setPosition(this.x, this.y);
    this.trail.set(this.x, this.y);
    this.explosion.explode();
    this.destroy();
  };

  /**
   * Replaces this bike colors
   * with selected color palette.
   */
  Bike.prototype.setColors = function() {
    var tx = this.texture;
    var img = tx.getSourceImage();

    var ct = this.scene.textures.createCanvas(this.name, img.width, img.height);
    ct.context.drawImage(img, 0, 0);

    var pixelsData = ct.context.getImageData(0, 0, ct.width, ct.height);
    var pixels = pixelsData.data;
    for(var i = 0, length = pixels.length; i < length - 4; i += 4) {
      var r = pixels[i],
          g = pixels[i+1],
          b = pixels[i+2],
          a = pixels[i+3];

      if(r===148 & g===148 & b===148 & a===255) {
        pixels[i] = this.color.red;
        pixels[i+1] = this.color.green;
        pixels[i+2] = this.color.blue;
        pixels[i+3] = this.color.alpha;
      }
    }
    ct.context.putImageData(pixelsData, 0, 0);
    ct.refresh();
    this.setTexture(this.name);
  };

  Bike.prototype.preUpdate = function(time, delta) {
    Phaser.GameObjects.Sprite.prototype.preUpdate.call(this, time, delta);
    this.update(time, delta);
  };

  Bike.prototype.update = function(time, delta) {
    this.setPosition(
      this.x + this.directionVector.x * this.speed * delta,
      this.y + this.directionVector.y * this.speed * delta
    );

    this.trail.set(
      this.x - this.directionVector.x * this.trailOffset,
      this.y - this.directionVector.y * this.trailOffset
    );
  };

  Bike.prototype.toggleBreak = function(breaking) {
    if(breaking) {
      this.speed = 0.15;
      this.engineSound.setDetune(-50);
    } else {
      this.speed = 0.35;
      this.engineSound.setDetune(50);
    }
  };

  Bike.prototype.turnLeft = function() {
    this.turnBikeAndTrail(this.directionVector.y, -this.directionVector.x);
  };

  Bike.prototype.turnRight = function() {
    this.turnBikeAndTrail(-this.directionVector.y, this.directionVector.x);
  };

  Bike.prototype.turnBikeAndTrail = function(newVectorX, newVectorY) {
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