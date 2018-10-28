int imageIndex=0;
PImage bg;
PImage [] images1 = new PImage [10];
PImage [] images2 = new PImage [10];
Boolean faceLeft = true;
float xPosition;
float size = 200;
float speed =50;
void setup() {
  size (1280, 720);
  bg = loadImage("bg.jpg");

  for (int i=0; i<2; i++) {
    images1[i]=loadImage(i+".png");
    images2[i]=loadImage("f"+i+".png");
  }
}

void draw() {
  image(bg, 0, 0, width, height);
     
  if (faceLeft ==true) {
    
    
    if(keyPressed==true){
    image(images1[imageIndex], width/2+xPosition, height/2+100,size,size);
    imageIndex=(imageIndex+1)%2;
    }
    else{
    image(images1[0], width/2+xPosition, height/2+100,size,size);
    }
    if (xPosition <-width/2-size){
    xPosition=width/2;
    }
  }
  
  //println(imageIndex);
  frameRate(20);
  if (faceLeft ==false) {
    if(keyPressed==true){
    image(images2[imageIndex], width/2+xPosition, height/2+100,size,size);
    imageIndex=(imageIndex+1)%2;
    }
    else{
    image(images2[0], width/2+xPosition, height/2+100,size,size);
    }
    
    if (xPosition>width/2){
    xPosition=-width/2-size;
    }
  }
}

void keyPressed() {
  if (key == CODED) {
    if (keyCode == LEFT) {
      faceLeft = true;
      xPosition -=speed;
    } else if (keyCode == RIGHT) {
      faceLeft = false;
      xPosition +=speed;
    }
  }
}
