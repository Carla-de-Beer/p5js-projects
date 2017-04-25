define(["sketch", "Star", "../libraries/p5", "./p5.dom"],
	function(Sketch, Star, p5) {
		"use strict";

		var foodPlus = 0.3;
		var poisonMinus = -0.75;
		var frameMinus = 0.005;
		var foodCol, poisonCol, textCol;
		var legendNode = document.getElementById("legend");

		new p5(function(p) {

			p.setup = function() {
				var myCanvas = p.createCanvas(270, 505);
				myCanvas.position(40, 110);

				foodCol = p.color(0, 255, 0);
				poisonCol = p.color(255, 0, 0);
				textCol = p.color(255, 220);
			};

			p.draw = function() {
				p.background(90);

				var symbolVOffset = 40;
				var symbolHOffset = 30;
				var textOffset = 80;

				// Food
				p.noStroke();
				p.fill(foodCol);
				p.ellipse(symbolHOffset + 7.5, symbolVOffset, 5, 5);

				p.noStroke();
				p.fill(textCol);
				p.text("Food (health + " + foodPlus + ")", textOffset, symbolVOffset + 5);

				// Poison
				p.fill(poisonCol);
				var star = new Star(symbolHOffset + 7.5, symbolVOffset + 40, 1.5, 9, 3);

				star.show();
				p.noStroke();
				p.fill(textCol);
				p.text("Poison (health - " + -1*poisonMinus + ")", textOffset, symbolVOffset + 45);

				// Healthy boid
				p.fill(foodCol);
				p.triangle(symbolHOffset, symbolVOffset + 80, 45, symbolVOffset + 85, symbolHOffset, symbolVOffset + 90);

				p.noStroke();
				p.fill(textCol);
				p.text("Healthy boid", textOffset, symbolVOffset + 90);

				// Dying boid
				p.fill(poisonCol);
				p.triangle(symbolHOffset, symbolVOffset + 130, 45, symbolVOffset + 135, symbolHOffset, symbolVOffset + 140);

				p.noStroke();
				p.fill(textCol);
				p.text("Dying boid", textOffset, symbolVOffset + 140);

				// Food radius
				p.stroke(foodCol);
				p.noFill();
				p.ellipse(symbolHOffset + 7.5, symbolVOffset + 190, 30, 30);

				p.noStroke();
				p.fill(textCol);
				p.text("Food perception radius", textOffset, symbolVOffset + 190 + 5);

				// Poison radius
				p.stroke(poisonCol);
				p.noFill();
				p.ellipse(symbolHOffset + 7.5, symbolVOffset + 240, 30, 30);

				p.noStroke();
				p.fill(textCol);
				p.text("Poison perception radius", textOffset, symbolVOffset + 240 + 5);

				p.fill(textCol);
				p.noStroke();
				p.text("Each boid's health value decreases ", symbolHOffset, symbolVOffset + 300);

				p.fill(textCol);
				p.noStroke();
				p.text(frameMinus + " per frame.", symbolHOffset, symbolVOffset + 320);
			};

			function Star(x, y, radius1, radius2, nPoints) {
				this.x = x;
				this.y = y;
				this.radius1 = radius1;
				this.radius2 = radius2;
				this.nPoints = nPoints;

				var angle = p.TWO_PI / this.nPoints;
				var halfAngle = angle * 0.5;

				this.show = function() {
					p.noStroke();
					p.fill(poisonCol);
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

		}, legendNode);

	});