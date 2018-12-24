// Carla de Beer
// December 2018
// Visualisation of an approximation of a sawtooth wave by taking the first n terms of its Fourier series.
// Based on Daniel Shiffman's Coding Train video example:
// https://www.youtube.com/watch?v=Mm2eYfj0SgA

/// <reference path="./codeSense/p5.global-mode.d.ts" />

let time = 0.0;
const multiplier = 2;
const wave = [];
let slider;

function setup() {
  /* eslint-disable-line */
  createCanvas(800, 400);

  const group = createDiv("");
  group.position(50, height + 75);
  slider = createSlider(2, 50, 4);
  slider.parent(group);
}

function draw() {
  /* eslint-disable-line */
  background(0);
  noStroke();
  let screenText = "";
  translate(200, 200);

  let x = 0;
  let y = 0;

  for (let i = 1; i < slider.value() + 1; ++i) {
    const prevX = x;
    const prevY = y;
    let n = i;
    if (n % 2 === 0) {
      n *= -1;
      screenText = `Fourier sawtooth wave: ${multiplier}sin(${slider.value()}\u03B8)/-${slider.value()}\u03A0`;
    } else {
      screenText = `Fourier sawtooth wave: ${multiplier}sin(${slider.value()}\u03B8)/${slider.value()}\u03A0`;
    }

    const radius = 75 * (multiplier / (i * PI));
    x += radius * cos(n * time);
    y += radius * sin(n * time);

    stroke(255, 100);
    noFill();
    ellipse(prevX, prevY, radius * 2);
    fill(255, 255 - i * 40);

    line(prevX, prevY, x, y);
    ellipse(x, y, 5);
  }
  wave.unshift(y);
  fill(0, 255, 150);
  text(screenText, -200 + 20, -200 + height - 30);

  noFill();
  stroke(0, 255, 150);
  translate(150, 0);
  line(x - 150, y, 0, wave[0]);
  beginShape();
  for (let i = 0, l = wave.length; i < l; ++i) {
    vertex(i, wave[i]);
  }
  endShape();

  if (wave.length > 500) {
    wave.pop();
  }

  time += 0.025;
}
