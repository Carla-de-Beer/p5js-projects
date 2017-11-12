// Carla de Beer
// November 2017
// Circle morphing (morphing a circle into a square, and back again, by means of steering).

// Steer and arrive algorithms based on those by Daniel Shiffman ("Nature of Code").

let cirPath = [];
let sqrPath = [];
let particles = [];
let spacing = 2;
let MAX_SPEED = 1;
let MAX_FORCE = 0.008;

let checkBox;

let isReversed = false;
let isDebug = true;

function setup() {
	createCanvas(500, 500);
	angleMode(DEGREES);
  resetSketch();
	checkBox = createCheckbox(" " + "debug", true);
}

function draw() {
	background(245);

	isDebug = checkBox.checked();

	push();
	translate(width/2, height/2);
	rotate(45);
	stroke(80, 200);
	strokeWeight(1);
	noFill();

	beginShape();
	for (let i = 0; i < particles.length; ++i) {
			vertex(particles[i].pos.x, particles[i].pos.y);
	}
	endShape(CLOSE);

	if (isReversed) {
		if (isDebug) {
			for (let i = 0; i < particles.length; ++i) {
				particles[i].drawParticle();
			}
		}

		for (let i = 0; i < particles.length; ++i) {
				particles[i].arrive(cirPath[i]);
				particles[i].run();
		}
	} else {
			if (isDebug) {
				for (let i = 0; i < particles.length; ++i) {
					particles[i].drawParticle();
				}
			}

			for (let i = 0; i < particles.length; ++i) {
				if (particles[i].node === 0) {
					particles[i].arrive(sqrPath[0]);
					particles[i].run();
				} else if (particles[i].node === 1) {
					particles[i].arrive(sqrPath[1]);
					particles[i].run();
				} else if (particles[i].node === 2) {
					particles[i].arrive(sqrPath[2]);
					particles[i].run();
				} else if (particles[i].node === 3) {
					particles[i].arrive(sqrPath[3]);
					particles[i].run();
				}
			}
		}

	for (let i = 0; i < particles.length; ++i) {
		if (frameCount % 800 === 0) {
			console.log("Reverse!");
			isReversed = !isReversed;
			resetSketch();
		}
	}

	pop();
}

function polarToCartesian(r, a) {
	return createVector(r*cos(a), r*sin(a));
}

function addVectors() {
	let radius = 200;
	for (let angle = 0; angle <= 360; angle += spacing) {
		let cv = polarToCartesian(radius, angle);
		if (angle <= 90) {
			cv.node = 0;
		} else if (angle > 90 && angle <= 180) {
			cv.node = 1;
		} else if (angle > 180 && angle <= 270) {
			cv.node = 2;
		} else if (angle > 270) {
			cv.node = 3;
		}

		// Add to circle path
		cirPath.push(cv);

		// Add to square path
		if (angle % 90 === 0 && angle > 0 && angle <= 360) {
			sqrPath.push(cv);
		}
	}
}

function resetSketch() {
	cirPath = [];
	sqrPath = [];
	particles = [];
	addVectors();

	if (isReversed) {
		for (let i = 0; i < cirPath.length; ++i) {
			let cv;
			if (cirPath[i].node === 0) {
				cv = createVector(sqrPath[0].x, sqrPath[0].y);
			} else if (cirPath[i].node === 1) {
				cv = createVector(sqrPath[1].x, sqrPath[1].y);
			} else if (cirPath[i].node === 2) {
				cv = createVector(sqrPath[2].x, sqrPath[2].y);
			} else {
				cv = createVector(sqrPath[3].x, sqrPath[3].y);
			}
			particles.push(new Particle(cv, cirPath[i].node));
		}
	} else {
		for (let i = 0; i < cirPath.length; ++i) {
			particles.push(new Particle(cirPath[i], cirPath[i].node));
		}
	}
}
