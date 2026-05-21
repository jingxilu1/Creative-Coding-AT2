function setup() {
 createCanvas(windowWidth, windowHeight);
 
 background(255, 255, 0); 
}


function draw() {
    // Add multiple particles per frame
    for (let i = 0; i < 5; i++) {
        let x = random(width); // Random x position across the canvas
        let y = random(height); // Random y position across the canvas
        let r = random(0.2, 6); // Random radius for the star, smaller values for more distant stars
        let hue = random(360); // Random hue for color variation (used for our HSB)
        
        fill(hue, 80, 90); // Set fill color with random hue and some saturation and brightness
        noStroke(); // No outline for the stars
        circle(x, y, r); // Draw the star as a circle at the random position with the random radius
    }
    
    // Fade background faster for trails
    background(0, 0, 0, 0.5); // Black background with low opacity to create a fading effect

 if (mouseIsPressed) {
    // If the mouse is pressed, swap the colors up!
    fill(255, 255, 0); // Yellow fill
    stroke(255, 0, 0); // Red stroke
    
    // 💡 TRY THIS: Uncomment the line below to randomize the background color when clicked!
    // background(random(255), random(255), random(255)); 
  } else {
    // Normal colors
    fill(0, 0, 255);   // Blue fill (RGB)
    stroke(0);         // Black stroke (0 is shorthand for black)
  }
  
  strokeWeight(2);


  // --- 3. DRAW THE SHAPES ---
  
  // Draw a circle following the mouse
  circle(mouseX, mouseY, 64);
  
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
