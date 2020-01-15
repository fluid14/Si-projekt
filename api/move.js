import fs from 'fs';
import mkdirp from 'mkdirp';

let dna = {};
export const randomMove = robotSeesArray => {
  let moveName = 'stop';
  let moveCount = 1;
  if (moveCount < 50) {
    if (moveCount <= 1) {
      dna = {};
    }
    const moveRandom = Math.floor(Math.random() * 4);
    if (moveRandom == 0) {
      moveName = 'up';
    } else if (moveRandom == 1) {
      moveName = 'left';
    } else if (moveRandom == 2) {
      moveName = 'right';
    } else if (moveRandom == 3) {
      moveName = 'down';
    } else {
      moveName = 'Ups move random';
    }

    console.log(moveName);

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

export const checkPickUp = (
  bottleAregment,
  robotPositionX,
  robotPositionY,
  bottleCount
) => {
  if (bottleAregment[robotPositionX][robotPositionY] == 1) {
    console.log('Bottle-------------------------------');
    bottleAregment[robotPositionX][robotPositionY] = 0;
    bottleCount += 1;
    console.log(`Bottle count: ${bottleCount}`);
  }
};
