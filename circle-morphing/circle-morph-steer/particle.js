
class Particle {
  constructor(pos, node) {
    this.pos = pos;
    this.acc = new p5.Vector(0, 0);
    this.vel = new p5.Vector(0, 0);
		this.node = node;
  }

  run() {
    // Update velocity
    this.vel.add(this.acc);
    // Limit speed
    this.vel.limit(MAX_SPEED);
    this.pos.add(this.vel);
    // Reset accelertion to 0 each cycle
    this.acc.mult(0);
  }

  drawParticle() {
    noStroke();
    fill(255, 65, 65);
    ellipse(this.pos.x, this.pos.y, 4);
		noFill();
  }

  arrive(target) {
    this.acc.add(this.steer(target, true));
  }

  // A method that calculates a steering vector towards a target
  // Takes a second argument, if true, it slows down as it approaches the target
  steer(target, slowdown) {
    let steer;
    let desired = p5.Vector.sub(target, this.pos);  // A vector pointing from the location to the target
    let d = desired.mag(); // Distance from the target is the magnitude of the vector
    // If the distance is greater than 0, calc steering (otherwise return zero vector)
    if (d > 0) {
      desired.normalize();
      if ((slowdown) && (d < 100.0)) {
        desired.mult(MAX_SPEED*(d/100.0)); // This damping is somewhat arbitrary
      } else {
        desired.mult(MAX_SPEED);
      }
      steer = p5.Vector.sub(desired, this.vel);
      steer.limit(MAX_FORCE);  // Limit to maximum steering force
    } else {
      steer = new p5.Vector(0, 0);
    }
    return steer;
  }
}
