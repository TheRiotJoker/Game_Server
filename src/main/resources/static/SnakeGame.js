const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

canvas.width = document.getElementById("contentDiv").clientWidth;
canvas.height = document.getElementById("contentDiv").clientHeight;
let highScore = 0;
let score = 0;
let mySnake = new Snake();
let apple;
let key = "d";
window.addEventListener('keypress', (event) => {
    if(event.key === "a" || event.key ==="w" || event.key === "d" || event.key === "s") {
        key = event.key;
    }
})
function init() {
    generateApple();
    setInterval(gameLoop, 75);
}
function gameLoop() {
    cleanCanvas();
    mySnake.changeDirection(key);
    console.log(apple.color);
    context.fillStyle= apple.color;
    context.fillRect(apple.position.x,apple.position.y,mySnake.dims,mySnake.dims);
    context.fillStyle = "#6bd2f5"
    context.fillRect(mySnake.x, mySnake.y, mySnake.dims, mySnake.dims);
    context.fillStyle = "#fafeff"
    for(let i = 0; i < mySnake.tailLength; i++) {
        context.fillRect(mySnake.tail[i].x,mySnake.tail[i].y,mySnake.dims,mySnake.dims);
    }
    mySnake.increment();
    if(mySnake.x === apple.position.x && mySnake.y === apple.position.y) {
        score = score+apple.score;
        clearInterval(apple.interval);
        generateApple();
        mySnake.increaseTail();
        document.getElementById("score_number").textContent = score;
    }
    if(mySnake.x >= canvas.width) {
        mySnake.x = 0;
    }
    if(mySnake.y >= canvas.height) {
        mySnake.y = 0;
    }
    if(mySnake.x < 0) {
        mySnake.x = closestValue(canvas.width);
    }

    if(mySnake.y < 0) {
        mySnake.y = closestValue(canvas.height);
    }
    for(let i = 1; i < mySnake.tailLength; i++) {
        if(mySnake.x === mySnake.tail[i].x && mySnake.y === mySnake.tail[i].y) {

            reset();
        }
    }
}
function closestValue(ofValue) {
    let bottomValue = ofValue - (ofValue % mySnake.dims);
    let topValue = (ofValue + mySnake.dims) - (ofValue % mySnake.dims);
    //find closest value
    if(Math.abs(ofValue - bottomValue) < Math.abs(ofValue-topValue)) {
        return bottomValue;
    }
    return topValue;
}
function reset() {
    if(score > highScore) {
        highScore = score;
        document.getElementById("highscore_number").textContent = highScore;
    }
    score = 0;
    document.getElementById("score_number").textContent = "0";
    mySnake = new Snake();
    key = 'd';
    generateApple();
}
function cleanCanvas() {
    context.fillStyle="#000000"
    context.fillRect(0,0,canvas.width, canvas.height);

}
function generateApple() {
    let randomWidth;
    let randomHeight;
    let allowedToSpawn;
    do {
        allowedToSpawn = true;
        let width = (canvas.width-mySnake.dims)/mySnake.dims;
        let height = (canvas.height-mySnake.dims)/mySnake.dims;
        randomWidth = Math.floor(Math.random()*width)*mySnake.dims;
        randomHeight = Math.floor(Math.random()*height)*mySnake.dims;
        for(let i = 0; i < mySnake.tailLength; i++) {
            if(mySnake.tail[i].x === randomWidth && mySnake.tail[i].y === randomHeight) {
                allowedToSpawn = false;
            }
        }
        if(mySnake.x === randomWidth || mySnake.y === randomHeight) {
            allowedToSpawn = false;
        }
    }while(!allowedToSpawn)
    apple = new Apple(randomWidth, randomHeight);
}

function showSubmitScoreDialog() {
    document.getElementById("overlayWindow").style.display= 'flex';
    document.getElementById("finalHighscore").textContent=highScore;
    document.getElementById("finalHighscoreInput").value = highScore;
}
function removeOverlay(event) {
    let div = document.getElementById("overlayWindow");
    if(event.target === div) {
        document.getElementById("overlayWindow").style.display='none';
    }
}
$('#submitScoreForm').submit(function(event) {
    event.preventDefault();
    const form = $(this);
    const submitScoreUrl = "submitScore";
    $.ajax({
        type: 'POST',
        url: submitScoreUrl,
        data: form.serialize(),
        success: function (response) {
            console.log("Success!");
            $('#highscore_displaytext').text("Successfully added highscore!");
        },
        error: function (xhr, status, error) {
            console.log(error);
            $('#highscore_displaytext').text(xhr.responseText);

        }

    })
})
function submitScore() {
    $("#finalHighscore").fadeOut(500);


}