// Carla de Beer
// December 2017
// Creating a relationship between objects and images in P5js. Click on the flower heads to turn them into red dahlias.
// Based on Daniel Shiffman's Coding Train video example:
// https://www.youtube.com/watch?v=i2C1hrJMwz0

let bubbles = [];
let flowers = [];
let flower;
const numFlowers = 75;
let isClicked = false;

function preload() {
	flower = loadImage("images/flower.png");
	for (let i = 1; i < 4; ++i) {
		flowers.push(loadImage(`images/flowers/flower-0${i}.png`));
	}
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);

	for (let i = 0; i < numFlowers; ++i) {
		let x = random(100, width - 100);
		let y = random(100, height - 100);
		let r = random(30, 80);
		let myFlower = random(flowers);
		bubbles.push(new Bubble(x, y, r, myFlower, flower));
	}
}

function draw() {
	background(0);

	for (let i = 0; i < bubbles.length; ++i) {
		bubbles[i].display();
		bubbles[i].move();
	}
}

function mousePressed() {
	for (let i = 0; i < bubbles.length; ++i) {
		bubbles[i].contains(mouseX, mouseY);
	}
}

class Bubble {
	constructor(x, y, r, img, flower) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.brightness = 0;
		this.img = img;
		this.flower = flower;
	}

	contains(x, y) {
		// Bounds checking for rectangles (in case rectangular images are used).
		// Works also for circular images.
		if (x > this.x && x < this.x + this.r && y > this.y && y < this.y + this.r) {
			this.storedImage = this.img;
			this.img = this.flower;
		}
	}

	move() {
		this.x = this.x + random(-2, 2);
		this.y = this.y + random(-2, 2);
	}

	display() {
		image(this.img, this.x, this.y, this.r, this.r);
	}
}


let bubbles = [];
let flowers = [];
let flower;
const numFlowers = 75;
let isClicked = false;

function preload() {
	flower = loadImage("images/flower.png");
	for (let i = 1; i < 4; ++i) {
		flowers.push(loadImage(`images/flowers/flower-0${i}.png`));
	}
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);

	for (let i = 0; i < numFlowers; ++i) {
		let x = random(100, width - 100);
		let y = random(100, height - 100);
		let r = random(30, 80);
		let myFlower = random(flowers);
		bubbles.push(new Bubble(x, y, r, myFlower, flower));
	}
}

function draw() {
	background(0);

	for (let i = 0; i < bubbles.length; ++i) {
		bubbles[i].display();
		bubbles[i].move();
	}
}

function mousePressed() {
	for (let i = 0; i < bubbles.length; ++i) {
		bubbles[i].contains(mouseX, mouseY);
	}
}

class Bubble {
	constructor(x, y, r, img, flower) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.brightness = 0;
		this.img = img;
		this.flower = flower;
	}

	contains(x, y) {
		// Bounds checking for rectangles (in case rectangular images are used).
		// Works also for circular images.
		if (x > this.x && x < this.x + this.r && y > this.y && y < this.y + this.r) {
			this.storedImage = this.img;
			this.img = this.flower;
		}
	}

	move() {
		this.x = this.x + random(-2, 2);
		this.y = this.y + random(-2, 2);
	}

	display() {
		image(this.img, this.x, this.y, this.r, this.r);
	}
}
