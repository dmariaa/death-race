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
    var LaserShot = function(scene, x, y) {
        deathrace.gameobjects.powerups.PowerUp.call(this, scene, x, y, "powerups.LS");
        this.name = "laser-shot";
    };

    LaserShot.prototype = Object.create(deathrace.gameobjects.powerups.PowerUp.prototype);
    LaserShot.prototype.constructor = LaserShot;


    LaserShot.prototype.launch=function (bike) {
        var cont = 0;
        var x = bike.x;
        var y = bike.y;
       /* var cuchillo =  deathrace.gameobjects.powerups.PowerUp.call(this, bike.scene, x, y, "powerups.Knife");
        if(cont< 3){

        if(x < bike.x){
            while(cuchillo.position.x == bike.scene.wallWidth){
                cuchillo.position.x++;
            }
        }else{
            while(cuchillo.position.x == 0){
                cuchillo.position.x--;
            }
        }
        if(y < bike.y){
            while(cuchillo.position.y == bike.scene.horzLength){
                cuchillo.position.y++;
            }
        }else{
            while(cuchillo.position.y == 0){
                cuchillo.position.y--;
            }
        }

        }*/
    };
    deathrace.gameobjects.powerups.LaserShot = LaserShot;


})();