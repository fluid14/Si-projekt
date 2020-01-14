const robotSess = (bottleArengment, positionX, positionY) => {
  const robotSeesArray = [
    [
      bottleArengment[positionX - 1 >= 0 ? positionX - 1 : 0][
        positionY - 1 >= 0 ? positionX - 1 : 0
      ],
      bottleArengment[positionX - 1 >= 0 ? positionX - 1 : 0][positionY],
      bottleArengment[positionX - 1 >= 0 ? positionX - 1 : 0][
        positionY + 1 <= 9 ? positionX + 1 : 9
      ]
    ],
    [
      bottleArengment[positionX][positionY - 1 >= 0 ? positionX - 1 : 0],
      bottleArengment[positionX][positionY],
      bottleArengment[positionX][positionY + 1 <= 9 ? positionX + 1 : 9]
    ],
    [
      bottleArengment[positionX + 1 <= 9 ? positionX + 1 : 9][
        positionY - 1 >= 0 ? positionX - 1 : 0
      ],
      bottleArengment[positionX + 1 <= 9 ? positionX + 1 : 9][positionY],
      bottleArengment[positionX + 1 <= 9 ? positionX + 1 : 9][
        positionY + 1 <= 9 ? positionX + 1 : 9
      ]
    ]
  ];

  console.log(robotSeesArray);
  return robotSeesArray;
};

export default robotSess;
