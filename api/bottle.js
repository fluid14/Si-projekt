// export let bottleAregment = [];

export const generateBottle = () => {
  let bottleAregment = [];
  for (let i = 0; i < 10; i++) {
    bottleAregment[i] = [];
  }
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      bottleAregment[i][j] = 0;
    }
  }

  for (let k = 0; k < 20; k++) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    if (bottleAregment[x][y] == 1) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }
    bottleAregment[x][y] = 1;
  }

  console.log(
    '------------------------------------------------------------------------------'
  );
  console.log(
    '--------------------------Bottle genereted -----------------------------------'
  );
  console.log(
    '------------------------------------------------------------------------------'
  );
  console.log(bottleAregment);
  return bottleAregment;
};
