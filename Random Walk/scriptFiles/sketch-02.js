// Carla de Beer
// November 2017
// Multiple random walkers with Lévy flight.

// Based on Daniel Shiffman's Coding Train video example:
// https://www.youtube.com/watch?v=bqF9w9TTfeo

let walker = [];
let numWalkers = 35;

function setup() {
	let cnv = createCanvas(800, 600);
	let x = (windowWidth - width) * 0.5;
	let y = (windowHeight - height) * 0.5;
	cnv.position(x, y);

	background(255);

	for (let i = 0; i < numWalkers; ++i) {
		let r = random(50, 200);
		let b = random(50, 200);
		walker.push(new Walker(r, b));
	}
}

function draw() {
	for (let i = 0; i < numWalkers; ++i) {
		walker[i].walk();
	}
}

class Walker {
	constructor(r, b) {
		this.pos = createVector(floor(random(width)), floor(random(height)));
		this.prev = this.pos.copy();
		this.r = r;
		this.b = b;
	}

	walk() {
		stroke(this.r, this.r, this.b);
		strokeWeight(1);
		noFill();
		line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);

		this.prev.set(this.pos);

		let step = p5.Vector.random2D();

		let rand = random(100);

		if (rand < 1) {
			step.mult(random(10, 80));
		} else {
			step.setMag(5);
		}

		this.pos.add(step);

		if (this.pos.x > width) {
			this.pos.x = width - 100;
		} else if (this.pos.x < 0) {
			this.pos.x = 100;
		} else if (this.pos.y > height) {
			this.pos.y = height - 100;
		} else if (this.pos.y < 0) {
			this.pos.y = 100;
		}
	}
}
