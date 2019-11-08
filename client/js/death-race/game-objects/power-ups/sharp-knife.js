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
    var SharpKnife = function(scene, x, y) {
        deathrace.gameobjects.powerups.PowerUp.call(this, scene, x, y, "powerups.SF");
        this.name = "sharp-knife";
    };

    SharpKnife.prototype = Object.create(deathrace.gameobjects.powerups.PowerUp.prototype);
    SharpKnife.prototype.constructor = SharpKnife;



    SharpKnife.prototype.launch=function (bike) {
        //falta poner que si se choca con otro, lo mate. No avanza.
        var x = bike.x;
        var y = bike.y;

        //cuchillo.setRotate(bike);

        //
        // bike.scene.add.knife(bike.x,bike.y,'knife');

        /*
        if(x < bike.getPosX()){
            console.log(this);
                this.setPosition(
                    cuchillo.position.x + bike.directionVector.x * bike.speed
                );

        }else if((x > bike.getPosX())){
            console.log(this);
                this.setPosition(
                    cuchillo.position.x - bike.directionVector.x * bike.speed
                );

        }
        if(y < bike.getPosY()){
            console.log(this);

                this.setPosition(
                    cuchillo.position.y + bike.directionVector.y * bike.speed
                );

        }else if(y > bike.getPosY()){
            console.log(this);

                this.setPosition(
                    cuchillo.position.y - bike.directionVector.y * bike.speed);


        }*/
    };
    deathrace.gameobjects.powerups.SharpKnife = SharpKnife;

})();