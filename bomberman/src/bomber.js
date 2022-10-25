import { baseSquare, baseSquaresX, baseSquaresY, Bomb, Enemy, GameField, Player } from "./modules/models/index.js";
import { generateBoard } from "./modules/generate.js";
import { movePlayer, moveEnemy, playerCaught } from "./modules/movement.js";
import { countdown, setPausedTrue, setPausedFalse, timeOver } from "./modules/countdown.js";
import { setExplodeWave, bombInSquare, playerHit, pauseBomb, restartBomb } from "./modules/bombardment.js";
import { addSpawnPoints } from "./modules/models/Box.js";

// Generating gamefield
export const gameField = new GameField(baseSquaresX, baseSquaresY);
export const player = new Player(4, 0, -gameField.height * baseSquare);

await generateBoard(gameField, player);

const field = document.querySelector(".field");
export const fieldRect = field.getBoundingClientRect();
export const bomberman = document.querySelector(".bomberman");
const bombermanRect = bomberman.getBoundingClientRect();
addSpawnPoints()

export let gameStart = false;
export let gameEnd = false;
export let gamePause = true;
export const leftLimit = 0;
export const rightLimit = fieldRect.width - bombermanRect.width;
export const topLimit = -fieldRect.height;
export const bottomLimit = -bombermanRect.height;

// State of which arrow keys we are holding down
export let held_directions = [];

export let enemyArray = [];
// export let bombArray = [];
let enemyIdCount = 0;
export let frameCount = 0;
let enemyCount = 0;

export const bombermanImage = new Image()
bombermanImage.src = "../assets/sprites/bomberman.png"
bomberman.style.backgroundImage = `url(${bombermanImage.src})`;
bomberman.style.height = `${baseSquare}px`;
bomberman.style.width = `${baseSquare}px`;
bomberman.style.backgroundPosition = '0px 0px';

export const enemyImage = new Image()
enemyImage.src = "../assets/sprites/zombie3.png"

const addEnemy = () => {
  if (gameField.spawnCount >= gameField.spawnPoints.length) {
    gameField.spawnCount = 0
  }
  if (enemyCount < 10 && !gamePause) {
    let startX
    if (gameField.spawnPoints[gameField.spawnCount] % baseSquaresX === 0) {
      startX = (baseSquaresX - 1) * baseSquare
    } else {
      startX = ((gameField.spawnPoints[gameField.spawnCount] % baseSquaresX) - 1) * baseSquare
    }
    let startY = (Math.floor(gameField.spawnPoints[gameField.spawnCount] / baseSquaresX) - baseSquaresY) * baseSquare
    if (gameField.spawnPoints[gameField.spawnCount] % baseSquaresX === 0) {
      startY = ((gameField.spawnPoints[gameField.spawnCount] / baseSquaresX) - (baseSquaresY + 1)) * baseSquare
    } else {
      startY = (Math.floor(gameField.spawnPoints[gameField.spawnCount] / baseSquaresX) - baseSquaresY) * baseSquare
    }
    let newEnemy = new Enemy(2, startX, startY, "enemy" + enemyIdCount);
    enemyArray.push(newEnemy);
    newEnemy.generateHTMLElement();3
    enemyCount++;
    enemyIdCount++;
    gameField.spawnCount++;
    document.getElementById(newEnemy.id).style.backgroundImage = `url(${enemyImage.src})`;
    document.getElementById(newEnemy.id).style.height = `${baseSquare}px`;
    document.getElementById(newEnemy.id).style.width = `${baseSquare}px`;
    document.getElementById(newEnemy.id).style.backgroundPosition = '0px 0px';
  }
}

export const gameOver = () => {
  gamePause = true
  // alert("GAME OVER, Score: " + player.score)
  // console.log("GAME OVER, Score: " + player.score);
  setPausedTrue();
  countdown();
  player.bombArray.forEach(b => {
    pauseBomb(b)
  })
  document.querySelector(".main-heading").textContent = "GAME OVER!"
  document.querySelector(".container-pause").classList.toggle("container-pause__active")
  if (player.lives < 1) {
    document.getElementById("instr-1").textContent = "You lost all your lives."
  } else {
    document.getElementById("instr-1").textContent = "You ran out of time."
  }
  document.getElementById("instr-2").textContent = "Your final score: " + player.score
  document.getElementById("instr-3").textContent = "Thank You for playing!"
  document.getElementById("instr-4").textContent = 'Press "Enter" to restart the game.'
}

const updateLoop = () => {
  frameCount++;
  if (frameCount % 120 === 0) {
    addEnemy()
  }
  
  if ((player.lives < 1 || timeOver) && !gameEnd) {
    setTimeout(gameOver, 1000)
    gameEnd = true
  }
  
  if (enemyArray.length > 0 && !gamePause) {
    for (let j = 0; j < enemyArray.length; j++) {
      if (enemyArray[j].alive === false) {
        player.score += 100;
        document.getElementById(enemyArray[j].id)?.remove()
        // console.log("removed: ", enemyArray[j].id);
        enemyArray.splice(j, 1)
        enemyCount--
        j--
      } else if (enemyArray[j].alive === true) {
        moveEnemy(enemyArray[j]);
      }
      if (playerCaught(player, enemyArray[j])) {
        playerHit(player)
      }
    }
  }
  
  movePlayer(player);
  document.getElementById("span__score").textContent = player.score;
  document.getElementById("lives").textContent = "Lives: " + player.lives;
}

// these variables are needed for fps throttling
let fps = 60;
let now;
let then = Date.now();
let interval = 1000/fps;
let delta;

//Set up the game loop
const step = () => {
  requestAnimationFrame(step);
  now = Date.now();
  delta = now - then;
  
  // checks if enough time has passed to run next frame
  if (delta > interval) {      
    then = now - (delta % interval);
   
    if (!gamePause) {
      updateLoop();
    }
  }
};

movePlayer(player); // moves player to starting point
step(); // kick off the first step!

export const directions = {
  up: "up",
  down: "down",
  left: "left",
  right: "right"
};

const keys = {
  38: directions.up,
  37: directions.left,
  39: directions.right,
  40: directions.down
};

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  const pauseOverlay = document.querySelector(".container-pause");

  // start game with Enter key
  if ((e.code === "Enter" || e.code === "NumpadEnter") && gamePause) {
    if (gameStart && gamePause) {
      location.reload();
    }
    pauseOverlay.classList.toggle("container-pause__active")
    document.getElementById("instr-1").textContent = 'Press "Enter" to restart the game.'
    document.getElementById("instr-4").textContent = 'Paused'
    gamePause = false;
    gameStart = true;
    countdown();
    step();

  }

  // generate a bomb with Space key
  if (e.code === "Space" && player.activeBombs < player.maxBombs && !gamePause && !bombInSquare(player.idOnCenter, player.bombArray)) {
    player.activeBombs++;
    player.bombId++;
    const bomb = new Bomb(document.getElementById("box" + player.idOnCenter).getBoundingClientRect(), player.bombId);
    bomb.started = new Date().getTime()
    bomb.idOnCenter = player.idOnCenter;
    player.bombArray.push(bomb);
    // console.table(player.bombArray);
    bomb.generateHTMLElement();
    setExplodeWave(bomb, player.bombTimer);
    return;
  }

  // pause game with Esc key
  if (e.code === "Escape" && gameStart && !gameEnd) {
    if (gamePause) {
      pauseOverlay.classList.toggle("container-pause__active")
      gamePause = false;
      setPausedFalse();
      countdown();
      step();
      player.bombArray.forEach(b => {
        restartBomb(b)
        // console.log(b.id, b.started);
        // console.log(b.id, b.elapsed);
      })
    } else if (!gamePause) {
      pauseOverlay.classList.toggle("container-pause__active")
      gamePause = true;
      setPausedTrue();
      countdown();
      player.bombArray.forEach(b => {
        pauseBomb(b)
        // console.log(b.id, b.started);
        // console.log(b.id, b.elapsed);
      })
    }
  }

  // console.log(gamePause);

  let dir = keys[e.which];
  if (dir && held_directions.indexOf(dir) === -1) {
    held_directions.unshift(dir);
  }
});

document.addEventListener("keyup", (e) => {
  let dir = keys[e.which];
  let index = held_directions.indexOf(dir);
  if (index > -1) {
    held_directions.splice(index, 1);
  }
});
