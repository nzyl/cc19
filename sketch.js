var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var ibGroup, iB;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  spookySound.play();
  spookySound.setVolume(0.2);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();
  ibGroup = new Group();

  ghost = createSprite(300,200);
  ghost.addImage(ghostImg);
  ghost.scale=0.4;
  
  
}

function draw() {
  background(0);
 
    
    if(gameState==="play"){
       if(tower.y > 400){
      tower.y = 300
    }
  if(keyDown("left_arrow")){
    ghost.x-=4;
  }
  if(keyDown("right_arrow")){
    ghost.x+=4;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY+=0.5;
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;

  }
  if(ibGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
    spawnDoors();
    drawSprites();
    }
    if(gameState==="end"){
      fill("yellow");
      textSize(35);
      textFont("cursive");
      text("Game Over", 190, 260);
    }
}

function spawnDoors(){
if(frameCount%240===0){
  door=createSprite(480,-50);
  door.addImage(doorImg);
  door.velocityY=1;
  door.x=Math.round(random(120,480));
  door.lifetime=800;
  doorsGroup.add(door);
  
  climber=createSprite(door.x,15);
  climber.velocityY=1;
  climber.addImage(climberImg);
  climber.lifetime=800;
  climbersGroup.add(climber);

  iB=createSprite(door.x,20,climber.width,2);
  iB.velocityY=1;
  iB.debug=true;
  ibGroup.add(iB);
                 
  ghost.depth=door.depth;
  ghost.depth+=1;
}
}
