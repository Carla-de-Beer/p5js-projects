define(["sketch", "../libraries/p5"],
	function(sketch, p5) {
		"use strict";

		var p = sketch.p;

		return p5.Star = function(x, y, radius1, radius2, nPoints) {
			this.x = x;
			this.y = y;
			this.radius1 = radius1;
			this.radius2 = radius2;
			this.nPoints = nPoints;

			var angle = p.TWO_PI / this.nPoints;
			var halfAngle = angle * 0.5;

			this.show = function() {
				p.noStroke();
				p.fill(255, 0, 0);
				p.beginShape();
				for (var a = 0; a < p.TWO_PI; a += angle) {
					var sx = x + Math.cos(a) * this.radius2;
					var sy = y + Math.sin(a) * this.radius2;
					p.vertex(sx, sy);
					sx = x + Math.cos(a + halfAngle) * this.radius1;
					sy = y + Math.sin(a + halfAngle) * this.radius1;
					p.vertex(sx, sy);
				}
				p.endShape(p.CLOSE);
			}
		}

	});
