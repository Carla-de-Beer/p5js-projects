// Carla de Beer
// November 2017
// Circle morphing (morphing a circle into a triangle, and back, through lerping).

// Based on Daniel Shiffman's Coding Train video example:
// https://www.youtube.com/watch?v=u2D4sxh3MTs

let cirPath = [];
let triPath = [];
let morPath = [];
let outPath = [];

let spacing = 5;
let theta = 0.0;
let mult = 2.0;

function setup() {
	createCanvas(500, 500);
	angleMode(DEGREES);

	let radius = 100;
	let startA = 0;
	let endA = 120;

	let start = polarToCartesian(radius, startA);
	let end = polarToCartesian(radius, startA);

	for (let angle = startA; angle <= 360; angle += spacing) {
		let x = radius * cos(angle);
		let y = radius * sin(angle);
		cirPath.push(createVector(x, y));
		outPath.push(createVector(x*mult, y*mult));
		let amt = angle / (endA - startA);
		triPath.push(p5.Vector.lerp(start, end, amt));

		if (angle % 120 === 0) {
			startA = startA + 120;
			endA = endA + 120;
			start = polarToCartesian(radius, startA);
			end = polarToCartesian(radius, startA);
		}
	}

	cirPath.push(end);
	triPath.push(end);
	outPath.push(polarToCartesian(radius*mult, startA));

	let astart = 0;
	let aend = 120;
}

function draw() {
	background(245);
	translate(width/2, height/2);
	rotate(30);
	noStroke();

	let amt = (sin(theta) + 1)/2;
	theta += 1;

	let red = map(sin(theta), -1, 1, 39, 255);
	let green = map(sin(theta), -1, 1, 153, 65);
	let blue = map(sin(theta), -1, 1, 180, 75);

	fill(red, green, blue);

	beginShape(CLOSE);
		for (let i = 0; i < cirPath.length; ++i) {
			let cv = cirPath[i];
			let tv = triPath[i];
			let x = lerp(cv.x, tv.x, amt);
			let y = lerp(cv.y, tv.y, amt);
			morPath.push(createVector(x, y));
			vertex(x, y);
		}
	endShape(CLOSE);

	for (let i = 0; i < outPath.length; ++i) {
		fill(180);
		ellipse(outPath[i].x, outPath[i].y, 3);
	}

	for (let i = 0; i < morPath.length-1; ++i) {
		stroke(180);
		strokeWeight(0.5);
		line(outPath[i].x, outPath[i].y, morPath[i].x, morPath[i].y)
	}

	morPath = [];
}

function polarToCartesian(r, a) {
	return createVector(r*cos(a), r*sin(a));
}
