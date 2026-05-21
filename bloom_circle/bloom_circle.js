/**
 * Creative Coding 2026 - Week 2: Shape Shifters
 * Sketch: draw_rays_and_fade
 * 
 * This sketch demonstrates the "fading background" trick, achieved by 
 * drawing a very transparent background frame over the canvas repeatedly, 
 * creating ghosting trails. It also demonstrates how to draw lines (rays) 
 * from the center of the canvas out to the mouse!
 */

// setup() runs exactly once when the program starts
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Start with a solid yellow background
  background(255, 255, 0); 
}

// draw() runs continuously after setup()
function draw() {
  // --- 1. THE FADE TRICK ---
  // The fourth variable here is Opacity (Alpha channel)!
  // By drawing a very faint yellow background (opacity 6 out of 255) 
  // over the old frames, we create the illusion of trails fading away slowly.
  background(100, 50, 255, 6);


  // --- 2. SET THE STYLING FIRST ---
  // Define our colors and strokes before drawing the shapes
  if (mouseIsPressed) {
    // If the mouse is pressed, swap the colors up!
    fill(255, 0, 255); // Yellow fill
    stroke(200, 200, 100); // Red stroke
    
    // 💡 TRY THIS: Uncomment the line below to randomize the background color when clicked!
    // background(random(255), random(255), random(255)); 
  } else {
    // Normal colors
    fill(255, 255, 0);   // Blue fill (RGB)
    stroke(100);         // Black stroke (0 is shorthand for black)
  }
  
  strokeWeight(2);

for(let i = 0; i < 10; i++){

  let offsetX = random(-40,40);

  let offsetY = random(-40,40);

  circle(
    mouseX + offsetX,
    mouseY + offsetY,
    random(5,20)
  );
}


  // --- 3. DRAW THE SHAPES ---
  
  // Draw a circle following the mouse
 let pulse = sin(frameCount * 0.1) * 20;

circle(
  mouseX,
  mouseY,
  64 + pulse
);
  
  // 💡 TRY THIS: Uncomment the two lines below to draw a fixed circle in the center,
  // and draw "rays" extending from the center out to the mouse!
  // circle(width / 2, height / 2, 24);
  // line(width / 2, height / 2, mouseX, mouseY);  
}

// keyPressed() automatically triggers every time a key is pressed down.
function keyPressed() {
  // Check if the specific key pressed was a lowercase 's'
  if (key === 's') {
    saveCanvas('fading_rays.jpg');
  }
}

// Ensure the canvas fully resizes if the browser window changes size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // When resized, we need to throw down a solid background again 
  // so we don't end up dragging shapes over a blank transparent grid
  background(255, 255, 0); 
}
