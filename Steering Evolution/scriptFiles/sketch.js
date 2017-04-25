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

		return sketch;

	});

