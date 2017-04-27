define(["../libraries/p5", "./p5.dom"],
	function(p5) {
		"use strict";

		var sketch = {};
		sketch.p = new p5(function(p) {

		});

		// Shared global variables
		sketch.debug = true;
		sketch.healthValue = 0;
		sketch.margin = 50;
		sketch.numFood= 0;
		sketch.numPoison = 0;
		sketch.numBoids = 0;
		sketch.start = new Date();
		sketch.gameOver = false;

		return sketch;

	});

