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

(function() {
  var Level = function(scene) {
    Phaser.GameObjects.GameObject.call(this, scene, "level");

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
      },{
        name: "Level 3",
        walls:[
            { x1: 317, y1: 13, x2: 317, y2: 297 },
            { x1: 317, y1: 547, x2: 317, y2: 890 },
            { x1: 1003, y1: 13, x2: 1003, y2: 297 },
            { x1: 1003, y1: 547, x2: 1003, y2: 890 },

            { x1: 317, y1: 257, x2: 609, y2: 257 },
            { x1: 317, y1: 590, x2: 609, y2: 590 },

            { x1: 721, y1: 257, x2: 1002, y2: 257 },
            { x1: 721, y1: 590, x2: 1002, y2: 590 },

            { x1: 386, y1: 368, x2: 386, y2: 475 },
            { x1: 433, y1: 368, x2: 433, y2: 475 },
            { x1: 386, y1: 368, x2: 433, y2: 368 },
            { x1: 386, y1: 475, x2: 433, y2: 475 },

            { x1: 558, y1: 368, x2: 760, y2: 368 },
            { x1: 558, y1: 475, x2: 760, y2: 475 },
            { x1: 558, y1: 368, x2: 558, y2: 475 },
            { x1: 760, y1: 368, x2: 760, y2: 475 },

           { x1: 889, y1: 368, x2: 935, y2: 368 },
            { x1: 889, y1: 475, x2: 935, y2: 475 },
            { x1: 889, y1: 368, x2: 889, y2: 475 },
            { x1: 935, y1: 368, x2: 935, y2: 475 },
        ]
    }, {
        name: "Level 4",
        walls: [
            { x1: 171, y1: 125, x2: 171, y2: 244 },
            { x1: 171, y1: 125, x2: 528, y2: 125 },

            { x1: 171, y1: 610, x2: 171, y2: 797 },
            { x1: 171, y1: 797, x2: 528, y2: 797 },

            { x1: 771, y1: 125, x2: 1139, y2: 125 },
            { x1: 1139, y1: 125, x2: 1139, y2: 244 },

            { x1: 771, y1: 797, x2: 1139, y2: 797 },
            { x1: 1139, y1: 610, x2: 1139, y2: 797 },



            { x1: 1035, y1: 593, x2: 1035, y2: 400 },
            { x1: 863, y1: 400, x2: 1035, y2: 400 },
            { x1: 983, y1: 593, x2: 1035, y2: 593 },
            { x1: 863, y1: 400, x2: 863, y2: 425 },

            { x1:  302, y1: 593, x2: 302, y2: 400 },
            { x1: 302, y1: 400, x2: 471, y2: 400 },
            { x1: 302, y1: 593, x2: 372, y2: 593 },
            { x1: 471, y1: 400, x2: 471, y2: 425 },


            { x1: 422, y1: 593, x2: 618, y2: 593 },
            { x1: 618, y1: 564, x2: 618, y2: 593 },
            { x1: 618, y1: 471, x2: 618, y2: 502 },
            { x1: 470, y1: 471, x2: 618, y2: 471 },

            { x1: 715, y1: 593, x2: 915, y2: 593 },
            { x1: 715, y1: 564, x2: 715, y2: 593 },
            { x1: 715, y1: 471, x2: 715, y2: 502 },
            { x1: 715, y1: 471, x2: 853, y2: 471 },

        ]
    }, {
        name: "Level 5",
        walls: [
            { x1: 289, y1: 322, x2: 668, y2: 322 },
            { x1: 725, y1: 322, x2: 1093, y2: 322 },
            { x1: 289, y1: 612, x2: 668, y2: 612 },
            { x1: 725, y1: 612, x2: 1093, y2: 612 },

            { x1: 580, y1: 323, x2: 580, y2: 424 },
            { x1: 580, y1: 612, x2: 580, y2: 500 },
            { x1: 843, y1: 500, x2: 843, y2: 612 },
            { x1: 843, y1: 424, x2: 843, y2: 323 },

        ]

    }
    ];
  };

  Level.prototype = Object.create(Phaser.GameObjects.GameObject.prototype);
  Level.prototype.constructor = Level;

  Level.prototype.loadLevel = function(level) {
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
  };

  deathrace.gameobjects.Level = Level;
})();