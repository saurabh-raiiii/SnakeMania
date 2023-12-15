// constants and veriable
let inputDir = { x: 0, y: 0 };
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [
    {x : 13, y : 15}
];
let food = {x : 5, y : 5}
let score = 0;

// Game function
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // bite yourself
    for(let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    // collide with wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
}



function gameEngine(){
    // when snake collides
    if(isCollide(snakeArr)){
        inputDir = {x : 0, y : 0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x : 13, y : 13}];
        score = 0;
        scoreBox.innerHTML = score;
    }

    // updating the snake array and food
    // if we have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){

        // eaten the food
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x, y : snakeArr[0].y + inputDir.y});

        // updating score
        score += 1;

        // rendering score
        scoreBox.innerHTML = score;

        // generating new food
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())};

        // when a food is render on a snake
        for(let i = 1; i< snakeArr.length; i++){
            if(snakeArr[i].x === food.x && snakeArr[i].y === food.y){
                food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())};
            }
        }
        
    }

    // moving the snake
    for(let i= snakeArr.length - 2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // render the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // render the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}


// main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x:0, y:1}
    switch (e.key) {
        case "ArrowUp" :
            // console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown" :
            // console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft" :
            // console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;      

        case "ArrowRight" :
            // console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default :
            break;
    }
})