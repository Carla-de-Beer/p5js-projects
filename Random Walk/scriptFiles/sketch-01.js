// Carla de Beer
// October 2017
// A single random walker with Lévy flight whose path colour is based on its screen position.

// Based on Daniel Shiffman's Coding Train video example:
// https://www.youtube.com/watch?v=bqF9w9TTfeo

let pos, prev;

function setup() {
	let cnv = createCanvas(800, 600);
	let x = (windowWidth - width) * 0.5;
	let y = (windowHeight - height) * 0.5;
	cnv.position(x, y);

	background(255);
	pos = createVector(200, 200);
	prev = pos.copy();
}

function draw() {
	let r = map(pos.x, 0, width, 10, 255);
	let b = map(pos.y, 0, height, 10, 255);

	stroke(r, 10, b, 180);
	strokeWeight(1);
	noFill();
	line(pos.x, pos.y, prev.x, prev.y);

	prev.set(pos);

	let step = p5.Vector.random2D();

	let rand = random(100);

	if (rand < 1) {
		step.mult(random(10, 80));
	} else {
		step.setMag(5);
	}

	pos.add(step);

	if (pos.x > width) {
		pos.x = width - 100;
	} else if (pos.x < 0) {
		pos.x = 100;
	} else if (pos.y > height) {
		pos.y = height - 100;
	} else if (pos.y < 0) {
		pos.y = 100;
	}
}
