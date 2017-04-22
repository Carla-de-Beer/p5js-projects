var mr = 0.01;

function Vehicle(x, y, dna) {
	this.acceleration = createVector(0, 0);
	this.velocity = createVector(0, -2);
	this.position = createVector(x, y);
	this.r = 4;
	this.maxspeed = 3;
	this.maxforce = 0.5;

	this.health = 1;

	this.dna = [];
	if (dna === undefined) {
		// Food weight
		this.dna[0] = random(-2, 2);
		// Poison weight
		this.dna[1] = random(-2, 2);
		// Food perception
		this.dna[2] = random(0, 100);
		// Poison perception
		this.dna[3] = random(0, 100);
	} else {
		this.dna[0] = dna[0];
		if (random(1) < mr) {
			this.dna[0] += random(-0.1, 0.1);
		}

		this.dna[1] = dna[1];
		if (random(1) < mr) {
			this.dna[1] += random(-0.1, 0.1);
		}

		this.dna[2] = dna[2];
		if (random(1) < mr) {
			this.dna[2] += random(-10, 10);
		}

		this.dna[3] = dna[3];
		if (random(1) < mr) {
			this.dna[3] += random(-10, 10);
		}
	}

	// Method to update location
	this.update = function() {
		this.health -= 0.005;
		// Update velocity
		this.velocity.add(this.acceleration);
		// Limit speed
		this.velocity.limit(this.maxspeed);
		this.position.add(this.velocity);
		// Reset acceleration to 0 each cycle
		this.acceleration.mult(0);
	};

	this.applyForce = function(force) {
		// We could add mass here if we want A = F / M
		this.acceleration.add(force);
	};

	this.boundaries = function() {
		var desired = null;
		if (this.position.x < margin) {
			desired = createVector(this.maxspeed, this.velocity.y);
		}
		else if (this.position.x > width - margin) {
			desired = createVector(-this.maxspeed, this.velocity.y);
		}

		if (this.position.y < margin) {
			desired = createVector(this.velocity.x, this.maxspeed);
		}
		else if (this.position.y > height - margin) {
			desired = createVector(this.velocity.x, -this.maxspeed);
		}

		if (desired !== null) {
			desired.normalize();
			desired.mult(this.maxspeed);
			var steer = p5.Vector.sub(desired, this.velocity);
			steer.limit(this.maxforce);
			this.applyForce(steer);
		}
	};

	this.behaviours = function(good, bad) {
		var steerG = this.eat(good, 0.3, this.dna[2]);
		var steerB = this.eat(bad, -0.75, this.dna[3]);

		steerG.mult(this.dna[0]);
		steerB.mult(this.dna[1]);

		this.applyForce(steerG);
		this.applyForce(steerB);
	};

	this.eat = function(list, nutrition, perception) {
		var record = Infinity;
		var closest = null;
		for (var i = list.length-1; i >= 0; --i) {
			//var d = this.position.dist(list[i]);
			var d = dist(this.position.x, this.position.y, list[i].x, list[i].y);

			if (d < this.maxspeed) {
				list.splice(i, 1);
				this.health += nutrition;
			} else {
				if (d < record && d < perception) {
					record = d;
					closest = list[i];
				}
			}
		}

		if (closest !== null) {
			return this.seek(closest);
		}

		return createVector(0, 0);
	};

	this.clone = function() {
		if (random(1) < 0.002) {
			return new Vehicle(this.position.x, this.position.y, this.dna);
		} else return null;
	};

	this.dead = function() {
		return (this.health < 0);
	};

	// A method that calculates a steering force towards a target
	// STEER = DESIRED MINUS VELOCITY
	this.seek = function(target) {
		// A vector pointing from the location to the target
		//var desired = p5.Vector.sub(target, this.position);
		var dx = target.x - this.position.x;
		var dy = target.y - this.position.y;

		var desired = createVector(dx, dy);

		// Scale to maximum speed
		desired.setMag(this.maxspeed);

		// Steering = Desired minus velocity
		var steer = p5.Vector.sub(desired, this.velocity);
		// Limit to maximum steering force
		steer.limit(this.maxforce);

		return steer;
	};

	this.display = function(isBest) {
		// Draw a triangle rotated in the direction of velocity
		var theta = this.velocity.heading() + PI/2;
		push();
		translate(this.position.x, this.position.y);
		rotate(theta);

		if (debug.checked()) {
			stroke(foodCol);
			if (isBest) {
				fill(255, 35);
			} else {
				noFill();
			}
			line(0, 0, 0, -this.dna[0] * 25);
			ellipse(0, 0, this.dna[2] * 2);
			stroke(poisonCol);
			line(0, 0, 0, -this.dna[1] * 25);
			ellipse(0, 0, this.dna[3] * 2);
			stroke(255);
		}

		var gr = color(0, 255, 0);
		var rd = color(255, 0, 0);
		var col = lerpColor(rd, gr, this.health);

		fill(col);
		stroke(col);
		strokeWeight(1);

		beginShape();
		vertex(0, -this.r * 2);
		vertex(-this.r, this.r * 2);
		vertex(this.r, this.r * 2);
		endShape(CLOSE);
		pop();
	};
}