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

(function () {
  var SparkDrink = function (scene, x, y) {
    deathrace.gameobjects.powerups.PowerUp.call(this, scene, x, y, "powerups.SD");
    this.name = "spark-drink";
  };

  SparkDrink.prototype = Object.create(deathrace.gameobjects.powerups.PowerUp.prototype);
  SparkDrink.prototype.constructor = SparkDrink;

  SparkDrink.prototype.launch = function (bike, slot) {
    console.log("Spark Drink Launched");
    var currentSpeed = bike.speed;
    bike.speed = bike.speed * 1.5;

    window.setTimeout(function () {
        bike.speed = currentSpeed;
        this.destroy();
      }.bind(this),
      3000);
  };

  deathrace.gameobjects.powerups.SparkDrink = SparkDrink;
})();


