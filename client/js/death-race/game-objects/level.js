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

class Level extends Phaser.GameObjects.GameObject {
  constructor(scene) {
    super(scene, "level");

    this.walls = [];

    this.levels = [
      {
        name: "Level 1",
        walls: [
          { x1: 298, y1: 269, x2: 298, y2: 631 },
          { x1:1098, y1: 269, x2:1098, y2: 631 },
          { x1: 298, y1: 449, x2:1098, y2: 449 },

          { x1: 549, y1: 240, x2: 851, y2: 240 },
          { x1: 549, y1: 658, x2: 851, y2: 658 },
          { x1: 698, y1: 240, x2: 698, y2: 658 },
        ]
      },
      {
        name: "Level 2",
        walls: [
          { x1: 320, y1: 220, x2: 520, y2: 220 },
          { x1: 320, y1: 220, x2: 320, y2: 320 },

          { x1: 320, y1: 680, x2: 520, y2: 680 },
          { x1: 320, y1: 580, x2: 320, y2: 680 },

          { x1: 880, y1: 220, x2:1080, y2: 220},
          { x1:1080, y1: 220, x2:1080, y2: 320},

          { x1: 880, y1: 680, x2:1080, y2: 680},
          { x1:1080, y1: 580, x2:1080, y2: 680},

          { x1: 450, y1: 420, x2: 530, y2: 420 },
          { x1: 450, y1: 420, x2: 450, y2: 480 },
          { x1: 450, y1: 480, x2: 530, y2: 480 },

          { x1: 870, y1: 420, x2: 950, y2: 420 },
          { x1: 950, y1: 420, x2: 950, y2: 480 },
          { x1: 870, y1: 480, x2: 950, y2: 480 },

          { x1: 590, y1: 420, x2: 650, y2: 420 },
          { x1: 650, y1: 340, x2: 650, y2: 420 },
          { x1: 650, y1: 340, x2: 750, y2: 340 },
          { x1: 750, y1: 340, x2: 750, y2: 420 },
          { x1: 750, y1: 420, x2: 810, y2: 420 },

          { x1: 590, y1: 480, x2: 650, y2: 480 },
          { x1: 650, y1: 480, x2: 650, y2: 560 },
          { x1: 650, y1: 560, x2: 750, y2: 560 },
          { x1: 750, y1: 480, x2: 750, y2: 560 },
          { x1: 750, y1: 480, x2: 810, y2: 480 }
        ]
      }
    ];
  }

  loadLevel(level) {
    this.walls.length = 0;

    var level = this.levels[level];

    for(var i=0; i < level.walls.length; ++i) {
      var wall = level.walls[i];

      var wallLine = this.scene.add.line();
      this.scene.physics.add.existing(wallLine);
      wallLine.setOrigin(0, 0);
      wallLine.setStrokeStyle(1, 0x00ff00);
      wallLine.setLineWidth(1);
      wallLine.setTo(wall.x1, wall.y1, wall.x2, wall.y2);
      wallLine.body.setOffset(wall.x1, wall.y1);
      wallLine.body.setSize(wall.x2 - wall.x1, wall.y2 - wall.y1, false);
      this.walls.push(wallLine);
    }
  }
}