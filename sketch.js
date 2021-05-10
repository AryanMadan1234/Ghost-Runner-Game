var backgroundImage , tower ;
var ghost , ghostImage ;
var door , doorImage , doorsGroup ;
var climber , climberImage , climbersGroup;
var invisibleBlock , invisibleBlockGroup;
var gameState = "play"

function preload(){
  
 backgroundImage = loadImage ("tower.png")
  ghostImage = loadImage("ghost-standing.png")
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
  spookySound = loadSound("spooky.wav");
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}


function setup(){
  createCanvas (600,600);
  
  spookySound.loop();
  
  tower = createSprite (300,300);
  tower.addImage(backgroundImage)
 tower.scale = 1
  tower.velocityY = 2
  
ghost = createSprite (300,500);
  ghost.addImage(ghostImage)
              ghost.scale = 0.3
}
function draw(){
  background (0);
  
  if(gameState==="play"){
    
if (tower.y > 400){
  tower.y = 300
}
  
  if (keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3
  }
  
  if(keyDown("space")){
    ghost.velocityY = -8;    
  }
  
  ghost.velocityY = ghost.velocityY + 0.8 
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
    
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "end"
  }
    
  
  spawnDoors();
  drawSprites()
  }
  
  
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over" , 230,250)
  }
  
  
}

function spawnDoors(){
  
  if(frameCount % 240 === 0){
    var door = createSprite(200,-50);
    door.addImage (doorImage);
    
    var climber = createSprite(200,10)
    climber.addImage(climberImage);
    
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height =2;
    
    
    door.x = Math.round(random(120,400))
    door.velocityY = 1
    
    climber.x = door.x;
    climber.velocityY = 1;
    
    invisibleBlock.x = door.x
    invisibleBlock.velocityY = 1;
    
    
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    
    
    ghost.depth = door.depth ;
    ghost.depth +=1
    
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock)
    
    
    invisibleBlock.debug = true;
    
  }
}