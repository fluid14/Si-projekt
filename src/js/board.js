import { createBottle, bottleArengment } from './bottle';

const createBoard = () => {
  const container = document.getElementById('container');
  container.innerHTML = '';

  for (let i = 0; i < 10; i++) {
    const board = document.createElement('div');
    board.classList.add('row');
    for (let j = 0; j < 10; j++) {
      const box = document.createElement('div');
      box.classList.add('box');
      board.appendChild(box);

      if (bottleArengment[i][j] == 1) {
        box.id = 'bottle';
        box.classList.add('bottle');
      }
    }
    container.appendChild(board);
  }
};

export default createBoard;
