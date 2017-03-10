define(["sketch"],
	function(sketch) {
		"use strict";

		sketch.Bubble = function () {
			var p = sketch.p;
			this.x = p.random(50, p.width - 50);
			this.y = p.random(50, p.height - 50);
			this.r = p.random(50, 255);
			this.g = p.random(100);
			this.b = p.random(100, 255);
			this.size = p.random(5, 25);
		};

		sketch.Bubble.prototype.draw = function () {
			var p = sketch.p;
			p.noStroke();
			p.fill(this.r, this.g, this.b, 150);
			p.ellipse(this.x, this.y, this.size, this.size);
		};

		sketch.Bubble.prototype.move = function () {
			var p = sketch.p;
			this.x = this.x + p.random(-2, 2);
			this.y = this.y + p.random(-2, 2);
		};

		sketch.Bubble.prototype.print = function() {
			console.log("x: " + this.x);
			console.log("y: " + this.y);
		};

		return sketch.Bubble;

});