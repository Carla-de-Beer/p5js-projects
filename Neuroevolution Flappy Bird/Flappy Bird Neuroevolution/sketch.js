// Carla de Beer
// October 2018
// This project demonstrates an attempt to solve the Flappy Bird game by means of a neuroevolutionary algorithm. 
// As part of the learning process, individual visualisations are created of the 25 fittest Flappy Birds.
// Each Flappy Bird is created with a neural network and the fittest phenotypes are selected by means of a simple genetic algorithm.
// Based on Daniel Shiffman's Coding Train video examples:
// https://www.youtube.com/watch?v=c6y21FkaUqw

const NUM_POP = 5000;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let slider;

function keyPressed() {
  if (key === "S" || key === "s") {
    let bird = birds[0];
    saveJSON(bird.brain, "bird.json");
    console.log(json);
  }
}

function setup() {
  createCanvas(1200, 600);
  for (let i = 0; i < NUM_POP; ++i) {
    birds[i] = new Bird();
  }

  let group = createDiv("");
  group.position(50, height + 70);
  slider = createSlider(1, 10, 1);
  slider.parent(group);
  let label = createSpan("Speed");
  label.parent(group);
}

function draw() {
  for (let n = 0; n < slider.value(); ++n) {
    if (counter % 75 === 0) {
      pipes.push(new Pipe());
    }
    counter++;

    for (let i = pipes.length - 1; i >= 0; --i) {
      pipes[i].update();

      for (let j = birds.length - 1; j >= 0; --j) {
        if (pipes[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0]);
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    for (let i = birds.length - 1; i >= 0; --i) {
      if (birds[i].offScreen()) {
        savedBirds.push(birds.splice(i, 1)[0]);
      }
    }

    for (let bird of birds) {
      bird.think(pipes);
      bird.update();
    }

    if (birds.length === 0) {
      counter = 0;
      nextGeneration();
      pipes = [];
    }
  }

  // All the drawing stuff
  background(0);
  scale(0.2);

  showGame(0);

  for (let i = 1; i < 26; ++i) {
    if (i % 5 === 0) {
      translate(-4 * width, height);
    } else {
      translate(width, 0);
    }
    showGame(i);
  }
}

function showGame(i) {
  fill(255, 50, 100, 170);
  textSize(55);
  text("# " + i.toString(), 50, height - 50);
  if (birds[i] !== undefined) {
    birds[i].show();
    noFill();
    stroke(255);
    rect(0, 0, width, height);
  }

  for (let pipe of pipes) {
    pipe.show();
  }

  if (birds[i] === undefined) {
    fill(255, 235);
    stroke(55);
    rect(0, 0, width - 2, height - 2);

    noStroke();
    fill(100, 100);
    textSize(85);
    text("Bird removed", 355, height - 200);
  } else {
    noStroke();
    fill(255, 50, 100, 170);
    text("Score: " + birds[i].score, 50, height - 150);
  }
}