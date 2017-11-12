// Carla de Beer
// November 2017
// Circle morphing (morphing a circle into a square, and back, via superellipse parametric equations).

// Based on Paul Burke's equations:
// http://paulbourke.net/geometry/superellipse/

let n = 1;
let rx = 200;
let ry = rx;
let HALFPI = 90;

function setup() {
	createCanvas(500, 500);
	angleMode(DEGREES);
}

function draw() {
	background(245);

	let r = n*120;
	let b = 255 - n*50;

	n = map(sin(frameCount), -1, 1, 1, 2);

	let red = map(sin(frameCount), -1, 1, 39, 255);
	let green = map(sin(frameCount), -1, 1, 153, 65);
	let blue = map(sin(frameCount), -1, 1, 180, 75);

	stroke(red, green, blue);
	fill(red, green, blue);

	push();
	translate(width/2, height/2);
	rotate(45);

	// Draw central square
	beginShape();
		for (let t = 0; t <= 360; t++) {
			if (t % HALFPI === 0) {
				let x = rx * cos(t);
				let y = ry * sin(t);
				vertex(x, y);
			}
		}
	endShape(CLOSE);

	// Draw superellipse
	strokeJoin(ROUND);
	beginShape();
	for (let t = 0; t <= HALFPI; t++) {
		let x = rx * pow(cos(t), n);
		let y = ry * pow(sin(t), n);
		vertex(x, y);
	}
	endShape();
	beginShape();
	for (let t = 0; t <= HALFPI; t++) {
		let x = -rx * pow(cos(t), n);
		let y = ry * pow(sin(t), n);
		vertex(x, y);
	}
	endShape();
	beginShape();
	for (let t = 0; t <= HALFPI; t++) {
		let x = rx * pow(cos(t), n);
		let y = -ry * pow(sin(t), n);
		vertex(x, y);
	}
	endShape();
	beginShape();
	for (let t = 0; t <= HALFPI; t++) {
		let x = -rx * pow(cos(t), n);
		let y = -ry * pow(sin(t), n);
		vertex(x, y);
	}
	endShape();
	pop();
}
