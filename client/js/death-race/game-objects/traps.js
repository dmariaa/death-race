/*
 * Copyright 2019 Dilan
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
    var Trap = function (scene, x, y, texture){
        texture = texture || 'trap';
        Phaser.GameObjects.Sprite.call(this, scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(1.0, 1.0);
        this.path = [ new Phaser.Math.Vector2(x, y), new Phaser.Math.Vector2(x, y) ];
        this.name = "trap";
    };
    Trap.prototype = Object.create (Phaser.GameObjects.Sprite.prototype);
    Trap.prototype.constructor = Trap;


    deathrace.gameobjects.Trap = Trap;

})();