export let board = [];

export const generateBoard = () => {
  for (let i = 0; i < 10; i++) {
    board[i] = [];
  }
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      board[i][j] = 0;
    }
  }

  //   console.log(
  //     '------------------------------------------------------------------------------'
  //   );
  //   console.log(
  //     '--------------------------Board genereted -----------------------------------'
  //   );
  //   console.log(
  //     '------------------------------------------------------------------------------'
  //   );
  //   console.log(board);
};
