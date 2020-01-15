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
let testArray = [];

for (let boardCount = 0; boardCount < 3; boardCount++) {
  generateBoard();
  const bottle = generateBottle();
  testArray.push(bottle);
  for (let bot = 0; bot < 3; bot++) {
    const robot = new Robot();
    robot.createRobotPosition();
    for (let moves = 0; moves < 50; moves++) {
      console.log(`Move: ${moves + 1}`);
      robot.move(
        randomMove(robotSess(bottle, robot.positionX, robot.positionY)),
        bottle
      );
      checkPickUp(bottle, robot.positionX, robot.positionY, robot.bottlePickUp);
    }
  }
}

console.log(testArray);
