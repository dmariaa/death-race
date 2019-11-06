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
deathrace.gameobjects.powerups = deathrace.gameobjects.powerups || {};

(function() {
  /**
   * Powerup base class
   * @param scene
   * @param x
   * @param y
   * @param texture
   * @constructor
   */
  var PowerUp = function(scene, x, y, sprite) {
    sprite = sprite || "powerups.unknown";
    Phaser.GameObjects.Sprite.call(this, scene, x, y, sprite);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(0.5, 0.5);
    this.path = [ new Phaser.Math.Vector2(x, y), new Phaser.Math.Vector2(x, y) ];
    this.name = "unknown-powerup";

    this.Types = Object.freeze({
      SPARK_DRINK: 0,
      GUMMY_BOMB: 1,
      MIRROR_SHIELD: 2,
      STRINGS_PUPPET: 3,
      SHARP_KNIFE: 4,
      POISON_OF_WISDOM: 5,
      LASER_SHOT: 6,
      COMMANDED_MISSILE: 7
    });
  };

  PowerUp.prototype = Object.create(Phaser.GameObjects.Sprite.prototype);
  PowerUp.prototype.constructor = PowerUp;

  deathrace.gameobjects.powerups.PowerUp = PowerUp;

  /**
   * PowerUpTypes enumeration.
   * Contains All powerUp Types indexed by name.
   * It's a final class.
   * @type {Readonly<{SHARP_KNIFE: number, LASER_SHOT: number, POISON_OF_WISDOM: number, COMMANDED_MISSILE: number, SPARK_DRINK: number, STRINGS_PUPPET: number, randomType: (function(): *), MIRROR_SHIELD: number, GUMMY_BOMB: number, nameFromValue: (function(*): (string | undefined))}>}
   */
  var PowerUpTypes = Object.freeze({
    SPARK_DRINK: 0,
    GUMMY_BOMB: 1,
    MIRROR_SHIELD: 2,
    STRINGS_PUPPET: 3,
    SHARP_KNIFE: 4,
    POISON_OF_WISDOM: 5,
    LASER_SHOT: 6,
    COMMANDED_MISSILE: 7,

    randomType: function() {
      return Math.trunc(Math.random() * 8);
    },

    nameFromValue: function(value) {
      return Object.keys(this)[value] || undefined;
    }
  });

  deathrace.gameobjects.powerups.Types = PowerUpTypes;

  var PowerUpFactory = function(scene, x, y, powerUpType) {
    switch(powerUpType) {
      case deathrace.gameobjects.powerups.Types.SPARK_DRINK:
        return new deathrace.gameobjects.powerups.SparkDrink(scene, x, y);
        break;
      case deathrace.gameobjects.powerups.Types.GUMMY_BOMB:
        console.error("Gummy Bomb Powerup not implemented");
        break;
      case deathrace.gameobjects.powerups.Types.MIRROR_SHIELD:
        console.error("Mirror Shield Powerup not implemented");
        break;
      case deathrace.gameobjects.powerups.Types.STRINGS_PUPPET:
        console.error("String Puppet Powerup not implemented");
        break;
      case deathrace.gameobjects.powerups.Types.SHARP_KNIFE:
        console.error("Sharp Knife Powerup not implemented");
        break;
      case deathrace.gameobjects.powerups.Types.POISON_OF_WISDOM:
        console.error("Poison of Wisdom Powerup not implemented");
        break;
      case deathrace.gameobjects.powerups.Types.LASER_SHOT:
        console.error("Laser Shot Powerup not implemented");
        break;
      case deathrace.gameobjects.powerups.Types.COMMANDED_MISSILE:
        console.error("Commanded Missile Powerup not implemented");
        break;
      default:
        throw new Error("PowerUp type does not exist");
    }

    return new PowerUp(scene, x, y);
  };

  deathrace.gameobjects.powerups.PowerUpFactory = PowerUpFactory;
})();
