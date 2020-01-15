import '../style.css';
import Robot from './robot';
import { createBottle, bottleArengment } from './bottle';
import createBoard from './board';

// // for (let i = 0; i < 1; i++) {
// createBottle();

// const robot = new Robot(0);
// robot.changeGeneration();
// robot.createMoveArray();
// robot.changePosition();
// // // }

for (let generation = 0; generation < 2; generation++) {
  document.getElementById('generation').textContent = generation;
  for (let board = 0; board < 3; board++) {
    document.getElementById('boardCount').textContent = board;
    for (let robotCount = 0; robotCount < 3; robotCount++) {
      document.getElementById('robotCount').textContent = robot;
      createBottle();
      createBoard();
      const robot = new Robot(generation, robotCount, board);
      console.log(`Robot: ${robotCount}-----------------------------`);
      robot.changeGeneration();
      robot.createMoveArray();
      robot.changePosition();
    }
  }
}

document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == '38') {
    robot.move('up');
  } else if (e.keyCode == '40') {
    robot.move('down');
  } else if (e.keyCode == '37') {
    robot.move('left');
  } else if (e.keyCode == '39') {
    robot.move('right');
  }
}
