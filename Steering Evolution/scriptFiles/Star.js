define(["sketch", "../libraries/p5"],
	function(Sketch, p5) {
		"use strict";

		return p5.Star = function(x, y, radius1, radius2, nPoints) {
			var p = Sketch.p;

			this.x = x;
			this.y = y;
			this.radius1 = radius1;
			this.radius2 = radius2;
			this.nPoints = nPoints;

			var angle = p.TWO_PI / this.nPoints;
			var halfAngle = angle * 0.5;

			this.show = function() {
				var p = Sketch.p;

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
