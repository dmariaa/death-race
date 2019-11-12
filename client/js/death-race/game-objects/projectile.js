/*
 * Copyright 2019 NITROPC
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
deathrace.gameobjects.projectile = deathrace.gameobjects.projectile || {};


var HALF_PI = Math.PI / 2;
var PI = Math.PI;

(function(){

    var Projectile = function (scene, x, y, directionVector, texture) {
        Phaser.GameObjects.Sprite.call(this, scene, x, y, texture);
        this.rotation;
        this.directionVector = directionVector;
        this.speed = 0.5;
        this.setRotation(this.directionVector.x * HALF_PI + (Math.abs(this.directionVector.x) + 1 - this.directionVector.y) * HALF_PI);
    };
    Projectile.prototype = Object.create(Phaser.GameObjects.Sprite.prototype);
    Projectile.prototype.constructor = Projectile;

    Projectile.prototype.preUpdate = function(time, delta) {
        Phaser.GameObjects.Sprite.prototype.preUpdate.call(this, time, delta);
        this.update(time, delta);
    };

    Projectile.prototype.update = function(time, delta) {
        this.setPosition(this.x + this.directionVector.x * this.speed * delta,
            this.y + this.directionVector.y * this.speed * delta);
        console.log("anda");
        if(this.x < this.scene.margin || this.y < this.scene.margin || this.x > this.scene.horzLength || this.y > this.scene.vertLength){
            this.destroy();
        }
    };

    deathrace.gameobjects.projectile.Projectile = Projectile;

})();