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
        this.cont = 3;
    };

    DrillHorn.prototype = Object.create(deathrace.gameobjects.powerups.PowerUp.prototype);
    DrillHorn.prototype.constructor = DrillHorn;


    DrillHorn.prototype.launch=function (bike) {
      if(this.cont==3) {
        bike.on('break-wall', function() {
          this.cont--;
          console.log("Wall broken call, counter {0}".format(this.cont));

          if(this.cont==0) {
            bike.horn = false;
            this.destroy();
          }
        }, this);
      }

      bike.horn = true;
    };

    deathrace.gameobjects.powerups.DrillHorn = DrillHorn;


})();