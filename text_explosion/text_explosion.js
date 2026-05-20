/**
 * Creative Coding 2026 - Week 4: Advanced Typography
 * Original Concept by Andy Simionato & KarenAnn Donnachie
 * 
 * This sketch introduces Object-Oriented Programming (OOP) by 
 * turning every word of a text into an independent object
 * that can move and display itself. It adds an extra
 * behavior to the words: they run away from the mouse!
 * 
 * try changing the values in the move() method to see 
 * how it affects the behavior or add even more behaviours 
 * to the words!
 */

let allWords = []; // This array will store all our word objects
let para;          // We'll store the loaded text file here

function preload() {
  // loadStrings() reads the text file into an array of lines.
  // Make sure 'data/mcluhan.txt' exists in your data folder!
  para = loadStrings("data/studio.txt");
}

function setup() {
  // Create a canvas that fills the whole browser window
  createCanvas(windowWidth, windowHeight);

  // Set initial styles
  background(0); // black background
  fill(255);     // white text
  //textFont("Impact"); // Bolt font for a strong visual statement
  textAlign(CENTER, CENTER);
  colorMode(HSB, 360, 100, 100, 100);

  // We take the first line of the text [0] and split it into individual words
  let words = para[0].split(' ');

  // For every word in the list, 
  // we create a new object to be used by our 'Manifesto'  class
  for (let i = 0; i < words.length; i++) {
    let x = random(width);
    let y = random(height);

    // Create the object and add it to our 'allWords' array
    let newWord = new Manifesto(words[i], x, y);
    allWords.push(newWord);
  }
}

function draw() {
  // Clear the frame every time so movement looks clean
  background(0, 20);

  // Go through every word object in the list and tell it to move and draw
  for (let i = 0; i < allWords.length; i++) {
    allWords[i].move();
    allWords[i].display();
  }
  
  for(let i = 0; i < allWords.length; i++){

  for(let j = i + 1; j < allWords.length; j++){

    let d = dist(
      allWords[i].x,
      allWords[i].y,
      allWords[j].x,
      allWords[j].y
    );

    if(d < 120){

      stroke(180,50,100,20);

      line(
        allWords[i].x,
        allWords[i].y,
        allWords[j].x,
        allWords[j].y
      );
    }
  }
}
noFill();

stroke(200,40,100);

strokeWeight(2);

circle(mouseX, mouseY, 50);

line(mouseX - 10, mouseY, mouseX + 10, mouseY);

line(mouseX, mouseY - 10, mouseX, mouseY + 10);
}

/**
 * The 'Manifesto' Class
 * Think of this as a blueprint for a word that can move and show itself.
 */
class Manifesto {
  // The constructor runs once when we say 'new Manifesto(...)'
constructor(wordText, x, y) {

  this.text = wordText;

  this.x = x;

  this.y = y;

  this.size = random(16, 60);
  
  this.hue = random(180, 240);
  
  this.exploded = false;
}
  // A 'method' to change the word's position (movement behavior)
  move() {

  let d = dist(
    mouseX,
    mouseY,
    this.x,
    this.y
  );


  if (d < 120) {

    this.exploded = true;

    if (mouseX < this.x) {
      this.x += 2;
    }

    if (mouseX > this.x) {
      this.x -= 2;
    }

    if (mouseY < this.y) {
      this.y += 2;
    }

    if (mouseY > this.y) {
      this.y -= 2;
    }

  } else {

    this.exploded = false;

    this.x += random(-1, 1);

    this.y += random(-1, 1);
  }
}
  // A 'method' to draw the word on the screen
 display() {

  if (!this.exploded) {

    textSize(this.size);

    fill(
      this.hue,
      80,
      100,
      80
    );

    let offsetX = random(-2, 2);

    let offsetY = random(-2, 2);

    text(
      this.text,
      this.x + offsetX,
      this.y + offsetY
    );

  } else {

    for(let i = 0; i < 30; i++){

      let px = this.x + random(-50, 50);

      let py = this.y + random(-50, 50);

      let s = random(2, 8);

      fill(
        this.hue,
        50,
        100,
        50
      );

      noStroke();

      circle(px, py, s);
    }
  }
}
}

// The following is not part of the class, it simply adjusts the canvas 
// if the browser window changes size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
