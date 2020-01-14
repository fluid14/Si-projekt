class Robot {
  constructor(gen, robot, board, moveCommand) {
    this.positionX = Math.floor(Math.random() * 10);
    this.positionY = Math.floor(Math.random() * 10);
    this.moveArray = [];
    this.moveCount = 0;
    this.bottlePickUp = 0;
    this.gen = gen;
    this.robotCount = robot;
    this.boardCount = board;
    this.moveCommand = moveCommand;
    this.dna = {};
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

  checkBottle() {
    if (bottleArengment[this.positionX][this.positionY] == 1) {
      bottleArengment[this.positionX][this.positionY] = 0;
      this.bottlePickUp++;
      console.log('Pick Up!');
    }
  }

  randomMove(robotSeesArray, moveCount, bottleCount) {
    let moveName = 'stop';
    if (moveCount < 50) {
      if (moveCount <= 1) {
        this.dna = {};
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
      let data1 = JSON.stringify(this.dna);
      mkdirp('dna/gen_1/rob_1', function(err) {
        try {
          fs.writeFileSync('dna/gen_1/rob_1/pl_1.json', data1);
        } catch {
          console.log(`mkdirp: ${err}`);
        }
      });
    }
    return moveName;
  }

  move(move = moveCommand) {
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
      case 'pickUp':
        this.checkBottle();
        break;
      case 'stop':
        for (let generation = 0; generation < 2; generation++) {
          document.getElementById('generation').textContent = generation;
          for (let board = 0; board < 3; board++) {
            document.getElementById('boardCount').textContent = board;
            for (let robot = 0; robot < 3; robot++) {
              document.getElementById('robotCount').textContent = robot;
              createBottle();
              createBoard();
              const robot = new Robot();
              robot.changeGeneration();
              robot.createMoveArray();
              robot.changePosition();
            }
          }
        }
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
