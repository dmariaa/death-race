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
deathrace.gameobjects.powerups = deathrace.gameobjects.powerups || {};

(function() {
    var StringsPuppet = function(scene, x, y) {
        deathrace.gameobjects.powerups.PowerUp.call(this, scene, x, y, "powerups.SP");
        this.name = "strings-puppet";
    };

    StringsPuppet.prototype = Object.create(deathrace.gameobjects.powerups.PowerUp.prototype);
    StringsPuppet.prototype.constructor = StringsPuppet;


    StringsPuppet.prototype.launch = function (bike) {
        var direction = Math.trunc(Math.random()*2+1);
        bike.inRadius();

        if(bike.puppet){
            if(direction===1){
                bike.setRotation(bike.directionVector.x * -1);
            }else{
                bike.setRotation(bike.directionVector.y * -1);
            }
        }

        this.destroy();
    };
    deathrace.gameobjects.powerups.StringsPuppet = StringsPuppet;


})();
