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

const botQuantity = 50;
const boardQuantity = 250;
const moveQuantity = 50;

// GENERATE RANDOM MOVE _-------------------
const generateRandomMove = () => {
  let stats = {};
  for (let bot = 0; bot < botQuantity; bot++) {
    let dna = {};
    let bottlePickedUp = 0;
    for (let boardCount = 0; boardCount < boardQuantity; boardCount++) {
      const robot = new Robot();
      robot.createRobotPosition();
      generateBoard();
      const bottle = generateBottle();

      for (let moves = 0; moves < moveQuantity; moves++) {
        const robotSee = robotSess(bottle, robot.positionX, robot.positionY);
        const move = randomMove();
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
};

// ---------------end generate random move ----------------

// Generete 2 generation

const generateNextGen = (gen, iter = 0) => {
  let statsFile = [];

  const data = fs.readFileSync('./dna/gen_1/stats.json', { encoding: 'utf-8' });
  const json = data;
  const obj = JSON.parse(json);

  Object.keys(obj).map(function(key) {
    statsFile.push([Number(key), obj[key]]);
  });
  statsFile.sort(function(a, b) {
    return a[1] - b[1];
  });
  const theBestBot = statsFile.slice(Math.max(statsFile.length - 6, 1));

  // console.log(theBestBot);

  let allDna = [];
  for (let i = 0; i < 6; i++) {
    const bot = theBestBot[i];
    const data = fs.readFileSync(`./dna/gen_1/rob_${bot[0]}.json`, {
      encoding: 'utf-8'
    });
    const json = data;
    const obj = JSON.parse(json);

    allDna.push(obj);
  }

  for (let i = 0; i < 50; i++) {
    let obj = {};
    for (let j = 0; j < 200; j++) {
      const x = Math.floor(Math.random() * 6);
      const y = Math.floor(Math.random() * 6);
      obj = Object.assign({}, obj, allDna[j], allDna[j]);
    }

    let dataDna = JSON.stringify(obj);
    mkdirp('./dna/gen_2', function(err) {
      try {
        fs.writeFileSync(`./dna/gen_${gen + iter}/rob_${i}.json`, dataDna);
      } catch {
        console.log(`mkdirp: ${err}`);
      }
    });
  }
};

// end generate 2 generetion

const learn = gener => {
  const generationQuantity = gener + 2;
  let stats = {};

  for (let gen = 2; gen <= generationQuantity; gen++) {
    for (let bot = 0; bot < botQuantity; bot++) {
      const dnaData = fs.readFileSync(`./dna/gen_${gen}/rob_${bot}.json`, {
        encoding: 'utf-8'
      });
      let dna = JSON.parse(dnaData);
      console.log(dna);
      let bottlePickedUp = 0;

      for (let boardCount = 0; boardCount < boardQuantity; boardCount++) {
        const robot = new Robot();
        robot.createRobotPosition();
        generateBoard();
        const bottle = generateBottle();

        for (let moves = 0; moves < moveQuantity; moves++) {
          const robotSee = robotSess(bottle, robot.positionX, robot.positionY);
          const dataDna = {};
          let robotSeeTrans = [];
          for (let i = 0; i < robotSee.length; i++) {
            robotSeeTrans = robotSeeTrans.concat(robotSee[i]);
          }
          const move = dna[robotSeeTrans];
          robot.move(move, bottle);
          if (checkPickUp(bottle, robot.positionX, robot.positionY)) {
            bottlePickedUp++;
          }
          stats[bot] = bottlePickedUp;
          console.clear();
          console.log(`Bot: ${bot + 1}/${botQuantity}`);
          console.log(`Board: ${boardCount + 1}/${boardQuantity}`);
          console.log(`Move: ${moves + 1}/${moveQuantity} ${move}`);
        }
      }
    }
    console.log(stats);
    let dataStats = JSON.stringify(stats);
    mkdirp(`dna/gen_${gen}`, function(err) {
      try {
        fs.writeFileSync(`dna/gen_${gen}/stats.json`, dataStats);
      } catch {
        console.log(`mkdirp: ${err}`);
      }
    });
    generateNextGen(3, gen);
  }
};

generateRandomMove();
// generateNextGen(2);
// learn(2);
