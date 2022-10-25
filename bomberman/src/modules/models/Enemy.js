import { baseSquare } from "./index.js";
// import { enemyId } from "../../bomber.js";

export default class Enemy {
  constructor(speed = 4, x = 0, y = 0, id = "0") {
    this.height = baseSquare;
    this.width = baseSquare;
    this.className = "enemy";
    this.id = id;
    this.visible = "hidden";
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.centerX = this.x + (this.width/2)
    this.centerY = this.y + (this.height/2)
    this.rightBlock = true;
    this.leftBlock = false;
    this.downBlock = false;
    this.upBlock = false;
    this.idOnLeftTop = 0;
    this.idOnLeftBottom = 0;
    this.idOnRightTop = 0;
    this.idOnRightBottom = 0;
    this.idOnCenter = 0;
    this.enemyDirection = "left";
    this.alive = true;
    this.spritePos = 0;
    this.spriteLength = 3;
  }

  generateHTMLElement() {
    const div = document.createElement("div");
    div.style.height = `${this.height}px`;
    div.style.width = `${this.width}px`;
    div.className = this.className;
    div.id = this.id;
    // div.textContent = this.id;
    div.style.visibility = this.visible;
    document.querySelector(".field").appendChild(div);
  }
}