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

import robotSess from './robotSees';

function checkDirectorySync(directory) {
  try {
    fs.writeFileSync(directory, data1);
  } catch (e) {
    fs.mkdirSync(directory);
    fs.writeFileSync(directory, data1);
  }
}

let dna = {};
const randomMove = (robotSeesArray, moveCount, bottleCount) => {
  let moveName = 'stop';
  if (moveCount < 50) {
    if (moveCount <= 1) {
      dna = {};
    }
    const moveRandom = Math.floor(Math.random() * 4);
    console.log(moveRandom);
    if (moveRandom == 0) {
      moveName = 'up';
    } else if (moveRandom == 1) {
      moveName = 'left';
    } else if (moveRandom == 2) {
      moveName = 'right';
    } else if (moveRandom == 3) {
      moveName = 'down';
    } else {
      moveName = 'pickUp';
    }
    dna.bottleCount = bottleCount;
    dna[robotSeesArray] = moveName;
    let data1 = JSON.stringify(dna);
    mkdirp('dna/gen_1/rob_1', function(err) {
      try {
        fs.writeFileSync('dna/gen_1/rob_1/pl_1.json', data1);
      } catch {
        console.log(`mkdirp: ${err}`);
      }
    });
  }
  return moveName;
};

app.post('/data', (req, res) => {
  console.clear();
  const robotPositionX = req.body.robotPositionX;
  const robotPositionY = req.body.robotPositionY;
  const bottleArengment = req.body.bottleArengment;
  const bottleCount = req.body.bottleCount;
  const moveCount = req.body.moveCount;

  console.log(robotPositionX);
  console.log(robotPositionY);
  console.log(bottleArengment);
  console.log(moveCount);
  console.log(bottleCount);

  const moveName = randomMove(
    robotSess(bottleArengment, robotPositionX, robotPositionY),
    moveCount,
    bottleCount
  );

  console.log(moveName);

  res.json(`${moveName}`);
});

app.listen(port, () => console.log(`http://localhost:${port}`));
