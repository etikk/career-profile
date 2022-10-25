import { baseSquare, baseSquaresX } from "./index.js";

export default class Player {
  constructor(speed = 4, x = 0, y = 0) {
    this.height = baseSquare;
    this.width = baseSquare;
    this.className = "bomberman";
    this.speed = speed;
    this.bombLength = 2;
    this.bombTimer = 3000;
    this.activeBombs = 0;
    this.maxBombs = 3;
    this.bombId = 0;
    this.bombArray = [];
    this.x = x;
    this.y = y;
    this.centerX = this.x + (this.width/2)
    this.centerY = this.y + (this.height/2)
    this.rightBlock = false;
    this.leftBlock = false;
    this.downBlock = false;
    this.upBlock = false;
    this.idOnLeftTop = 0;
    this.idOnLeftBottom = 0;
    this.idOnRightTop = 0;
    this.idOnRightBottom = 0;
    this.idOnCenter = 1;
    this.lives = 3;
    this.invulnerable = false;
    this.score = 0;
    this.spritePos = 0;
    this.spriteLength = 7;
  }

  generateHTMLElement() {
    const div = document.createElement("div");
    div.style.height = `${this.height}px`;
    div.style.width = `${this.width}px`;
    div.className = this.className;
    document.querySelector(".field").appendChild(div);
  }
}