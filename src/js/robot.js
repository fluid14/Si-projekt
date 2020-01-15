import createBoard from './board';
import { bottleArengment, createBottle } from './bottle';

class Robot {
  constructor(gen, robot, board) {
    this.positionX = Math.floor(Math.random() * 10);
    this.positionY = Math.floor(Math.random() * 10);
    this.moveArray = [];
    this.moveCount = 0;
    this.bottlePickUp = 0;
    this.gen = gen;
    this.robotCount = robot;
    this.boardCount = board;
  }

  changeGeneration() {
    document.getElementById('generation').textContent = this.gen;
  }

  createMoveArray(positionX = this.positionX, positionY = this.positionY) {
    // setTimeout(() => {
    createBoard();
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
    this.checkBottle();
    this.sendPosition();
    // }, 100);
    // console.log(this.moveArray);
  }

  changePosition(rowIndex = this.positionX, boxIndex = this.positionY) {
    const container = document.getElementById('container');
    const rows = container.querySelectorAll('.row');
    const row = rows[rowIndex];
    const boxes = row.querySelectorAll('.box');
    const box = boxes[boxIndex];
    box.id = 'robot';
    this.moveCount++;
    document.querySelector('#moves').textContent = this.moveCount - 1;
  }

  checkBottle() {
    if (bottleArengment[this.positionX][this.positionY] == 1) {
      bottleArengment[this.positionX][this.positionY] = 0;
      this.bottlePickUp++;
      console.log('Pick Up!');
      document.querySelector('#bottlePickUp').textContent = this.bottlePickUp;
    }
  }

  async sendPosition(moveArray = this.moveArray) {
    const ob = {
      robotPositionX: this.positionX,
      robotPositionY: this.positionY,
      bottleArengment: bottleArengment,
      moveCount: this.moveCount,
      bottleCount: this.bottlePickUp,
      robotNumber: this.robotCount
    };

    await fetch('http://localhost:3000/data', {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(ob)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.move(res);
      })
      .catch(error => console.log('Error: ', error));
  }

  move(move) {
    switch (move) {
      case 'up':
        if (this.positionX - 1 >= 0 && this.moveCount <= 50) {
          this.positionX = this.positionX - 1;
        }
        this.createMoveArray();
        this.changePosition();
        break;
      case 'down':
        if (this.positionX + 1 <= 9 && this.moveCount <= 50) {
          this.positionX = this.positionX + 1;
        }
        this.createMoveArray();
        this.changePosition();
        break;
      case 'left':
        if (this.positionY - 1 >= 0 && this.moveCount <= 50) {
          this.positionY = this.positionY - 1;
        }
        this.createMoveArray();
        this.changePosition();
        break;
      case 'right':
        if (this.positionY + 1 <= 9 && this.moveCount <= 50) {
          this.positionY = this.positionY + 1;
        }
        this.createMoveArray();
        this.changePosition();
        break;
      // case 'pickUp':
      //   this.checkBottle();
      //   break;
      case 'stop':
        break;
      default:
        console.log('Ups!');
        this.createMoveArray();
        this.changePosition();
        break;
    }
  }
}

export default Robot;
