let snakeDirection = { x: 0, y: 0 };
let newGame = document.querySelector(".startGame");
let startGame = document.querySelector("#new-game");
let resetGame = document.querySelector("#reset-game");
const body = document.querySelector(".body");
let gameBox = document.querySelector(".game-box");
let ScoreBox = document.querySelector(".score");
let HiScoreBox = document.querySelector(".Hscore");
let score = 0;
let hiScore = localStorage.getItem("highScore") ? Number(localStorage.getItem("highScore")) : 0;

const eatSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");

let snakeArr = [
    { x: 10, y: 15 }
];
let snakeFood = { x: 10, y: 10 };

newGame.classList.remove("hide");

//Doesn't Reset High Score
startGame.addEventListener("click", () => {
    newGame.classList.add("hide");
    body.classList.remove("hide");
});

//Reset High Score to 0
resetGame.addEventListener("click", () => {
    newGame.classList.add("hide");
    body.classList.remove("hide");

    localStorage.setItem("highScore", 0);
    hiScore = 0;
    HiScoreBox.textContent = `High Score: ${hiScore}`;
});

let speed = 10;
let lastPaintTime = 0;

//Game Function
const gameFun = (currentTime) => {
    window.requestAnimationFrame(gameFun);
    if ((currentTime - lastPaintTime) < (1000 / speed)) return;
    lastPaintTime = currentTime;

    render();
    moveSnake();
    collisionToGameOver();
    collisionWithFood();
    speedIncrease();
}

//Increase Snake Speed
let speedIncrease = () => {
    if (score >= 40) speed = 27;
    else if (score >= 35) speed = 25;
    else if (score >= 30) speed = 22;
    else if (score >= 25) speed = 20;
    else if (score >= 20) speed = 17;
    else if (score >= 15) speed = 15;
    else if (score >= 10) speed = 12;
};

//Render Food & Sanke
let render = () => {
    //display The Snake
    gameBox.innerHTML = "";

    snakeArr.forEach((Element, index) => {
        let snakeParts = document.createElement("div");
        snakeParts.style.gridRowStart = Element.y;
        snakeParts.style.gridColumnStart = Element.x;

        if (index === 0) {
            snakeParts.classList.add("snakeHead");
        }
        else {
            snakeParts.classList.add("snakeBody");
        }
        gameBox.appendChild(snakeParts);
    });
    //Display The Food
    let food = document.createElement("div");
    food.style.gridRowStart = snakeFood.y;
    food.style.gridColumnStart = snakeFood.x;
    food.classList.add("food");
    gameBox.appendChild(food);
}

// Move the Snake
let moveSnake = () => {

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += snakeDirection.x;
    snakeArr[0].y += snakeDirection.y;
}

//Updating and Saving High Score to Local Storage
HiScoreBox.textContent = `High Score: ${hiScore}`;
let UpdateHiScore = () => {
    if (hiScore < score) {
        hiScore = score;
        localStorage.setItem("highScore", hiScore);
        HiScoreBox.textContent = `High Score: ${hiScore}`;
    }
}

//Eat Food
let collisionWithFood = () => {
    if (snakeArr[0].x === snakeFood.x && snakeArr[0].y === snakeFood.y) {
        eatSound.play();
        score++;
        UpdateHiScore();
        snakeArr.push({ ...snakeArr[snakeArr.length - 1] });
        snakeFood = {
            x: Math.floor(Math.random() * (16 - 4)) + 4,
            y: Math.floor(Math.random() * (16 - 4)) + 4
        };
        ScoreBox.textContent = `Score: ${score}`;
    }
}

//Game Over
let collisionToGameOver = () => {
    // Collision with Wall
    if (snakeArr[0].x < 1 || snakeArr[0].x > 18 || snakeArr[0].y < 1 || snakeArr[0].y > 18) {
        endGame();
    }

    // Collision with Body
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
            endGame();
        }
    }
};


//End the Game
let showScore = score;
    setTimeout(() => {
        alert(`Game Over! Your Score: ${showScore}`);
    }, 300);
    
        speed = 10;
        score = 0;
        ScoreBox.textContent = `Score: ${score}`;

        snakeArr = [{ x: 10, y: 15 }];
        snakeDirection = { x: 0, y: 0 };
};


//Change the direction of the Snake
// Function to handle direction change
const changeDirection = (direction) => {
    moveSound.play();
    switch (direction) {
        case "up":
            if (snakeDirection.y === 0) snakeDirection = { x: 0, y: -1 };
            break;
        case "down":
            if (snakeDirection.y === 0) snakeDirection = { x: 0, y: 1 };
            break;
        case "left":
            if (snakeDirection.x === 0) snakeDirection = { x: -1, y: 0 };
            break;
        case "right":
            if (snakeDirection.x === 0) snakeDirection = { x: 1, y: 0 };
            break;
    }
};

// Keyboard event listener
window.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowUp":
            changeDirection("up");
            break;
        case "ArrowDown":
            changeDirection("down");
            break;
        case "ArrowLeft":
            changeDirection("left");
            break;
        case "ArrowRight":
            changeDirection("right");
            break;
    }
});

// Mobile button event listeners
document.getElementById("up-btn").addEventListener("click", () => {
    changeDirection("up");
});

document.getElementById("down-btn").addEventListener("click", () => {
    changeDirection("down");
});

document.getElementById("left-btn").addEventListener("click", () => {
    changeDirection("left");
});

document.getElementById("right-btn").addEventListener("click", () => {
    changeDirection("right");
});

window.requestAnimationFrame(gameFun);
