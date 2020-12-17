PLAY=1;
END=2;
game=PLAY
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var sscore=0;
var ground,back,backimage;
function preload(){
  backimage=loadImage("back.png");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  back=createSprite(300,200,400,400);
  back.addImage(backimage);
  monkey=createSprite(50,340,20,20);
  ground=createSprite(100,380,200,20);
  ground.visible=false;
  monkey.addAnimation("s",monkey_running);
  monkey.scale=0.1;
  back.scale=2.2;
  back.width=400;
  obstaclesGroup=createGroup();
  FoodGroup=createGroup();
}


function draw() {
  background("white");
 
  if(game===PLAY)
 {
  back.velocityX=-5;
  if(back.x<80)
    {
      back.x=back.width/2;
    } 
   
  monkey.velocityY=5;
  monkey.collide(ground)
  if(keyDown("space")&&monkey.y>200)
     {
        monkey.y=monkey.y-20;
     }
   obst();
   fruit();
   if(obstaclesGroup.isTouching(monkey))
     {
       game=END;
       obstaclesGroup.setLifetimeEach(-1)
       FoodGroup.setLifetimeEach(-1)
        obstaclesGroup.setVelocityXEach(0)
       FoodGroup.setVelocityXEach(0);
       back.velocityX=0;
       score=0;
       sscore=0;
        monkey.velocityY=0;
     
     }
    if(FoodGroup.isTouching(monkey))
     {
       score=score+1;
       FoodGroup.destroyEach();
     }
   sscore=Math.ceil(frameCount/frameRate());
 }

  drawSprites();
 if(game===END){
  if(keyDown("space"))
    {
      game=PLAY;
          obstaclesGroup.setLifetimeEach(0);
       FoodGroup.setLifetimeEach(0);
        
       
    }
  stroke("white");
   
   fill("white");textSize(30);
  text("game is over",100,200);
   
}
  stroke("white");
   
   fill("white");
  textSize(20-3);
  text("time:"+sscore,340,40);
  text("score:"+score,330,60);
}
function obst(){
  if(frameCount%100===0)
    {
      obstacle=createSprite(400,340,20,20)
obstacle.velocityX=-3;
      obstacle.lifetime=150;
      obstacle.addImage(obstacleImage);
      obstacle.scale=0.2;
      obstaclesGroup.add(obstacle)
     
      obstacle.setCollider("circle",0,0,140);
    }
  
}
function fruit()
{if(frameCount%100===0)
    {
        banana=createSprite(400,random(180,240),20,20)
        banana.velocityX=-3;
    banana.lifetime=120;
      banana.addImage(bananaImage);
      banana.scale=0.1;
      FoodGroup.add(banana)
    }
}




