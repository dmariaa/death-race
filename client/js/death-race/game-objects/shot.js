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
    var Shot = function (scene, x, y, directionVector) {
        deathrace.gameobjects.projectile.Projectile.call(this, scene, x, y, directionVector, "shot");
    };

    Shot.prototype = Object.create(deathrace.gameobjects.projectile.Projectile.prototype);
    Shot.prototype.constructor = Shot;

    deathrace.gameobjects.projectile.Shot = Shot;
})();