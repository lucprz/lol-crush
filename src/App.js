import { useState, useEffect } from "react";
import Scoreboard from "./components/Scoreboard.jsx";
import dragon from "./images/dragon.png";
import elephant from "./images/elephant.png";
import fenix from "./images/fenix.png";
import hawk from "./images/hawk.png";
import pig from "./images/pig.png";
import shark from "./images/shark.png";
import blank from "./images/blank.png";

const width = 8;
const candyColors = [dragon, elephant, fenix, hawk, pig, shark];

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];

      const decidedColor = currentColorArrangement[i];

      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangement[i] = candyColors[randomNumber];
      }

      if (currentColorArrangement[i + width] === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  };

  console.log("scoreDisplay: ", scoreDisplay);

  const dragblankt = (event) => {
    console.log("Drag blankt");
    setSquareBeingDragged(event.target);
  };

  const dragDrop = (event) => {
    console.log("Drag drop");
    console.log(event.target);
    setSquareBeingReplaced(event.target);
  };

  const dragEnd = () => {
    console.log("Drag end");
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );

    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );

    currentColorArrangement[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");

    currentColorArrangement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");

    console.log("squareBeingDraggedId:", squareBeingDraggedId);
    console.log("squareBeingReplacedId:", squareBeingReplacedId);

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();

    if (
      squareBeingReplacedId &&
      validMove &&
      (isARowOfThree || isARowOfFour || isAColumnOfThree || isAColumnOfFour)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute("src");

      currentColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");

      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomNumberFrom0to5 = Math.floor(
        Math.random() * candyColors.length
      );
      const randomColor = candyColors[randomNumberFrom0to5];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
    // console.log(randomColorArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 200);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);

  // console.log(currentColorArrangement);

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragblankt}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <Scoreboard score={scoreDisplay} />
    </div>
  );
};

export default App;
