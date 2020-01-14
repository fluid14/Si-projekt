import '../style.css';
import Robot from './robot';
import { createBottle, bottleArengment } from './bottle';

for (let i = 0; i < 1; i++) {
  createBottle();

  const robot = new Robot(i);

  robot.createMoveArray();
  robot.changePosition();
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
