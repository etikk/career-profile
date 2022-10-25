import { baseSquare } from "./index.js";

export default class Bomb {
  constructor(elPlayerRect, id) {
    this.height = baseSquare;
    this.width = baseSquare;
    this.xCoord = elPlayerRect.x;
    this.yCoord = elPlayerRect.y;
    this.className = "bomb";
    this.id = `bomb${id}`;
    this.idOnCenter = 0;
    this.timeOutId = undefined;
    this.started = undefined;
    this.elapsed = 0;
  }

  generateHTMLElement = () => {
    const div = document.createElement("div");
    div.style.height = `${this.height}px`;
    div.style.width = `${this.width}px`;
    div.style.left = `${this.xCoord}px`;
    div.style.top = `${this.yCoord}px`;
    div.className = this.className;
    div.id = this.id;
    document.querySelector(".field").appendChild(div);
  }

  removeHTMLElement = () => {
    document.getElementById(this.id)?.remove();
  }
}