import { useState, useEffect } from "react";

const width = 9;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
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

  console.log(currentColorArrangement);

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            style={{ backgroundColor: candyColor }}
            alt={candyColor}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
