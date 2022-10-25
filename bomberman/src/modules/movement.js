import { baseSquare, baseSquaresX, baseSquaresY } from "./models/index.js";
import { frameCount, held_directions, directions, bomberman, bombermanImage, leftLimit, rightLimit,
        topLimit, bottomLimit } from "../bomber.js";
// import { countdown, setPausedTrue } from "./countdown.js";

const randomDirection = () => {
  let a = Math.random();
  if (a < 0.25) return "right";
  if (a < 0.5) return "left";
  if (a < 0.75) return "up";
  if (a >= 0.75) return "down";
};

// sets rules for character/wall collisions
export const wallCollision = (character) => {
    // checks if previous movement blocks are no longer needed
    if (
      character?.idOnLeftTop === character?.idOnRightTop &&
      character?.idOnLeftTop === character?.idOnLeftBottom &&
      character?.idOnLeftTop === character?.idOnRightBottom
    ){
      if (!document.getElementById("box" + (character?.idOnLeftTop + 1))?.classList.contains("box__unbreakable") &&
      !document.getElementById("box" + (character?.idOnLeftTop + 1))?.classList.contains("box__breakable")) {
        character.rightBlock = false;
      }
      if (!document.getElementById("box" + (character?.idOnLeftTop - 1))?.classList.contains("box__unbreakable") &&
      !document.getElementById("box" + (character?.idOnLeftTop - 1))?.classList.contains("box__breakable")) {
        character.leftBlock = false;
      }
      if (!document.getElementById("box" + (character?.idOnLeftTop + 10))?.classList.contains("box__unbreakable") &&
      !document.getElementById("box" + (character?.idOnLeftTop + 10))?.classList.contains("box__breakable")) {
        character.downBlock = false;
      }
      if (!document.getElementById("box" + (character?.idOnLeftTop - 10))?.classList.contains("box__unbreakable") &&
      !document.getElementById("box" + (character?.idOnLeftTop - 10))?.classList.contains("box__breakable")) {
        character.upBlock = false;
      }
    }
    
    // checks if any corner-pairs of player character div are next to wall div, applies movement block if true
    if (character?.idOnLeftTop === character?.idOnRightTop) {
      if (document.getElementById("box" + (character?.idOnLeftTop + 1))?.classList.contains("box__unbreakable") ||
      document.getElementById("box" + (character?.idOnLeftTop + 1))?.classList.contains("box__breakable")) {
        character.rightBlock = true;
      }
      if (document.getElementById("box" + (character?.idOnLeftTop - 1))?.classList.contains("box__unbreakable") ||
      document.getElementById("box" + (character?.idOnLeftTop - 1))?.classList.contains("box__breakable")) {
        character.leftBlock = true;
      }
    }
    if (character?.idOnLeftBottom === character?.idOnRightBottom) {
      if (document.getElementById("box" + (character?.idOnLeftBottom + 1))?.classList.contains("box__unbreakable") ||
      document.getElementById("box" + (character?.idOnLeftBottom + 1))?.classList.contains("box__breakable")) {
        character.rightBlock = true;
      }
      if (document.getElementById("box" + (character?.idOnLeftBottom - 1))?.classList.contains("box__unbreakable") ||
      document.getElementById("box" + (character?.idOnLeftBottom - 1))?.classList.contains("box__breakable")) {
        character.leftBlock = true;
      }
    }
    if (character?.idOnLeftTop === character?.idOnLeftBottom) {
      if (document.getElementById("box" + (character?.idOnLeftTop + 10))?.classList.contains("box__unbreakable") ||
      document.getElementById("box" + (character?.idOnLeftTop + 10))?.classList.contains("box__breakable")) {
        character.downBlock = true;
      }
      if (document.getElementById("box" + (character?.idOnLeftTop - 10))?.classList.contains("box__unbreakable") ||
      document.getElementById("box" + (character?.idOnLeftTop - 10))?.classList.contains("box__breakable")) {
        character.upBlock = true;
      }
    }
    if (character?.idOnRightTop === character?.idOnRightBottom) {
      if (document.getElementById("box" + (character?.idOnRightTop + 10))?.classList.contains("box__unbreakable") ||
      document.getElementById("box" + (character?.idOnRightTop + 10))?.classList.contains("box__breakable")) {
        character.downBlock = true;
      }
      if (document.getElementById("box" + (character?.idOnRightTop - 10))?.classList.contains("box__unbreakable") ||
      document.getElementById("box" + (character?.idOnRightTop - 10))?.classList.contains("box__breakable")) {
        character.upBlock = true;
      }
    }
};

// checks in which div the corners of a game character are situated
export const setDivCorners = (character) => {
    character.idOnLeftTop = ((((1 + Math.floor((character.y - topLimit) / baseSquare)) - 1) * baseSquaresX) + (1 + (Math.floor((character.x - leftLimit) / baseSquare))));
    character.idOnLeftBottom = ((((Math.ceil((character.y - topLimit + character.height) / baseSquare)) - 1) * baseSquaresX) + (1 + (Math.floor((character.x - leftLimit) / baseSquare))));
    character.idOnRightTop = ((((1 + Math.floor((character.y - topLimit) / baseSquare)) - 1) * baseSquaresX) + ((Math.ceil((character.x - leftLimit + character.width) / baseSquare))));
    character.idOnRightBottom = ((((Math.ceil((character.y - topLimit + character.height) / baseSquare)) - 1) * baseSquaresX) + ((Math.ceil((character.x - leftLimit + character.width) / baseSquare))));
  
    character.idOnCenter = ((((Math.ceil((character.y - topLimit + (character.height/2)) / baseSquare)) - 1) * baseSquaresX) + ((Math.ceil((character.x - leftLimit + (character.width/2)) / baseSquare))))
  
    character.centerX = character.x + (character.width/2)
    character.centerY = character.y + (character.height/2)
}

let playerEnemyDistance = baseSquare*2
let distX
let distY

export const playerCaught = (player, ai) => {

  distX = player?.centerX - ai?.centerX
  distY = player?.centerY - ai?.centerY
  playerEnemyDistance = Math.sqrt(distX*distX + distY*distY);

  if (playerEnemyDistance < (player?.width/3 + ai?.width/3)) {
    return true
  }
}

// if moving div hits wall div, movement in that direction is blocked
// any new movement in another direction removes the block
export const movePlayer = (player) => {

  // straight movement on first keypress
  if (held_directions[0]) {
    setDivCorners(player);

    if (held_directions[0] === directions.right) {
      wallCollision(player);
      animate("180px", bomberman, frameCount, player)
      if (!player.rightBlock) {
        player.x += player.speed;
        player.leftBlock = false;
        player.downBlock = false;
        player.upBlock = false;
      }
    }
    if (held_directions[0] === directions.left) {
      wallCollision(player);
      animate("60px", bomberman, frameCount, player)
      if (!player.leftBlock) {
        player.x -= player.speed;
        player.rightBlock = false;
        player.downBlock = false;
        player.upBlock = false;
      }
    }
    if (held_directions[0] === directions.down) {
      wallCollision(player);
      animate("120px", bomberman, frameCount, player)
      if (!player.downBlock) {
        player.y += player.speed;
        player.rightBlock = false;
        player.leftBlock = false;
        player.upBlock = false;
      }
    }
    if (held_directions[0] === directions.up) {
      wallCollision(player);
      animate("0px", bomberman, frameCount, player)
      if (!player.upBlock) {
        player.y -= player.speed;
        player.rightBlock = false;
        player.leftBlock = false;
        player.downBlock = false;
      }
    }
  }

  // diagonal movement if second keypress is true
  if (held_directions[1]) {
    setDivCorners(player);
    if (held_directions[1] === directions.right) {
      wallCollision(player);
      if (!player.rightBlock) {
        player.x += player.speed;
        player.leftBlock = false;
        player.downBlock = false;
        player.upBlock = false;
      }
    }
    if (held_directions[1] === directions.left) {
      wallCollision(player);
      if (!player.leftBlock) {
        player.x -= player.speed;
        player.rightBlock = false;
        player.downBlock = false;
        player.upBlock = false;
      }
    }
    if (held_directions[1] === directions.down) {
      wallCollision(player);
      if (!player.downBlock) {
        player.y += player.speed;
        player.rightBlock = false;
        player.leftBlock = false;
        player.upBlock = false;
      }
    }
    if (held_directions[1] === directions.up) {
      wallCollision(player);
      if (!player.upBlock) {
        player.y -= player.speed;
        player.rightBlock = false;
        player.leftBlock = false;
        player.downBlock = false;
      }
    }
  }

  // limits movement to inside the field
  if (player.x < leftLimit) {
    player.x = leftLimit;
  }
  if (player.x > rightLimit) {
    player.x = rightLimit;
  }
  if (player.y < topLimit) {
    player.y = topLimit;
  }
  if (player.y > bottomLimit) {
    player.y = bottomLimit;
  }

  // this row moves the player character around the screen
  bomberman.style.transform = `translate3d(${player.x}px, ${player.y}px, 0)`;

};

// this moves the enemy randomly around
export const moveEnemy = (ai) => {
  if (document.getElementById(ai.id).style.visibility === "hidden") {
    document.getElementById(ai.id).style.visibility = "visible"
  }
  
  setDivCorners(ai);
  // console.log(ai.idOnCenter);
  // adds random direction chance to empty cross-corridor junction
  if ((ai.idOnLeftTop === ai.idOnRightTop &&
      ai.idOnLeftTop === ai.idOnLeftBottom &&
      ai.idOnLeftTop === ai.idOnRightBottom) &&
    (!ai.leftBlock && !ai.rightBlock && !ai.downBlock && !ai.upBlock)) {
    if (Math.random() > 0.85) { // this controls chance of random direction change without collision
      ai.enemyDirection = randomDirection();
    }
  }

  // straight movement until wall, then random new direction
  if (ai.enemyDirection === "right") {
    wallCollision(ai);
    animate("120px", document.getElementById(ai.id), frameCount, ai)
    if (!ai.rightBlock) {
      ai.x += ai.speed;
      ai.leftBlock = false;
      ai.downBlock = false;
      ai.upBlock = false;
    } else {
      ai.enemyDirection = randomDirection();
    }
  }
  if (ai.enemyDirection === "left") {
    wallCollision(ai);
    animate("180px", document.getElementById(ai.id), frameCount, ai)
    if (!ai.leftBlock) {
      ai.x -= ai.speed;
      ai.rightBlock = false;
      ai.downBlock = false;
      ai.upBlock = false;
    } else {
      ai.enemyDirection = randomDirection();
    }
  }
  if (ai.enemyDirection === "down") {
    wallCollision(ai);
    animate("0px", document.getElementById(ai.id), frameCount, ai)
    if (!ai.downBlock) {
      ai.y += ai.speed;
      ai.rightBlock = false;
      ai.leftBlock = false;
      ai.upBlock = false;
    } else {
      ai.enemyDirection = randomDirection();
    }
  }
  if (ai.enemyDirection === "up") {
    wallCollision(ai);
    animate("60px", document.getElementById(ai.id), frameCount, ai)
    if (!ai.upBlock) {
      ai.y -= ai.speed;
      ai.rightBlock = false;
      ai.leftBlock = false;
      ai.downBlock = false;
    } else {
      ai.enemyDirection = randomDirection();
    }
  }

  // limits movement to inside the field
  if (ai.x < leftLimit) {
    ai.x = leftLimit;
    ai.enemyDirection = randomDirection();
  }
  if (ai.x > rightLimit) {
    ai.x = rightLimit;
    ai.enemyDirection = randomDirection();
  }
  if (ai.y < topLimit) {
    ai.y = topLimit;
    ai.enemyDirection = randomDirection();
  }
  if (ai.y > bottomLimit) {
    ai.y = bottomLimit;
    ai.enemyDirection = randomDirection();
  }

  // this row moves the enemy character around the screen
  if (typeof (document.getElementById(ai.id)) !== "null") {
    document.getElementById(ai.id).style.transform = `translate3d(${ai.x}px, ${ai.y}px, 0)`;
  }
};

const animate = (posY, div, frameCount, character) => {
  if (frameCount % 5 === 0) {
    div.style.backgroundPosition = character.spritePos * baseSquare + "px " + posY;
    character.spritePos++
    if (character.spritePos === character.spriteLength) {
      character.spritePos = 0
    }
  }
}