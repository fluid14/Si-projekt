export const randomMove = robotSeesArray => {
  let moveName = 'stop';
  let moveCount = 1;
  if (moveCount < 50) {
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
  }
  return moveName;
};

export const checkPickUp = (bottleAregment, robotPositionX, robotPositionY) => {
  if (bottleAregment[robotPositionX][robotPositionY] == 1) {
    console.log('Bottle-------------------------------');
    bottleAregment[robotPositionX][robotPositionY] = 0;
    return true;
  }
};
