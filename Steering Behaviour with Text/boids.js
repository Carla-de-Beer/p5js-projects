let speed;

class Boid {
	constructor(x, y, radius) {
		this.pos = createVector(random(width), random(height));
		this.target = createVector(x, y);
		this.vel = p5.Vector.random2D();
		this.acc = createVector();
		this.radius = radius;
		this.maxSpeed = 10;
		this.maxForce = 1;
	}

	display() {
		let b = map(this.pos.y, 75, height - 100, 0, 255);
		stroke(floor(b), 200 - b, 255 - floor(b));
		strokeWeight(this.radius);
		point(this.pos.x, this.pos.y);
	}

	move() {
		let arrive = this.arrive(this.target);
		let mouse = createVector(mouseX, mouseY);
		let flee = this.flee(mouse);

		arrive.mult(1);
		flee.mult(5);

		this.applyForce(arrive);
		this.applyForce(flee);
	}

	applyForce(force) {
		this.acc.add(force);
	}

	update() {
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.acc.mult(0);
	}

	arrive(target) {
		let desired = p5.Vector.sub(target, this.pos);
		let d = desired.mag();
		speed = this.maxSpeed;

		if (d < 100) {
			speed = map(d, 0, 100, 0, this.maxSpeed);
		}
		desired.setMag(speed);

		let steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.maxForce);
		return steer;
	}

	flee(target) {
		let desired = p5.Vector.sub(target, this.pos);
		let d = desired.mag();

		if (d < 50) {
			desired.setMag(speed);
			desired.setMag(this.maxSpeed);
			desired.mult(-1);
			let steer = p5.Vector.sub(desired, this.vel);
			steer.limit(this.maxForce);
			return steer;
		} else {
			return createVector(0, 0);
		}
	}
}