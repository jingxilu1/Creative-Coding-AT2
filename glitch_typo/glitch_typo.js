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

let layer1Images = [];
let layer2Images = [];
let layer3Images = [];

let layer1Items = [];
let layer2Items = [];
let layer3Items = [];

function preload() {
  layer1Images.push(loadImage('data/A1.png'));
  layer2Images.push(loadImage('data/A9.png'));
  layer3Images.push(loadImage('data/F8.png'));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  noLoop();

  layer1Items = generateCollageItems(layer1Images, 1, width/2, height/2, width/3, height/4, 0.5, 1.5, 0, PI);
  layer2Items = generateCollageItems(layer2Images, 1, width/2, height/2, width/2, height/3, 0.2, 1.0, -HALF_PI, HALF_PI);
  layer3Items = generateCollageItems(layer3Images, 1, width/2, height/2, width/2, height, 0.4, 0.8, PI, HALF_PI);
}

function draw() {
  background(255);

  drawCollageItems(layer1Items);
  drawCollageItems(layer2Items);
  drawCollageItems(layer3Items);

  fill(180,220,255,80);
  textAlign(CENTER, CENTER);
  textSize(60);

fill(255,0,100,50);

text(
  "MEMORY ERROR",
  width/2 + random(-3,3),
  height/2
);

fill(180,220,255,255);

text(
  "MEMORY ERROR",
  width/2,
  height/2
);
}

function drawCollageItems(items) {
  for (let i = 0; i < items.length; i++) {

    let item = items[i];

    push();
    translate(item.x, item.y);
    rotate(item.rotation);
    scale(item.scaling);

    let floatY = sin(frameCount * 0.01 + item.offset) * 20;

    image(
      item.image,
      0,
      floatY,
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
    let fileName = 'collage_' + year() + month() + day() + "_" + hour() + minute() + second();
    saveCanvas(fileName, 'jpg');
  }
}
