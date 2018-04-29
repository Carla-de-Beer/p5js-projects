// Carla de Beer
// January 2018
// Creating a cube wave with P5js and WebGL.
// Based on Daniel Shiffman's Coding Train video example:
// https://www.youtube.com/watch?v=H81Tdrmz2LA

let distArray = [];
let xArray = [];
let zArray = [];
let angle = 0.0;
let maxD = 0.0;
let isoY = 0.0;
let w = 24;

function setup() {
  createCanvas(400, 400, WEBGL);
  isoY = atan(1 / sqrt(2));
  maxD = dist(0, 0, 200, 200);

  colorMode(RGB);

  // Precompute geometries
  for (let z = 0; z < height; z += w) {
    for (let x = 0; x < width; x += w) {
      zArray.push(z);
      xArray.push(x);
      distArray.push(dist(x, z, width * 0.5, height * 0.5));
    }
  }
}

function draw() {
  background(100);
  orbitControl();
  ortho(-400 - w * 0.5, 400, 400, -400, 0, 1000);
  //ortho(-width * 0.5, width * 0.5, height * 0.5, -height * 0.5, 0, 1000);
  //camera(0, 0, 500, 0, 0, 0, 0, 1, 0);
  rotateX(-QUARTER_PI);
  rotateY(isoY);
  ambientLight(255, 0, 0);
  pointLight(200, 200, 200, 0, 0, 100);

  let offset = 0.0;
  for (let i = 0; i < xArray.length; ++i) {
    push();
    let d = distArray[i];
    let x = xArray[i];
    let z = zArray[i];
    let offset = map(d, 0, maxD, -PI, PI);
    let h = map(sin(angle + offset), -1, 1, 25, 225);
    translate(x - width * 0.5, 0, z - height * 0.5);
    ambientMaterial(h, 255, 255 - h);
    box(w - 1, h, w - 1);
    pop();
  }

  angle -= 0.2;
}