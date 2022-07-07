var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//loading images

var bird = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var bg = new Image();
var fg = new Image();

bird.src = "images/bird.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";


//loading audio
var fly = new Audio();
var scor = new Audio();
fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";


//game
//game variables
//gap: gap between the pipes 
var gap = 85;
//var constant = pipeNorth.height + gap;
var gravity = .5;
var bX = 10;
var bY = 150;
var scroll_speed = 10;
var score = 0;

//audio
var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

//gameplay
//function for keypress
document.addEventListener("keydown", moveUp)
function moveUp(){
    bY -= 25;
    fly.play();
}
//pipes
var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}
//drawing images
onload = draw;
function draw() {
    ctx.drawImage(bg, 0, 0);
    //ctx.drawImage(fg, 0, 0);
    for(var i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, 0 + pipe[i].y + pipeNorth.height + gap);
        pipe[i].x = pipe[i].x - .5;
        if(pipe[i].x == cvs.width/2){
            pipe.push({
                x: cvs.width, 
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            })
        }

        //detect collision
        if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width 
            && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + pipe[i].y + pipeNorth.height + gap)
            || bY + bird.height >= cvs.height - fg.height){
                location.reload();
            }
        if(pipe[i].x == 5){
            score +=1;
            scor.play();
        }
    }
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, bX, bY);
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);
    bY += gravity;

    requestAnimationFrame(draw)
}
draw();
