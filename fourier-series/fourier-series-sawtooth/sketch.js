// Carla de Beer
// December 2018
// Visualisation of an approximation of a sawtooth wave by taking the first n terms of its Fourier series.
// Based on Daniel Shiffman's Coding Train video example:
// https://www.youtube.com/watch?v=Mm2eYfj0SgA and on
// https://en.wikipedia.org/wiki/Fourier_series

/// <reference path="./codeSense/p5.global-mode.d.ts" />

const multiplier = 2;
const wave = [];
let time = 0.0;
let shiftX, shiftY;
let slider;
let waveColour, lineColour;

function setup() /* eslint-disable-line */ {
  createCanvas(innerWidth - 100, 400);
  shiftX = height * 0.5;
  shiftY = height * 0.5;
  // Create slider
  const group = createDiv("");
  group.position(50, height + 75);
  slider = createSlider(1, 50, 5);
  slider.parent(group);
  waveColour = color(0, 255, 150);
  lineColour = color(255, 0, 80, 200);
}

function draw() /* eslint-disable-line */ {
  background(25);
  noStroke();
  translate(shiftX, shiftY);

  let x = 0;
  let y = 0;
  let screenText = "";

  for (let i = 1, l = slider.value() + 1; i < l; ++i) {
    const prevX = x;
    const prevY = y;
    let n = i;
    let minus = "";

    n % 2 === 0 ? (n *= -1) : (minus = "-");

    if (n === 1) {
      screenText = `Fourier series sawtooth wave: ${multiplier}sin(\u03B8)/${minus}\u03A0`;
    } else {
      screenText = `Fourier series sawtooth wave: ${multiplier}sin(${slider.value()}\u03B8)/${minus}${slider.value()}\u03A0`;
    }

    const radius = 100 * (multiplier / (n * PI));
    x += radius * cos(i * time);
    y += radius * sin(i * time);

    // Draw circle and line
    stroke(255, 100);
    noFill();
    ellipse(prevX, prevY, radius * 2);

    fill(255, 255 - i * 40);
    stroke(lineColour);
    line(prevX, prevY, x, y);
    ellipse(x, y, 5);
  }

  wave.unshift(y);

  noStroke();
  fill(waveColour);
  text(screenText, -shiftX + 25, -shiftY + height - 45);
  text(`Series size: ${slider.value()}`, -shiftX + 25, -shiftY + height - 27);

  noFill();
  stroke(waveColour);
  translate(150, 0);
  line(x - 150, y, 0, wave[0]);

  beginShape();
  for (let i = 0, l = wave.length; i < l; ++i) {
    vertex(i, wave[i]);
  }
  endShape();

  if (wave.length > 1000) {
    wave.pop();
  }

  time += 0.025;
}
