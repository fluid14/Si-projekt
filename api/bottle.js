let boardArrayTest = [];

const generateBottle = () => {
  for (let i = 0; i < 10; i++) {
    boardArrayTest[i] = [];
  }
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      boardArrayTest[i][j] = 0;
    }
  }
  console.log('Bottle genereted --------------------------------');
  console.log(boardArrayTest);
};
