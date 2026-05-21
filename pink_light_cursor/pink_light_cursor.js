/**
 * Creative Coding 2026 - Week 5: Image Collage and Arrays
 * Sketch: image_collage_arrays.js mostly based 
 * on an example in "Generative Design" by Benedikt Groß, 
 * Hartmust Bohnacker, Julia Laub, and Claudius Lazzeroni.
 * 
 * Instructions:
 * 1. Place images in the 'data' folder.
 * 2. Update the preload() counts to match your number of images.
 */

/**
 * Creative Coding 2026 - Image Collage System
 */

let layer1Images = [];
let layer2Images = [];
let layer3Images = [];

let layer1Items = [];
let layer2Items = [];
let layer3Items = [];

let particles = [];

function preload() {
  layer1Images.push(loadImage('data/A1.png'));
  layer2Images.push(loadImage('data/A9.png'));
  layer3Images.push(loadImage('data/F8.png'));
}

function resetSketch() {
  particles = [];

  for (let i = 0; i < 200; i++) {
    particles.push(new SnowParticle());
  }

  layer1Items = generateCollageItems(layer1Images, 1, width/2, height/2, width/3, height/4, 0.5, 1.5, 0, PI);
  layer2Items = generateCollageItems(layer2Images, 1, width/2, height/2, width/2, height/3, 0.2, 1.0, -HALF_PI, HALF_PI);
  layer3Items = generateCollageItems(layer3Images, 1, width/2, height/2, width/2, height, 0.4, 0.8, PI, HALF_PI);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  resetSketch();
}

function draw() {
  background(255, 30);
  
  for (let p of particles) {
  p.update();
  p.display();
}
  

  drawCollageItems(layer1Items);
  drawCollageItems(layer2Items);
  drawCollageItems(layer3Items);
  

  let alpha = map(
    sin(frameCount * 0.03),
    -1,
    1,
    40,
    180
  );

  textAlign(CENTER, CENTER);
  textSize(60);

  fill(180,220,255, alpha * 0.4);
  text("MEMORY ERROR", width/2, height/2);

  fill(255,0,100, alpha * 0.6);
  text(
    "MEMORY ERROR",
    width/2 + random(-2,2),
    height/2 + random(-2,2)
  );

  fill(255,255,255, alpha);
  text("MEMORY ERROR", width/2, height/2);
  
  for (let p of particles) {
  p.display();
}

drawCursor();
}


function drawCollageItems(items) {
  for (let i = 0; i < items.length; i++) {

    let item = items[i];

    push();
    translate(item.x, item.y);
    rotate(item.rotation);
    scale(item.scaling);

tint(255, 255, 255, 120);

image(item.image,-5,0);

tint(255, 255, 255, 120);

image(item.image,5,0);

tint(255);

    image(
      item.image,
      0,
      0,
      item.image.width * 0.4,
      item.image.height * 0.4
    );

    pop();
  }
}


function generateCollageItems(imgArray, count, centerX, centerY, rangeX, rangeY, minScale, maxScale, minRotation, maxRotation) {

  let items = [];

  for (let i = 0; i < count; i++) {

    let img = random(imgArray);

    let item = new CollageItem(img);

    item.x = centerX + random(-rangeX / 2, rangeX / 2);
    item.y = centerY + random(-rangeY / 2, rangeY / 2);
    item.rotation = random(minRotation, maxRotation);
    item.scaling = random(minScale, maxScale);

    items.push(item);
  }

  return items;
}


function CollageItem(image) {
  this.image = image;
  this.x = 0;
  this.y = 0;
   this.rotation = 0;
  this.scaling = 1;
  this.offset = random(1000);
}

function mousePressed() {
  setup();
  redraw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
  redraw();
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    let fileName =
      'collage_' +
      year() + month() + day() + "_" +
      hour() + minute() + second();

    saveCanvas(fileName, 'jpg');
  }
}

function SnowParticle() {
  this.x = random(width);
  this.y = random(height);
  this.size = random(1, 3);
  this.speed = random(0.2, 1.2);
  this.alpha = random(50, 150);

  this.update = function () {
    this.y += this.speed;
    this.x += sin(this.y * 0.01) * 0.3;

    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  };

  this.display = function () {
    push();
    noStroke();
    fill(255, 255, 255, 220);
    circle(this.x, this.y, this.size * 3);
    pop();
  };
}

function drawCursor() {
  noCursor();

  let x = mouseX;
  let y = mouseY;

  noStroke();
  fill(180, 220, 255, 80);
  circle(x, y, 18);

  fill(255, 0, 100, 120);
  circle(x + random(-2, 2), y + random(-2, 2), 10);

  fill(0, 255, 255, 120);
  circle(x - random(-2, 2), y - random(-2, 2), 6);

  fill(255);
  circle(x, y, 4);
}


 
