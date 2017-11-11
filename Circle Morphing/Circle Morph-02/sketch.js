let cirPath = [];
let spacing = 2;
let count = 0;

function setup() {
	createCanvas(500, 500);
	angleMode(DEGREES);
	addVectors();
}

function draw() {
	background(220);
	translate(width/2, height/2);
	noStroke();
	strokeWeight(1);
	fill(count, 0, 255-count);

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

	//console.log(count);

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
