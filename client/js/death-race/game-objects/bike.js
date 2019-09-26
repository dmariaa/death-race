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

class Bike extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, color) {
    super(scene, x, y, 10, 10, color);
  }
}

class BikePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
    pluginManager.registerGameObject('bike', this.createBike);
  }
  createBike(x, y, color) {
    return this.displayList.add(new Bike(this.scene, x, y, color));
  }
}