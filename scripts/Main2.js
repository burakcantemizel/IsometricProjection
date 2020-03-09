let map = [
  [1,1,1],
  [1,1,1],
  [1,1,1],  
];

let kameraPozisyonX = 0;
let kameraPozisyonY = 0;
let hiz = 5;

function setup(){
    createCanvas(windowWidth, windowHeight);
    
}

function draw(){
    background(0);
    kamera();

    
    fill(255);
    noStroke();
    //rect(0,0,100,100);
    kartezyenDuzlemCiz(1000);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function kartezyenDuzlemCiz(eksenBoyutu){
        stroke(255,0,0);
        line(0,0,eksenBoyutu,0);

        stroke(0,255,0);
        line(0,0,0,eksenBoyutu);
}

function kamera(){    
    if(keyIsDown(LEFT_ARROW)){
        kameraPozisyonX += hiz;
    }

    if(keyIsDown(RIGHT_ARROW)){
        kameraPozisyonX -= hiz;
    }

    if(keyIsDown(UP_ARROW)){
        kameraPozisyonY += hiz;
    }
    
    if(keyIsDown(DOWN_ARROW)){
        kameraPozisyonY -= hiz;
    }

    translate(kameraPozisyonX, kameraPozisyonY);
}