// Carla de Beer
// April 2017
// Evolutionary steering.
// A game that allows you to create food in oder to determine which boid becomes the fittest in the population.
// Green dots signify food; red stars poison.
// Each boid's health level is adversely affected when it does not eat, or eats poison.
// Eating a green dot allows for an increase in a boid's health level.
// Based on Daniel Shiffman's Coding Train video example:
// https://www.youtube.com/watch?v=qzFlnX-z38U

var vehicles = [];
var food = [];
var poison = [];

var debug;
var margin = 35;

var foodCol;
var poisonCol;

var bestVehicle = -1;

function setup() {
	createCanvas(window.innerWidth - 80, 500);

	for (var i = 0; i < 10; ++i) {
		vehicles[i] = new Vehicle(random(width), random(height));
	}

	for (var i = 0; i < 20; ++i) {
		var x = random(margin, width - margin);
		var y = random(margin, height - margin);
		food.push(createVector(x, y));
	}

	for (var i = 0; i < 10; ++i) {
		x = random(margin, width - margin);
		y = random(margin, height - margin);
		poison.push(new Star(x, y, 1.5, 9, 3));
	}

	debug = createCheckbox();

	foodCol = color(0, 255, 0);
	poisonCol = color(255, 0, 0);
}

function draw() {
	background(51);
	fill(255);
	noStroke();

	if (random(1) < 0.1) {
		x = random(margin, width - margin);
		y = random(margin, height - margin);
		food.push(createVector(x, y));
	}

	if (random(1) < 0.01) {
		var x = random(margin, width - margin);
		var y = random(margin, height - margin);
		poison.push(new Star(x, y, 1.5, 9, 3));
	}

	for (var i = 0; i < food.length; ++i) {
		fill(foodCol);
		noStroke();
		ellipse(food[i].x, food[i].y, 5, 5);
	}

	for (var i = 0; i < poison.length; ++i) {
		fill(poisonCol);
		noStroke();
		poison[i].show();
	}

	// Call the appropriate steering behaviours for our agents
	for (var i = vehicles.length-1; i >= 0; --i) {
		vehicles[i].boundaries();
		vehicles[i].behaviours(food, poison);
		vehicles[i].update();
		if (bestVehicle === i) {
			vehicles[i].display(true);
		} else {
			vehicles[i].display(false);
		}

		var newVehicle = vehicles[i].clone();
		if (newVehicle !== null) {
			vehicles.push(newVehicle);
		}

		if (vehicles[i].dead()) {
			food.push(createVector(vehicles[i].position.x, vehicles[i].position.y));
			vehicles.splice(i, 1);
		}
	}

	var bestHealth = 0;
	for (var i = 0; i < vehicles.length; ++i) {
		if (vehicles[i].health > bestHealth) {
			bestHealth = vehicles[i].health;
			bestVehicle = i;
		}
	}
	if (debug.checked()) {
		fill(255, 220);
		text("Best health value: " + bestHealth.toFixed(3), 25, height - 25);
	}
}

function mousePressed() {
	food.push(createVector(mouseX, mouseY));
}