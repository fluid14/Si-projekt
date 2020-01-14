export const bottleArengment = [];

export const createBottle = () => {
  for (let i = 0; i < 10; i++) {
    bottleArengment[i] = [];
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let x = 0;
      bottleArengment[i][j] = x;
    }
  }
  for (let k = 0; k < 20; k++) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    if (bottleArengment[x][y] == 1) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }
    bottleArengment[x][y] = 1;
    console.log(`${x}, ${y}`);
  }
  console.log(bottleArengment);
};
