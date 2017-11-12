// Carla de Beer
// November 2017
// Circle morphing (morphing a circle into a triangle, and back, through systematic vertex removal).

// Based on Daniel Shiffman's Coding Train video example:
// https://www.youtube.com/watch?v=0veqAiA61AU

let cirPath = [];
let spacing = 2;
let count = 0;

function setup() {
	createCanvas(500, 500);
	angleMode(DEGREES);
	addVectors();
}

function draw() {
	background(245);
	translate(width/2, height/2);
	noStroke();
	strokeWeight(1);

	let red = map(count, 0, cirPath.length, 39, 255);
	let green = map(count, 0, cirPath.length, 153, 65);
	let blue = map(count, 0, cirPath.length, 180, 75);

	fill(red, green, blue);

	beginShape(CLOSE);
		for (let i = 0; i < cirPath.length; ++i) {
			if (cirPath[i].active) {
				vertex(cirPath[i].x, cirPath[i].y);
			}
		}
	endShape(CLOSE);

	let activeList = [];
	for (let i = 0; i < cirPath.length; ++i) {
		if (cirPath[i].active && !cirPath[i].fixed) {
			activeList.push(cirPath[i]);
		}
	}

	let index = 0;
	let v = activeList[index];
	if (v) {
		v.active = false;
		count++;
	}

	if (count >= cirPath.length - 4) {
		setTimeout(function(){
						cirPath = [];
			addVectors();
			count = 0;
		}, 500);
	}
}

function polarToCartesian(r, a) {
	return createVector(r*cos(a), r*sin(a));
}

function addVectors() {
	let radius = 200;
	let i = 0;
	for (let angle = 0; angle <= 360; angle += spacing) {
		let cv = polarToCartesian(radius, angle)
		if (angle % 120 === 0) {
			cv.fixed = true;
		} else {
			cv.fixed = false;
		}
		cv.active = true;
		cirPath.push(cv);
	}
}
