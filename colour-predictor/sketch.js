// Carla de Beer
// Created: April 2018.
// Neural network that predicts whether white or black text is better suited
// to a given coloured background.
// Based on Daniel Shiffman's Coding Train video example:
// https://www.youtube.com/watch?v=KtPpoMThKUs
// The code has been amended from example shown through the addition of the softmax functionality to the output nodes.

let r, g, b;
let brain;
let winner;
let pos;

function setup() {
  createCanvas(600, 300);
  noLoop();
  brain = new NeuralNetwork(3, 3, 2);

  for (let i = 0; i < 10000; ++i) {
    let r = random(255);
    let g = random(255);
    let b = random(255);
    let targets = trainColor(r, g, b);
    let inputs = [r / 255, g / 255, b / 255];
    brain.train(inputs, targets);
  }
  pickColor();
}

function colorPredictor(r, g, b) {
  let inputs = [r / 255, g / 255, b / 255];
  let outputs = brain.predict(inputs);
  //console.log(floor(r + g + b));

  // Create softmax array to faciltate output decision
  let softmax = [];
  let denominator = Math.exp(outputs[0]) + Math.exp(outputs[1]);
  softmax[0] = Math.exp(outputs[0]) / denominator;
  softmax[1] = Math.exp(outputs[1]) / denominator;
  //console.table(softmax);

  if (softmax[0] > softmax[1]) {
    winner = softmax[0];
    pos = 150;
    return "black";
  } else {
    winner = softmax[1];
    pos = 450;
    return "white";
  }
}

function trainColor(r, g, b) {
  if (r + g + b > (255 * 3) / 2) {
    return [1, 0];
  } else return [0, 1];
}

function pickColor() {
  r = random(255);
  g = random(255);
  b = random(255);
  redraw();
}

function mousePressed() {
  // let targets = [];
  // if (mouseX > width / 2) {
  //   targets = [0, 1];
  // } else {
  //   targets = [1, 0];
  // }
  // let inputs = [r / 255, g / 255, b / 255];
  //brain.train(inputs, targets);
  pickColor();
}

function draw() {
  background(r, g, b);
  strokeWeight(10);
  stroke(255);
  line(width / 2 - 5, 0, width / 2 - 5, height);

  textSize(64);
  noStroke();
  textAlign(CENTER, CENTER);
  fill(0);
  text("black", 150, 60);
  fill(255);
  text("white", 450, 60);

  let col;
  let which = colorPredictor(r, g, b);
  if (which === "black") {
    col = 0;
    fill(col);
    ellipse(150, 175, 60, 60);
  } else {
    col = 255;
    fill(col);
    ellipse(450, 175, 60, 60);
  }

  textSize(12);
  fill(col);
  text(`Degree of certainty: ${winner.toFixed(4)}`, pos, 270);
}