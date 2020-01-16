import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import mkdirp from 'mkdirp';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// test

// for (let generation = 0; generation < 3; generation++) {
//   for (let board = 0; board < 3; board++) {
//     for (let bot = 0; bot < 3; bot++) {
//       console.log(`Gen: ${generation} || Board: ${board} || Bot: ${bot}`);
//     }
//   }
// }
// app.listen(port, () => console.log(`http://localhost:${port}`));

import { generateBottle } from './bottle';
import { generateBoard, board } from './board';
import Robot from './robot';
import robotSess from './robotSees';
import { randomMove, checkPickUp } from './move';
import { bottleArengment } from '../src/js/bottle';

// generateBoard();
// generateBottle();

// const robot = new Robot();
// robot.createRobotPosition();

// for (let moves = 0; moves < 50; moves++) {
//   console.log(`Move: ${moves + 1}`);
//   robot.move(
//     randomMove(robotSess(bottleAregment, robot.positionX, robot.positionY)),
//     bottleArengment
//   );
//   checkPickUp(
//     bottleAregment,
//     robot.positionX,
//     robot.positionY,
//     robot.bottlePickUp
//   );
// }
const botQuantity = 50;
const boardQuantity = 30;
const moveQuantity = 50;

let stats = {};
for (let bot = 0; bot < botQuantity; bot++) {
  const robot = new Robot();
  let dna = {};

  for (let boardCount = 0; boardCount < boardQuantity; boardCount++) {
    robot.createRobotPosition();
    generateBoard();
    const bottle = generateBottle();
    let bottlePickedUp = 0;

    for (let moves = 0; moves < moveQuantity; moves++) {
      const robotSee = robotSess(bottle, robot.positionX, robot.positionY);
      const move = randomMove(robotSee);
      robot.move(move, bottle);
      if (checkPickUp(bottle, robot.positionX, robot.positionY)) {
        bottlePickedUp++;
      }
      dna[robotSee] = move;
      stats[bot] = bottlePickedUp;
      console.clear();
      console.log(`Bot: ${bot + 1}/${botQuantity}`);
      console.log(`Board: ${boardCount + 1}/${boardQuantity}`);
      console.log(`Move: ${moves + 1}/${moveQuantity}`);
    }
  }
  console.log(dna);
  let dataDna = JSON.stringify(dna);
  mkdirp('dna/gen_1', function(err) {
    try {
      fs.writeFileSync(`dna/gen_1/rob_${bot}.json`, dataDna);
    } catch {
      console.log(`mkdirp: ${err}`);
    }
  });
}
console.log(stats);
let dataStats = JSON.stringify(stats);
mkdirp('dna/gen_1', function(err) {
  try {
    fs.writeFileSync(`dna/gen_1/stats.json`, dataStats);
  } catch {
    console.log(`mkdirp: ${err}`);
  }
});
// }

// let statsFile = [];

// fs.readFile('./dna/gen_1/stats.json', { encoding: 'utf-8' }, function(
//   err,
//   data
// ) {
//   if (!err) {
//     const json = data;
//     const obj = JSON.parse(json);

//     Object.keys(obj).map(function(key) {
//       statsFile.push([Number(key), obj[key]]);
//     });

//     statsFile.sort(function(a, b) {
//       return a[1] - b[1];
//     });
//     const theBestBot = statsFile.slice(Math.max(statsFile.length - 6, 1));

//     console.log(theBestBot);
//   } else {
//     console.log(err);
//   }
// });

// console.log(sortable);
// fs.readFile('./dna/gen_1/rob_1.json', { encoding: 'utf-8' }, function(
//   err,
//   data
// ) {
//   if (!err) {
//     const json = data;
//     const obj = JSON.parse(json);
//     console.log(obj);
//   } else {
//     console.log(err);
//   }
// });
