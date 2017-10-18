// Carla de Beer
// October 2017
// Coloured pattern effect. Variation on the 10PRINT algorithm.

// Based on Daniel Shiffman's Coding Train video example:
// https://www.youtube.com/watch?v=bEyTZ5ZZxZs

let x = 10;
let y = 10;
let spacing = 40;

function setup() {
	createCanvas(1340, 660);
	//console.log(window.innerWidth - 100);
	background(51);
}

function draw() {
	stroke(255);

	let w1 = random(2, 12);
	let w2 = random(1, 8);

	let r1 = random(15, 200);
	let r2 = random(15, 200);

	let g1 = random(15, 200);
	let g2 = random(15, 200);

	let b1 = random(15, 200);
	let b2 = random(15, 200);

	if (random(1) < 0.5) {
		strokeWeight(w1);
		stroke(r1, g1, b1);
		line(x, y, x + spacing, y + spacing);
	} else {
		strokeWeight(w2);
		stroke(r2, g2, b2);
		fill(r2, g2, b2);
		line(x, y + spacing, x + spacing, y);
	}

	x += spacing;

	if (x >= width - 10) {
		x = 10;
		y += spacing;
	}

	if (y >= width - 10) {
		noLoop();
	}
}

