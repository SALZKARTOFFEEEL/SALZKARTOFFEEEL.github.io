class Snake {
  constructor(x = false, y = false, l = 0) {
    this.x = x===false? round(random(sizeX-1)) : x;
    this.y = y===false? round(random(sizeY-1)) : y;
    this.l = l;
    
    this.d = -1;
    
    this.trail = [];
  }
  update() {
    // push current position to the trail:
    this.trail.push({x: this.x, y: this.y});
    if (this.trail.length > this.l) {
      this.trail.shift();
    }
    
    // handle the four directions for the snake:
    switch (this.d) {
      case 0: // up
        this.y--;
        break;
      case 1: // right
        this.x++;
        break;
      case 2: // down
        this.y++;
        break;
      case 3: // left
        this.x--;
        break;
      default: // no movement
        return;
    }
    
    // collect apples:
    if (snek.x == apple.x && snek.y == apple.y) {
      apple = apple.collect();
    }
    
    // die from out of frame:
    if (this.x < 0 ||this.y < 0 || this.x >= sizeX || this.y >= sizeY) {
      snek = this.die();
    }
    
    // die from touching own trail:
    for (var i = 0; i < this.trail.length; i++) {
      if (this.x == this.trail[i].x && this.y == this.trail[i].y) {
        snek = this.die();
      }
    }
  }
  
  drawTrail() {
    fill(59, 48, 91);
    for (var i = 0; i < this.trail.length; i++) {
      rect(coordsX(this.trail[i].x), coordsY(this.trail[i].y), scaleX, scaleY);
    }
  }
  drawHead() {
    fill(253, 233, 98);
    rect(coordsX(this.x), coordsY(this.y), scaleX, scaleY);
  }
  
  die() {
    apple = apple.collect();
    return new Snake();
  }
}

class Apple {
  constructor(x = -1, y = -1) {
    this.x = x==-1? round(random(sizeX-1)) : x;
    this.y = y==-1? round(random(sizeY-1)) : y;
  }
  draw() {
    fill(224, 55, 90);
    rect(coordsX(this.x), coordsY(this.y), scaleX, scaleY);
  }
  collect() {
    snek.l++;
    return new Apple();
  }
}

function coordsX(x) {
  return x * scaleX;
}
function coordsY(y) {
  return y * scaleY;
}

// snake color: rgb(253, 233, 98)
// trail color: rgb(59, 48, 91)
// apple color: rgb(224, 55, 90)

const sizeX = 32;
const sizeY = 32; 
var scaleX = 16;
var scaleY = 16;

var snek;

function setup() {
  createCanvas(sizeX * scaleX, sizeY * scaleY + 32);
  frameRate(8);
  noStroke();
  
  snek = new Snake();
  console.log("Snake spawned at [" + snek.x + ", " + snek.y + "].");
  
  apple = new Apple();
  console.log("Apple spawned at [" + apple.x + ", " + apple.y + "].");
}

function draw() {
  background(32);
  fill(64);
  
  // little score display:
  translate(0, height-32);
  rect(0, 0, width, 32);
  fill(255);
  textSize(24);
  text("Length: " + snek.l, 8, 3, width, 32);
  translate(0, -(height-32))
  
  snek.update();
  
  fill(255);
  
  snek.drawTrail();
  apple.draw();
  snek.drawHead();
}

function keyPressed() {
  // the following code is crap
  
  if (keyCode == UP_ARROW || key == "w") {
    if (snek.d != 2) {
      snek.d = 0;
    }
  }
  else if (keyCode == RIGHT_ARROW || key == "d") {
    if (snek.d != 3) {
      snek.d = 1;
    }
  }
  else if (keyCode == DOWN_ARROW || key == "s") {
    if (snek.d != 0) {
      snek.d = 2;
    }
  }
  else if (keyCode == LEFT_ARROW || key == "a") {
    if (snek.d != 1) {
      snek.d = 3;
    }
  }
  else {
    return true;
  }
  return false;
}