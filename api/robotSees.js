const robotSess = (bottleArengment, positionX, positionY) => {
  const robotSeesArray = [
    [
      positionX - 1 < 0 || positionY - 1 < 0
        ? -1
        : bottleArengment[positionX - 1][positionY - 1],
      positionX - 1 < 0 ? -1 : bottleArengment[positionX - 1][positionY],
      positionX - 1 < 0 || positionY + 1 > 9
        ? -1
        : bottleArengment[positionX - 1][positionY + 1]
    ],
    [
      positionY - 1 < 0 ? -1 : bottleArengment[positionX][positionY - 1],
      bottleArengment[positionX][positionY],
      positionY + 1 > 9 ? -1 : bottleArengment[positionX][positionY + 1]
    ],
    [
      positionX + 1 > 9 || positionY - 1 < 0
        ? -1
        : bottleArengment[positionX + 1][positionY - 1],
      positionX + 1 > 9 ? -1 : bottleArengment[positionX + 1][positionY],
      positionX + 1 > 9 || positionY + 1 > 9
        ? -1
        : bottleArengment[positionX + 1][positionY + 1]
    ]
  ];
  console.log(bottleArengment);
  console.log(robotSeesArray);
  return robotSeesArray;
};

export default robotSess;
