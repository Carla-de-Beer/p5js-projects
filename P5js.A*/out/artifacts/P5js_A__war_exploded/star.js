function Star(x, y, radius1, radius2, npoints) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.radius1 = radius1;
	this.radius2 = radius2;
	this.npoints = npoints;

	var angle = TWO_PI / this.npoints;
	var halfAngle = angle/2.0;

	this.show = function(col) {
		noStroke();
		fill(col);
		beginShape();
		for (var a = 0; a < TWO_PI; a += angle) {
			var sx = x + cos(a) * this.radius2;
			var sy = y + sin(a) * this.radius2;
			vertex(sx, sy);
			sx = x + cos(a + halfAngle) * this.radius1;
			sy = y + sin(a + halfAngle) * this.radius1;
			vertex(sx, sy);
		}
		endShape(CLOSE);
	}
}

