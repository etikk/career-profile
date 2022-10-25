import { baseSquare, baseSquaresX, baseSquaresY } from "./index.js";
import { gameField } from "../../bomber.js";

export default class Box {
  constructor(breakable, height = baseSquare, width = baseSquare) {
    this.height = `${height}px`;
    this.width = `${width}px`;
    this.breakable = breakable;

    this.className = "box ";
    if (this.breakable >= 65) {
      this.className += "box__hidden";
    } else if (this.breakable >= 50) {
      this.className += "box__unbreakable";
    } else {
      this.className += "box__breakable";
    }
  }

  generateHTMLElement(id, i, j) {
    const div = document.createElement("div");
    div.style.height = this.height;
    div.style.width = this.width;
    div.className = this.className;
    div.id = `box${id}`;
    div.dataset.i = `${i}`;
    div.dataset.j = `${j}`;
    div.dataset.spot = `${id}`;
    document.querySelector(".gamefield").appendChild(div);

    const img = document.createElement("img");
    img.src = "../assets/images/explosion.png"
    img.style.visibility = "hidden";
    img.id = `boom${id}`;
    const block = document.getElementById(`box${id}`);
    block.appendChild(img);
  }
}

export const addSpawnPoints = () => {
  let boxArray = document.getElementsByClassName("box__hidden")  
  for (let i = 0; i < boxArray.length; i++) {
    if (boxArray[i].id !== "box1" &&
    boxArray[i].id !== "box2" &&
    boxArray[i].id !== "box11" &&
    boxArray[i].id !== "box12") {
      if (Math.random() > 0.9 || boxArray[i].id === "box" + (baseSquaresX * baseSquaresY)) {
        if (
          (document.getElementById("box" + (boxArray[i].dataset.spot - 1))?.classList.contains("box__hidden") &&
          boxArray[i].dataset.spot % baseSquaresX !== 1) ||
          (document.getElementById("box" + (boxArray[i].dataset.spot + 1))?.classList.contains("box__hidden") &&
          boxArray[i].dataset.spot % baseSquaresX !== 0) ||
          document.getElementById("box" + (boxArray[i].dataset.spot - baseSquaresX))?.classList.contains("box__hidden") ||
          document.getElementById("box" + (boxArray[i].dataset.spot + baseSquaresX))?.classList.contains("box__hidden")
        ) {
          boxArray[i].classList.add("spawn");
          gameField.spawnPoints.push(boxArray[i].dataset.spot)
        }
      }
    }    
  }
}