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

class PowerUp extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.path = [ new Phaser.Math.Vector2(x, y), new Phaser.Math.Vector2(x, y) ];
    this.name = texture;

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
  }
}
