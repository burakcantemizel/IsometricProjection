let testMap = 
[
  [2,1,1,1,1,1,1,1,1,1,1,1],
  [2,2,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,1,1,1,1,1,1,2,1,1],
  [1,2,2,2,1,1,1,1,1,2,1,1],
  [1,2,1,2,2,1,1,1,2,2,1,1],
  [1,2,1,1,2,2,1,2,2,2,1,1],
  [1,2,1,1,1,2,2,1,1,1,1,1],
  [1,2,1,1,1,1,2,2,1,1,1,1],
  [1,2,1,2,2,2,1,2,2,1,1,1],
  [1,2,1,2,1,2,1,1,2,2,1,1],
  [1,2,1,2,1,2,1,1,1,2,2,1],
  [1,2,2,2,1,2,1,1,1,1,2,2]
];

let testMapCols = 12;
let testMapRows = 12;
let tileSize2D = 32;

let tileSizeIsometric = 64;
let tileFloorW;
let tileFloor2;

let offset2DMap;
let offsetIsometricMap;

let carUp;
let carDown;
let carLeft;
let carRight;
let carDirection = 0;

let carPosition2D;

function setup() {
  createCanvas(windowWidth, windowHeight);
  tileFloorW = loadImage("data/landscapeTiles_067.png");
  tileFloor2 = loadImage("data/landscapeTiles_059.png");
  carUp = loadImage("data/Ambulance/ambulance_NE.png");
  carDown = loadImage("data/Ambulance/ambulance_SW.png");
  carLeft = loadImage("data/Ambulance/ambulance_Nw.png");
  carRight = loadImage("data/Ambulance/ambulance_SE.png");
  offset2DMap = createVector(100, 100);
  offsetIsometricMap = createVector(1000, 100);
  //offset2DMap = createVector(0, 0);
  //offsetIsometricMap = createVector(0, 0)
  carPosition2D = createVector(16, 16);
}

function draw() {
  background(150,30,130);

  drawTileMap2D();

  drawTileMapIsometric();

  drawMousePoints();

  carMove();
  drawCar();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function isometricToCartesian(isometricPoint){
  let cartesianPoint = createVector(0,0);
  cartesianPoint.x = (2 * isometricPoint.y + isometricPoint.x) / 2;
  cartesianPoint.y = (2 * isometricPoint.y - isometricPoint.x) / 2;
  return cartesianPoint;  
}

function cartesianToIsometric(cartesianPoint){
  let isometricPoint = createVector(0,0);
  isometricPoint.x = cartesianPoint.x - cartesianPoint.y;
  isometricPoint.y = (cartesianPoint.x + cartesianPoint.y) / 2;
  return isometricPoint;
}


function drawTileMap2D(){
  push();
  
  strokeWeight(0.5);
  stroke(255);
  translate(offset2DMap.x, offset2DMap.y);

    for(let i = 0; i < testMapCols; i++){
      for(let j = 0; j < testMapRows; j++){
        if(testMap[i][j] == 1){
          fill(0,190,0);
        }else if(testMap[i][j] == 2){
          fill(0,100,0);
        }
        rect(i * tileSize2D, j * tileSize2D, tileSize2D, tileSize2D);
      }
    }

  pop();
}

function drawTileMapIsometric(){
  push();
  fill(255,0,0);
  translate(-tileSize2D,0);
  translate(offsetIsometricMap.x, offsetIsometricMap.y);

    for(let i = 0; i < testMapCols; i++){
      for(let j = 0; j < testMapRows; j++){
        let cartesianCoordinate = createVector(i * tileSizeIsometric , j * tileSizeIsometric);
        let isometricCoordinate = cartesianToIsometric(cartesianCoordinate);
        push();
        scale(0.5);
        if(testMap[i][j] == 1){
          image(tileFloorW, isometricCoordinate.x, isometricCoordinate.y);
        }else if(testMap[i][j] == 2){
          image(tileFloor2, isometricCoordinate.x, isometricCoordinate.y);
        }
        
        pop();
      }
    }

  pop();
}

function drawMousePoints(mousePoint){
  mousePointIsometric = cartesianToIsometric(createVector(mouseX - offset2DMap.x, mouseY - offset2DMap.y));

  push();
    strokeWeight(8);
    stroke(0);
    point(mouseX,mouseY);
  pop();

  push();
    strokeWeight(8);
    stroke(0);
    translate(offsetIsometricMap.x, offsetIsometricMap.y);
    point(mousePointIsometric.x, mousePointIsometric.y);
  pop();
}

function drawCar(){
  push();
    translate(offset2DMap.x, offset2DMap.y);
    fill(255,255,255);
    noStroke(0.5);
    rect(carPosition2D.x-8, carPosition2D.y-8,16,16);
  pop();


  push();
     translate(offsetIsometricMap.x, offsetIsometricMap.y);
    carPositionIsometric = cartesianToIsometric(carPosition2D);
    imageMode(CENTER);
    if(carDirection == 0){
      image(carRight, carPositionIsometric.x, carPositionIsometric.y);
    }else if(carDirection == 1){
      image(carUp, carPositionIsometric.x, carPositionIsometric.y);
    }else if(carDirection == 2){
      image(carLeft, carPositionIsometric.x, carPositionIsometric.y);
    }else if(carDirection == 3){
      image(carDown, carPositionIsometric.x, carPositionIsometric.y);
    }
    
  pop();
}

function carMove(){
  if(keyIsDown(LEFT_ARROW)){
    carPosition2D.x -= 5;
    carDirection = 2;
  }else if(keyIsDown(RIGHT_ARROW)){
    carPosition2D.x += 5;
    carDirection = 0;
  }else if(keyIsDown(UP_ARROW)){
    carPosition2D.y -= 5;
    carDirection = 1;
  }else if(keyIsDown(DOWN_ARROW)){
    carPosition2D.y += 5;
    carDirection = 3;
  }

}
