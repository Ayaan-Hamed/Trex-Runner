var trex, trex_running, trex_collided, raptor;
var ground, invisibleGround, groundImage;
var o1, o2, o3, o4, o5, o6;
var score, gameover, restart, goi, ri
var ogrp;
var gs, cgrp, rgrp, bgs;
var deadr;
var jump, cp, die
var x1, x2

function preload() {
  jump = loadSound ("jump.mp3")
  cp = loadSound ("checkPoint.mp3")
  die = loadSound ("die.mp3")
  goi = loadImage ("gameOver.png")
  ri = loadImage ("restart.png")
  trex_running = loadAnimation("trex1.png", "trex2.png", "trex3.png");
  trex_collided = loadImage("trex_collided.png");
  raptor = loadAnimation("Aviraptor_1.png", "Aviraptor_2.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");
  deadr = loadAnimation("Aviraptor_1.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgs = createSprite(width / 2, height / 2, width, height);
  x2 = width 
  x1 = 0
  bgs.visible = false;
  ogrp = new Group();
  cgrp = new Group();
  rgrp = new Group();
  //create a trex sprite
  trex = createSprite(50, height - 40, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("die", trex_collided);
  trex.scale = 0.5;
  // trex.debug = true
  trex.setCollider("circle", 0, 0, 50);
  gs = 0;
  //create a ground sprite
  // ground = createSprite(width / 2 - 100, height - 20, width, 20);
  // ground.addImage("ground", groundImage);
  // ground.x = ground.width / 2;
  // ground.velocityX = -4;
  score = 0

  gameover = createSprite (width / 2, height / 2 -40)
  gameover.addImage (goi)
  restart = createSprite (width / 2, height / 2)
  restart.addImage (ri)
  gameover.scale = 0.7
  restart.scale = 0.5
  gameover.visible = false 
  restart.visible = false


  //creating invisible ground
  invisibleGround = createSprite(width / 2 -100, height - 10, width, 10);
  invisibleGround.visible = false;

  //generate random numbers
  var rand = Math.round(random(1, 100));
  console.log(rand);
}

function draw() {
  //console.time("P1")
  //set background color
  background(180);
  image (groundImage, x1, height - 30, width,)
  image (groundImage, x2, height - 30, width,)
  gameover.depth = trex.depth
  restart.depth = trex.depth
  
  if (gs == 0) {  //playing condition
    x1 -= 3
    x2 -= 3
    if (x1 < - width) {
      x1 = width + x2
    }
    if (x2 < - width) {
      x2 = width + x1
    }
        if (trex.isTouching(ogrp) || trex.isTouching (rgrp)) {
      die.play ()
      gs = 1;
    }
    spawnClouds();
    if ((keyDown("space")||touches.length > 0) && trex.y >= height - 40) {
      trex.velocityY = -12;
      jump.play ()
    }
    if (frameCount %2 == 0) {
      score += 1
      if (frameCount % 100 == 0 && frameCount % 1000 != 0) {
        spawn(); cp.play ()
      }
      if (frameCount % 1000 == 0 ) {
        spawnraptor();
      }
    }

  } else {  //gameover condition
   // ground.velocityX = 0;
    ogrp.setVelocityXEach(0);
    cgrp.setVelocityXEach(0);
    rgrp.setVelocityXEach(0);
    rgrp.overlap(bgs, deadraptor);
    trex.changeAnimation ("die")
    gameover.visible = true
    restart.visible = true
  
    cgrp.setLifetimeEach (-1)
    rgrp.setLifetimeEach (-1)
    ogrp.setLifetimeEach (-1)

    if (mousePressedOver(restart)||touches.length > 0) { //restart condition
      gameover.visible = false
      restart.visible = false 
      cgrp.destroyEach()
      rgrp.destroyEach()
      ogrp.destroyEach()
      trex.changeAnimation ("running")
      gs = 0
      //ground.velocityX = -3
    }
  }

  // jump when the space key is pressed

  //console.warn("warning")
  trex.velocityY = trex.velocityY + 0.6;
  //console.info("information")
  // if (ground.x < 0) {
  //   ground.x = ground.width / 2;
  // }
  //console.error("error")
  //stop trex from falling down
  trex.collide(invisibleGround);

  //Spawn Clouds

  //console.log(trex.y);
  //console.count()

  drawSprites();
  textSize (15)
  text (score, width -50, 30)
  //console.timeEnd("P1")
}

//function to spawn the clouds
function spawnClouds() {
  // write your code here
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width, height / 2, 40, 10);
    cloud.addImage(cloudImage);
    cloud.y = Math.round(random(10, height / 2 + 30));
    cloud.velocityX = -4;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = width / 4 + 10;
    cgrp.add(cloud);
  }
}

function spawn() {
  // write your code here
  //if (frameCount % 100 === 0) {
    var o = createSprite(width, height - 50, 40, 10);
    //o.debug = true
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        o.addImage(o1);
        //o.setCollider ("rectangle", 0, 0, 10, 60)
        break;
      case 2:
        o.addImage(o2);
        o.y = height - 30;
        o.scale = 0.85;
        break;
      case 3:
        o.addImage(o3);
        o.y = height - 30;
        o.scale = 0.65;
        break;
      case 4:
        o.addImage(o4);
        o.scale = 0.75;
        break;
      case 5:
        o.addImage(o5);
        o.y = height - 40;
        o.scale = 0.5;
        break;
      case 6:
        o.addImage(o6);
        o.y = height - 25;
        o.scale = 0.45;
        break;
    }

    o.velocityX = -4;
    o.depth = trex.depth;
    trex.depth = trex.depth + 1;
    o.lifetime = width / 4 + 10;
    ogrp.add(o);
  //}
}
function spawnraptor() {
  // write your code here
 // if (frameCount % 1000 === 0 && frameCount %100 != 0) {
    var cloud = createSprite(width, height / 2, 40, 10);
    cloud.addAnimation("flying", raptor);
    cloud.addAnimation("dead", deadr);
    cloud.scale = 0.5;
    cloud.y = Math.round(random(10, height - 100));
    cloud.velocityX = -4;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = width / 4 + 10;
    rgrp.add(cloud);
  //}
}

function deadraptor(r, b) {
  r.changeAnimation("dead");
}
