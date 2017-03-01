// Carla de Beer
// March 2017
// Simulation of The Matrix's Digital Rain.
// Based on Emily Xie's Coding Train video example:
// https://www.youtube.com/watch?v=S1TQCi9axzg

var streams = [];
var symbolSize = 24;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	textSize(symbolSize);

	var x = 0;
	for(var i = 0; i <= width/symbolSize; ++i) {
		var stream = new Stream();
		stream.generateSymbols(x, round(random(-1000, 0)));
		streams.push(stream);
		x += symbolSize;
	}
}

function draw() {
	background(0, 128);
	streams.forEach(function(stream){
		stream.render();
	});
}
