import { baseSquare } from "./index.js";

export default class GameField {
  // Constructor takes height and width values measured in boxes
  constructor(height = 10, width = 10) {
    this.height = height;
    this.width = width;
    this.boxList = [];
    this.spawnPoints = [];
    this.spawnCount = 100;
    this.className = "flex gamefield";
  }

  generateHTMLElement() {
    const div = document.createElement("div");
    div.style.height = `${this.height * baseSquare}px`;
    div.style.width = `${this.width * baseSquare}px`;
    div.className = this.className;

    const container = document.createElement("div");
    container.className = "container-stats";

    const lives = document.createElement("div");
    lives.id = "lives";
    lives.textContent = "Lives left: ";
    const spanLives = document.createElement("span");
    spanLives.id = "span__lives";
    spanLives.textContent = "3"
    lives.appendChild(spanLives);

    const score = document.createElement("div");
    score.id = "score";
    score.textContent = "Score: ";
    const spanScore = document.createElement("span");
    spanScore.id = "span__score";
    spanScore.textContent = "0"
    score.appendChild(spanScore);

    const timer = document.createElement("div");
    timer.id = "timer";
    timer.textContent = "Time left: ";
    const spanTimer = document.createElement("span");
    spanTimer.id = "span__timer";
    spanTimer.textContent = "2:00"
    timer.appendChild(spanTimer);

    container.append(lives, score, timer);
    div.appendChild(container);

    document.querySelector(".field").appendChild(div);
  }
}