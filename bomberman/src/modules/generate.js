import { Box } from "./models/index.js";

export const generateBoard = async (gameField, player/* , ai */) => {

  gameField.generateHTMLElement();

  for (let i = 1; i <= gameField.height; i++) {
    for (let j = 1; j <= gameField.width; j++) {
      let box;
      if (
        (i === 1 && j === 1) ||
        (i === 1 && j === 2) ||
        (i === 2 && j === 1) ||
        (i === gameField.height && j === gameField.width) ||
        (i === gameField.height && j === gameField.width - 1) ||
        (i === gameField.height - 1 && j === gameField.width)
      ) {
        box = new Box(100);
      } else {
        const random = Math.floor(Math.random() * 101);
        box = new Box(random);
      }
      gameField.boxList.push(box);
      box.generateHTMLElement((((i - 1) * gameField.width) + j), i, j);
    }
  }

  player.generateHTMLElement();
};