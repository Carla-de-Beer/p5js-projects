define(["variables", "sketch", "../libraries/p5", "./p5.dom"],
	function(variables, sketch, p5) {
		"use strict";

		var legendNode = document.getElementById("counter");

		new p5(function(p) {
			var textCol;

			p.setup = function() {
				var myCanvas = p.createCanvas(270, 80);
				myCanvas.position(40, 630);
				textCol = p.color(255, 220);
			};

			p.draw = function() {
				p.background(250, 64, 64);
				p.fill(textCol);
				p.noStroke();
				p.text("Fittest boid's health value: " + variables.healthValue, 45, p.height * 0.5 + 5);
			};

		}, legendNode);

	});