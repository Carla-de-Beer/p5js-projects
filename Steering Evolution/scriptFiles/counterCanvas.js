define(["sketch", "../libraries/p5", "./p5.dom"],
	function(sketch, p5) {
		"use strict";

		new p5(function(p) {
			var textCol;

			p.setup = function() {
				var canvas = p.createCanvas(270, 80);
				canvas.position(40, 630);
				textCol = p.color(255, 220);
			};

			p.draw = function() {
				p.background(220, 65, 65);
				p.fill(textCol);
				p.noStroke();
				p.textFont("Courier");
				p.textSize(11);
				p.text("Fittest boid's health value: " + sketch.healthValue, 22, p.height * 0.5 + 5);
			};

		}, null);

	});