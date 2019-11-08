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
    var DrillHorn = function(scene, x, y) {
        deathrace.gameobjects.powerups.PowerUp.call(this, scene, x, y, "powerups.DH");
        this.name = "drill-horn";
    };

    DrillHorn.prototype = Object.create(deathrace.gameobjects.powerups.PowerUp.prototype);
    DrillHorn.prototype.constructor = DrillHorn;


    DrillHorn.prototype.launch=function (bike) {
        //console.log("Drill Horn launched");
        var wallLine = bike.scene.add.line();

       // if(bike.collided){
            console.log("Drill Horn launched");
            bike.ghost = true;
            bike.scene.level.walls.add(wallLine);
            wallLine.setTo(bike.walls.x1, bike.walls.y1, bike.x-bike.sizeX,bike.y-bike.sizeY);
            wallLine.setTo(bike.x+bike.sizeX,bike.y+bike.sizeY,bike.walls.x2, bike.walls.y2);
            bike.ghost = false;
      //  }


    };
    deathrace.gameobjects.powerups.DrillHorn = DrillHorn;


})();