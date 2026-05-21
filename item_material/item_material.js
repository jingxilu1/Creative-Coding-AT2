/**
 * Creative Coding 2026 — 3D Sketches: Part 1
 *
 * Welcome to 3D in p5.js! This sketch introduces ideas you need
 * to get started: a WEBGL canvas, lighting, 3D primitives, and
 * the push/pop transform system.
 *
 * In 2D we had a flat XY grid. In 3D there's a third axis, Z,
 * which points towards and away from you. Everything else — setup,
 * draw, fill, stroke — works exactly the same.
 */

function setup() {
  // The magic third argument, WEBGL, switches p5 into 3D mode.
  // Without it, box(), sphere() and lighting won't work.
  createCanvas(windowWidth, windowHeight, WEBGL); //<~~~~~~ WEBGL MODE ENABLED HERE
}

function draw() {
  background(255, 100, 255);

  // --- 1. LIGHTING ---
  // In 3D, shapes look flat unless you add light.
  // ambientLight() is a gentle fill-light that hits every surface equally —
  // think of it as the brightness of a cloudy day.
  ambientLight(180);

  // directionalLight() is like the sun: one colour, one direction.
  // The last three numbers are a direction vector (x, y, z).
  // -0.2, 0.5, -1 means: slightly left, slightly down, strongly towards us.
  directionalLight(255, 255, 255, -0.2, 0.5, -1);
  pointLight(
  120,
  200,
  255,
  mouseX - width/2,
  mouseY - height/2,
  300
);

  // --- 2. THE GROUND PLANE ---
  // A flat plane at ground level gives the eye a reference for space and depth.
  // Without it, floating objects are hard to read.
for(let z = -1000; z < 1000; z += 50){

  stroke(100,150,255,30);

  line(-1000,120,z,1000,120,z);
}

for(let x = -1000; x < 1000; x += 50){

  stroke(100,150,255,30);

  line(x,120,-1000,x,120,1000);
}

  // --- OPTIONAL: BLOB SHADOW (aka FAKE SHADOW) ---
  // Uncomment this whole block to draw a cheap soft shadow on the floor.
  // This is much faster/simpler than true real-time shadow mapping.
  push();
    // Place the shadow just above the floor to avoid z-fighting.
    translate(0, 119, 0);
    rotateX(HALF_PI); // Draw ellipse in the XZ ground plane
    noStroke();
    fill(100, 85); // black with alpha for softness
    ellipse(0, 0, 170, 110);
  pop();

  // --- 3. A ROTATING BOX ---
  // push() saves the current position and rotation so changes here
  // don't affect anything drawn afterwards.
  push();
    // translate() moves the origin — this is how you position things in 3D.
    // Positive Y is DOWN in p5, so negative Y moves the box up off the floor.
    translate(0, -40, 0); // Move the box up off the floor and into the scene a bit
    noStroke();

    // OPTIONAL INTERACTIVE POSITION VERSION:
    // Comment out the line above and uncomment the line below to move the box position with the mouse.
    // translate(map(mouseX, 0, width, -260, 260), map(mouseY, 0, height, -180, 120), 0);

    // frameCount increases by 1 every frame. Multiplying by a small number
    // makes the rotation slow and smooth. Try changing 0.01 to 0.05!
    rotateY(frameCount * 0.01);
    rotateX(frameCount * 0.006);

    // OPTIONAL INTERACTIVE VERSION:
    // Comment out the two rotate lines above and uncomment these to tilt with mouse position.
    // rotateY(map(mouseX, 0, width, -PI, PI));
    // rotateX(map(mouseY, 0, height, -PI / 2, PI / 2));

    emissiveMaterial(100,220,255); // Give the box its colour
    box(180); // A cube — one argument means all sides are equal length
  pop(); // Restore position/rotation before drawing the next shape
  

  // --- OPTIONAL: SPHERE BLOB SHADOW ---
  // Uncomment this whole block for a cheap floor shadow that follows the sphere.
  push();
    // Keep the shadow just above the floor to avoid flickering (z-fighting).
    // translate(220, 119, 100); // Match the static sphere translate option
    // Or match the orbiting sphere translate option:
    translate(cos(frameCount * 0.02) * 240, 119, sin(frameCount * 0.02) * 240);
    rotateX(HALF_PI);
    noStroke();
    fill(0, 75);
    ellipse(0, 0, 120, 80);
  pop();

  // --- 4. A SPHERE OFFSET IN DEPTH ---
  // The third argument of translate() is Z — depth.
  // A negative Z value pushes something away from you into the scene.
  // Notice how the sphere appears smaller than the box because of perspective.
  push();
    // translate(220, -20, 100); // Right, slightly up, and back into the scene
    // OPTIONAL ORBIT VERSION: comment out the line above and uncomment below.
    translate(cos(frameCount * 0.02) * 240, -20, sin(frameCount * 0.02) * 240);
    noStroke();
    
    sphere(55); // A sphere — the one argument is the radius
  pop();
  
  for(let i = 0; i < 100; i++){

  push();

  let x = random(-500,500);

  let y = random(-300,300);

  let z = random(-500,500);

  translate(x,y,z);

  noStroke();

  fill(255,100,100,40);

  sphere(2);

  pop();
}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  // Press S to save a screenshot of the canvas
  if (key === 's') {
    saveCanvas('3d_01_core_forms', 'jpg');
  }
}
