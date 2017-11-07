// Carla de Beer
// October 2017
// Steering behaviour with text.

// Based on Daniel Shiffman's Coding Train video example:
// https://www.youtube.com/watch?v=4hA7G3gup-4

let font;
let boids = [];
let showText = false;
let points = [];

const textObject = Object.freeze({
	text: "rainbow",
	size: 192,
	xpos: 185,
	ypos: 210
});

function preload() {
	font = loadFont("fonts/AvenirNextLTPro-Demi.otf");
}

function setup() {
	let canvas = createCanvas(1100, 300);
	let x = (windowWidth - width) / 2;
	let y = (windowHeight - height) / 2;
	canvas.position(x, y);

	points = font.textToPoints(textObject.text, textObject.xpos, textObject.ypos, textObject.size, 0.25);

	for (let i = 0; i < points.length; ++i) {
		boids.push(new Boid(points[i].x, points[i].y, 7));
	}
}

function draw() {
	background(220);

	for (let i = 0; i < boids.length-1; ++i) {
		stroke(80);
		strokeWeight(0.5);
		line(boids[i].pos.x, boids[i].pos.y, boids[i+1].pos.x, boids[i+1].pos.y)
	}

	if (showText) {
		textFont(font);
		textSize(textObject.size);
		fill(255, 100);
		noStroke();
		text(textObject.text, textObject.xpos, textObject.ypos);
	}

	for (let i = 0; i < boids.length; ++i) {
		boids[i].display();
		boids[i].update();
		boids[i].move();
	}
}

function mousePressed() {
	showText = !showText;
}