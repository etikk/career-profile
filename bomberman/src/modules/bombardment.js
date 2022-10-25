import { baseSquaresX } from "./models/index.js";
import { enemyArray, player } from "../bomber.js";

export const explosion = (square) => {
  
    // this checks if player is hit by bomb
    if (player.idOnCenter == square) {
      playerHit(player);
    }
  
    // this marks enemies that are hit by bomb as not alive (removed in game loop)
    for (let i = 0; i < enemyArray.length; i++) {
      if (enemyArray[i].idOnCenter == square) {
        enemyArray[i].alive = false;
        document.getElementById(enemyArray[i].id).classList.add("dead")
      }
    }

    // this immediately explodes bombs caught in blast wave of previous bombs
    if (player.bombArray.length > 1) {
      for (let j = 1; j < player.bombArray.length; j++) {
        // console.log("bomb.id = ", player.bombArray[j].id, "bomb.idOnCenter = ", player.bombArray[j].idOnCenter, "j = ", j);
        if (player.bombArray[j]?.idOnCenter === square) {
          // console.log("caught in blast: ", j, "of", player.bombArray.length, player.bombArray[j].id);
          clearTimeout(player.bombArray[j].timeOutId)
          setExplodeWave(player.bombArray[j], 0)
        }
      }
    }
    
    // this changes breakable walls to corridors after explosion
    if (document.getElementById("box" + square)?.classList.contains("box__breakable")) {
      document.getElementById("box" + square)?.classList.remove("box__breakable");
      document.getElementById("box" + square)?.classList.add("box__hidden");
    }

    // this creates and removes blast wave animation squares
    document.getElementById("boom" + square).style.visibility = "visible";
    setTimeout(() => {
    document.getElementById("boom" + square).style.visibility = "hidden";
    }, 300);
    // document.getElementById("box" + square)?.classList.add("exploding");
    // setTimeout(() => {
    // document.getElementById("box" + square)?.classList.remove("exploding");
    // }, 300);
};

// takes in a square and an array of bombs, checks if the location of a bomb is in the square
export const bombInSquare = (square, bombArray) => {
  for (let i = 0; i < bombArray.length; i++) {
    if (bombArray[i].idOnCenter === square) {
      return true
    }
  }
}

// this sets timeout to explosion wave function
export const setExplodeWave = (bomb, timer) => {
  // this wrapper function is needed to pass bomb arg into explodeWave without triggering timeout prematurely
  function explodeWaveWrapper() {
      explodeWave(bomb)
  }
  bomb.timeOutId = setTimeout(explodeWaveWrapper, timer);
  // bomb.started = new Date().getTime()
}

// this pauses bomb timeout
export const pauseBomb = (bomb) => {
  clearInterval(bomb.timeOutId)
  bomb.elapsed = new Date().getTime() - bomb.started 
} 

// this pauses bomb timeout
export const restartBomb = (bomb) => {
  setExplodeWave(bomb, player.bombTimer - bomb.elapsed)

} 

// this runs explosion function in the pattern set by player.bombLength
const explodeWave = (bomb) => {
    player.activeBombs--;

    // explodes middle square of pattern
    explosion(bomb.idOnCenter);

    // explodes in up direction
    for (let i = 1; i <= player.bombLength; i++) {
      if (!document.getElementById("box" + (bomb.idOnCenter - baseSquaresX * i))?.classList.contains("box__hidden") &&
      !document.getElementById("box" + (bomb.idOnCenter - baseSquaresX * i))?.classList.contains("box__breakable")) {
        break;
      }
      if (document.getElementById("box" + (bomb.idOnCenter - baseSquaresX * i))?.classList.contains("box__breakable")) {
        explosion(bomb.idOnCenter - baseSquaresX * i);
        break;
      }
      explosion(bomb.idOnCenter - baseSquaresX * i);
    }

    // explodes in left direction
    for (let i = 1; i <= player.bombLength; i++) {
      if ((!document.getElementById("box" + (bomb.idOnCenter - i))?.classList.contains("box__hidden") &&
      !document.getElementById("box" + (bomb.idOnCenter - i))?.classList.contains("box__breakable")) ||
      (bomb.idOnCenter - i) % baseSquaresX == 0) {
        break;
      }
      if (document.getElementById("box" + (bomb.idOnCenter - i))?.classList.contains("box__breakable") ||
      (bomb.idOnCenter - i) % baseSquaresX == 1) {
        explosion(bomb.idOnCenter - i);
        break;
      }
      explosion(bomb.idOnCenter - i);
    }

    // explodes in right direction
    for (let i = 1; i <= player.bombLength; i++) {
      if ((!document.getElementById("box" + (bomb.idOnCenter + i))?.classList.contains("box__hidden") &&
      !document.getElementById("box" + (bomb.idOnCenter + i))?.classList.contains("box__breakable")) ||
      (bomb.idOnCenter + i) % baseSquaresX == 1) {
        break;
      }
      if (document.getElementById("box" + (bomb.idOnCenter + i))?.classList.contains("box__breakable") ||
      (bomb.idOnCenter + i) % baseSquaresX == 0) {
        explosion(bomb.idOnCenter + i);
        break;
      }
      explosion(bomb.idOnCenter + i);
    }

    // explodes in down direction
    for (let i = 1; i <= player.bombLength; i++) {
      if (!document.getElementById("box" + (bomb.idOnCenter + baseSquaresX * i))?.classList.contains("box__hidden") &&
      !document.getElementById("box" + (bomb.idOnCenter + baseSquaresX * i))?.classList.contains("box__breakable")) {
        break;
      }
      if (document.getElementById("box" + (bomb.idOnCenter + baseSquaresX * i))?.classList.contains("box__breakable")) {
        explosion(bomb.idOnCenter + baseSquaresX * i);
        break;
      }
      explosion(bomb.idOnCenter + baseSquaresX * i);
    }

    // removes exploded bomb from player bomb array
    for (let i = 0; i < player.bombArray.length; i++) {
      if (player.bombArray[i].id === bomb.id) {
        player.bombArray.splice(i, 1)
      }
    }
    
    // removes bomb div from DOM
    bomb?.removeHTMLElement();

}

export const playerHit = (player) => {
  let onOff = true
  let playerDiv = document.getElementsByClassName(player.className)[0]
  
  if (player.invulnerable === false) {
    player.invulnerable = true;
    player.lives--;
  
    let blinker = setInterval(() => {
      if (onOff) {
        playerDiv.style.opacity = "0"
        onOff = false
      } else if (!onOff) {
        playerDiv.style.opacity = "1"
        onOff = true
      }
    }, 200);
  
    function clear() {
      clearInterval(blinker)
      playerDiv.style.opacity = "1"
    }
    
    setTimeout(() => {
      clear();
      player.invulnerable = false;
    }, 1200); 
  }
}