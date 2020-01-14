import mkdirp from 'mkdirp';
import fs from 'fs';

let dna = {};
export const randomMove = (robotSeesArray, moveCount, bottleCount) => {
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
    mkdirp('./dna/gen_1/rob_1', function(err) {
      try {
        fs.writeFileSync('./dna/gen_1/rob_1/pl_1.json', data1);
      } catch {
        console.log(`mkdirp: ${err}`);
      }
    });
  }
  return moveName;
};
