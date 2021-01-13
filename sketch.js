var PLAY = 1;
var END = 0;
var gameState = PLAY;


var mario, mario_running, mario_collided;
var ground, invisibleGround, groundImage;

var bricksGroup, brickImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;



function preload(){
  bg=loadImage("bg.png")
  mario_running =   loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
  mario_collided = loadAnimation("collided.png");
  
  groundImage = loadImage("ground2.png");
  
  brickImage = loadImage("brick.png");
  
  obstacleimage = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 350);
mario=createSprite(50,290,20,50)
  mario.addAnimation("running", mario_running)
  mario.addAnimation("collided",mario_collided)
  mario.scale=2
  
  ground=createSprite(200,330,400,20)
 ground.addImage("ground",groundImage)
  invisibleGround=createSprite(200,300,400,10)
  invisibleGround.visible=false
  
 brickGroup=new Group()
  obstacleGroup=new Group()
  gameOver = createSprite(300,100); gameOver.addImage(gameOverImg);
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  gameOver.visible = false;
  restart.visible = false;

  
  
  
}

function draw() {
 //trex.debug = true;
  
  background(bg);
  textSize(19)
  text("score:"+score,480,30)
  if(gameState===PLAY){
    ground.velocityX =-6
  if (ground.x < 0){
      ground.x = ground.width/2;
    
    }      
  if(keyDown("space")&& mario.y>=257){
    mario.velocityY=-10  
  } 
     mario.velocityY=mario.velocityY+0.5 
    spawnBrick()
spawnObstacles()
    for(var i=0;i<brickGroup.length;i++){
      if(brickGroup.get(i).isTouching(mario)){ brickGroup.get(i).remove()
score =score+1;
      }
    }
  if (obstacleGroup.isTouching(mario)){
    gameState=END
  }
  }
  else if(gameState===END){
    ground.velocityX=0
    mario.velocityY=0
     gameOver.visible = true;
  restart.visible = true;
    mario.changeAnimation("collided",mario_collided)
    obstacleGroup.setVelocityXEach(0)
    brickGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
    brickGroup.setLifetimeEach(-1)
    if(mousePressedOver(restart)) {
      reset(); 
    }
  }
  mario.collide(invisibleGround)
  
 
  
  
  drawSprites();
}
function spawnObstacles() {
  if(frameCount % 70  === 0) {
    obstacle=createSprite(600 ,270,20,20) 
  obstacle.addAnimation("obstacle",obstacleimage)
  obstacle.scale=1
    obstacle.velocityX = - (6 );
   obstacleGroup.add(obstacle) 
    
    
    //assign scale and lifetime to the obstacle           
    
    obstacle.lifetime = 200;
    //add each obstacle to the group
    //ObstaclesGroup.add(obstacle);
  }
}  
function spawnBrick() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var brick = createSprite(600 ,200   ,40,10);
 
   brick.addAnimation("brick",brickImage);
    brick.scale = 1;
    brick.velocityX = -3;
    brickGroup.add(brick)
     //assign lifetime to the variable
    brick.lifetime = 200 ;
    
    //adjust the depth
   brick.depth = mario.depth;
    mario.depth = mario.depth + 1;
    
    //add each cloud to the group
   //   CloudsGroup.add(cloud);
  }
  
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstacleGroup.destroyEach();
  brickGroup.destroyEach(); mario.changeAnimation("running",mario_running);
  score = 0; 
}