// Carla de Beer
// October 2017
// Gridded circles. Variation on the 10PRINT algorithm.

// Based on Daniel Shiffman's Coding Train video example:
// https://www.youtube.com/watch?v=bEyTZ5ZZxZs

let spacing = 40;
let x = spacing/2;
let y = spacing/2;
let radius = 25;

function setup() {
	createCanvas(1320, 640);
	background(51);
}

function draw() {
	let w = random(1, 8);

	let r1 = random(15, 200);
	let r2 = random(15, 200);

	let g1 = random(15, 200);
	let g2 = random(15, 200);

	let b1 = random(15, 200);
	let b2 = random(15, 200);

	if (random(1) < 0.6) {
		stroke(r1, g1, b1);
		strokeWeight(w);
		fill(r2, g2, b2);
		ellipse(x, y, radius);
	}

	x += spacing;

	if (x >= width) {
		x = spacing/2;
		y += spacing;
	}

	if (y >= height) {
		noLoop();
	}
}

