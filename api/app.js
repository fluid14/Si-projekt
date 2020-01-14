import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import mkdirp from 'mkdirp';

import { randomMove } from './moves';
import robotSess from './robotSees';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/data', (req, res) => {
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
