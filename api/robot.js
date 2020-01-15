import { bottleArengment } from '../src/js/bottle';

class Robot {
  constructor(gen, robot, board) {
    this.positionX = Math.floor(Math.random() * 10);
    this.positionY = Math.floor(Math.random() * 10);
    this.moveArray = [];
    this.moveCount = 0;
    this.bottlePickUp = 0;
  }

  createRobotPosition(positionX = this.positionX, positionY = this.positionY) {
    for (let i = 0; i < 10; i++) {
      this.moveArray[i] = [];
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let x = 0;
        if (i == positionX && j == positionY) {
          x = 2;
        }
        this.moveArray[i][j] = x;
      }
    }
    console.log(
      '------------------------------------------------------------------------------'
    );
    console.log(
      '-------------------------- Robot moved -----------------------------------'
    );
    console.log(
      '------------------------------------------------------------------------------'
    );
    console.log(this.moveArray);
    // this.checkBottle();
    // this.sendPosition();
  }

  move(move, bottleAregment) {
    switch (move) {
      case 'up':
        if (this.positionX - 1 >= 0 && this.moveCount <= 50) {
          this.positionX = this.positionX - 1;
        }
        this.createRobotPosition();
        break;
      case 'down':
        if (this.positionX + 1 <= 9 && this.moveCount <= 50) {
          this.positionX = this.positionX + 1;
        }
        this.createRobotPosition();
        break;
      case 'left':
        if (this.positionY - 1 >= 0 && this.moveCount <= 50) {
          this.positionY = this.positionY - 1;
        }
        this.createRobotPosition();
        break;
      case 'right':
        if (this.positionY + 1 <= 9 && this.moveCount <= 50) {
          this.positionY = this.positionY + 1;
        }
        this.createRobotPosition();
        break;
      // case 'pickUp':
      //   // bottleAregment[this.positionX][this.positionY] = 0;
      //   // this.bottlePickUp++;
      //   // console.log(this.bottlePickUp);
      //   console.log('pick up');
      //   break;
      case 'stop':
        break;
      default:
        console.log('Ups!');
        this.createMoveArray();
        break;
    }
  }
}

export default Robot;
