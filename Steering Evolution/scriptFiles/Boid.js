define(["sketch", "../libraries/p5"],
	function(sketch, p5) {
		"use strict";

		var foodPlus = 0.3;
		var poisonMinus = -0.75;
		var mutationRate = 0.01;
		var frameMinus = 0.005;
		var foodCol, poisonCol;
		var margin = sketch.margin;
		var p = sketch.p;

		return p5.Boid = function(x, y, dna) {
			foodCol = p.color(0, 255, 0);
			poisonCol = p.color(255, 0, 0);

			this.acceleration = p.createVector(0, 0);
			this.velocity = p.createVector(0, -2);
			this.position = p.createVector(x, y);
			this.r = 4;
			this.maxspeed = 3;
			this.maxforce = 0.5;
			this.millis = (new Date).getTime();
			this.health = 1;

			this.dna = [];
			if (dna === undefined) {
				// Food weight
				this.dna[0] = p.random(-2, 2);
				// Poison weight
				this.dna[1] = p.random(-2, 2);
				// Food perception
				this.dna[2] = p.random(0, 100);
				// Poison perception
				this.dna[3] = p.random(0, 100);
			} else {
				this.dna[0] = dna[0];
				if (p.random(1) < mutationRate) {
					this.dna[0] += p.random(-0.1, 0.1);
				}

				this.dna[1] = dna[1];
				if (p.random(1) < mutationRate) {
					this.dna[1] += p.random(-0.1, 0.1);
				}

				this.dna[2] = dna[2];
				if (p.random(1) < mutationRate) {
					this.dna[2] += p.random(-10, 10);
				}

				this.dna[3] = dna[3];
				if (p.random(1) < mutationRate) {
					this.dna[3] += p.random(-10, 10);
				}
			}

			// Method to update location
			this.update = function() {
				this.health -= frameMinus;
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
					desired = p.createVector(this.maxspeed, this.velocity.y);
				}
				else if (this.position.x > p.width - margin) {
					desired = p.createVector(-this.maxspeed, this.velocity.y);
				}

				if (this.position.y < margin) {
					desired = p.createVector(this.velocity.x, this.maxspeed);
				}
				else if (this.position.y > p.height - margin) {
					desired = p.createVector(this.velocity.x, -this.maxspeed);
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
				var steerG = this.eat(good, foodPlus, this.dna[2]);
				var steerB = this.eat(bad, poisonMinus, this.dna[3]);

				steerG.mult(this.dna[0]);
				steerB.mult(this.dna[1]);

				this.applyForce(steerG);
				this.applyForce(steerB);
			};

			this.eat = function(list, nutrition, perception) {
				var record = Infinity;
				var closest = null;
				for (var i = list.length-1; i >= 0; --i) {
					var d = p.dist(this.position.x, this.position.y, list[i].x, list[i].y);

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

				return p.createVector(0, 0);
			};

			this.clone = function() {
				var p = sketch.p;

				if (p.random(1) < 0.002) {
					return new p5.Boid(this.position.x, this.position.y, this.dna);
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

				var desired = p.createVector(dx, dy);

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
				var theta = this.velocity.heading() + p.PI/2;
				p.push();
				p.translate(this.position.x, this.position.y);
				p.rotate(theta);

				if (isBest) {
					p.fill(255, 40);
				} else {
					p.noFill();
				}

				if (sketch.debug) {
					if (isBest) {
						p.fill(255, 40);
					} else {
						p.noFill();
					}
					p.stroke(foodCol);
					p.line(0, 0, 0, -this.dna[0] * 25);
					p.strokeWeight(0.7);
					p.ellipse(0, 0, this.dna[2] * 2);

					p.stroke(poisonCol);
					p.line(0, 0, 0, -this.dna[1] * 25);
					p.strokeWeight(1);
					p.strokeWeight(0.7);
					p.ellipse(0, 0, this.dna[3] * 2);
					p.strokeWeight(1);
					p.stroke(255);
				}

				var gr = p.color(0, 255, 0);
				var rd = p.color(255, 0, 0);
				var col = p.lerpColor(rd, gr, this.health);

				p.fill(col);
				p.stroke(col);
				p.strokeWeight(1);

				p.beginShape();
				p.vertex(0, -this.r * 2);
				p.vertex(-this.r, this.r * 2);
				p.vertex(this.r, this.r * 2);
				p.endShape(p.CLOSE);
				p.pop();
			};
		}

	});