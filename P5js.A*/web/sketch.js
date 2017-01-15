var cols = 50;
var rows = 50;
var grid = new Array(cols);

var closedSet = [];
var openSet = [];
var path = [];
var start, end;
var w, h;
var iter = 0;
var distance = 0;

var starS, starE;
var metric;
var isStart = false;

function init() {
	isStart = true;
	var radios = document.getElementsByName('metric');
	if (radios[0].checked === true) {
		metric = "E";
	} else if (radios[1].checked === true) {
		metric = "M";
	} else if (radios[2].checked === true) {
		metric = "D";
	}
}

function setup() {
	createCanvas(600, 600);
	randomSeed(5);
	//frameRate(1);
	resetSketch();
	// var button = createButton("Reset");
	// button.mousePressed(resetSketch);
}

function draw() {
	if (isStart) {
		// Am I still searching?
		if (openSet.length > 0) {

			// Best next option
			var winner = 0;
			for (var i = 0; i < openSet.length; i++) {
				if (openSet[i].f < openSet[winner].f) {
					winner = i;
				}
			}
			var current = openSet[winner];

			// Did I finish?
			if (current === end) {
				noLoop();
				console.log("Iterations: " + iter);
				console.log("DONE!");
			}

			// Best option moves from openSet to closedSet
			removeFromArray(openSet, current);
			closedSet.push(current);

			// Check all the neighbours
			var neighbours = current.neighbours;
			for (var i = 0; i < neighbours.length; i++) {
				var neighbour = neighbours[i];

				// Valid next spot?
				if (!closedSet.includes(neighbour) && !neighbour.wall) {
					var tempG = current.g + heuristic(neighbour, current);

					// Is this a better path than before?
					var newPath = false;
					if (openSet.includes(neighbour)) {
						if (tempG < neighbour.g) {
							neighbour.g = tempG;
							newPath = true;
						}
					} else {
						neighbour.g = tempG;
						newPath = true;
						openSet.push(neighbour);
					}

					// Yes, it's a better path
					if (newPath) {
						neighbour.h = heuristic(neighbour, end);
						neighbour.f = neighbour.g + neighbour.h;
						neighbour.previous = current;
					}
				}

			}
			// Uh oh, no solution
		} else {
			console.log('No solution');
			noLoop();
			return;
		}

		// Draw current state of everything
		background(255);

		for (var i = 0; i < cols; i++) {
			for (var j = 0; j < rows; j++) {
				grid[i][j].show();
			}
		}

		for (var i = 0; i < closedSet.length; i++) {
			closedSet[i].show(color(255, 0, 0, 50));
		}

		for (var i = 0; i < openSet.length; i++) {
			openSet[i].show(color(0, 255, 0, 50));
		}


		// Find the path by working backwards
		path = [];
		var temp = current;
		path.push(temp);
		while (temp.previous) {
			path.push(temp.previous);
			temp = temp.previous;
		}

		// for (var i = 0; i < path.length; i++) {
		// path[i].show(color(0, 0, 255));
		//}

		// Drawing path as continuous line
		noFill();
		stroke(255, 0, 200);
		strokeWeight(w / 3);
		beginShape();
		for (var i = 0; i < path.length; i++) {
			vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
		}
		endShape();

		iter++;

		/*  for (var i = 0; i < path.length - 1; i++) {
			distance += dist(path[i].i, path[i].j, path[i + 1].i, path[i + 1].j);
		}

		var para = document.getElementById("distance");
		para.innerHTML = "Distance: " + distance.toFixed(3);*/

		var para = document.getElementById("iter");
		para.innerHTML = "Iteration: " + iter;

		starS.show(color(40, 100, 230, 200));
		starE.show(color(40, 100, 230, 200));
	}
}

function resetSketch() {
	w = width / cols;
	h = height / rows;

	starS = new Star(w/2, w/2, w/2, w/4, 5);
	starE = new Star(width - w/2, height - w/2, w/2, w/4, 5);

	for (var i = 0; i < cols; i++) {
		grid[i] = new Array(rows);
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Spot(i, j);
		}
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].addNeighbours(grid);
		}
	}

	start = grid[0][0];
	end = grid[cols - 1][rows - 1];
	start.wall = false;
	end.wall = false;
	openSet.push(start);
}

function removeFromArray(arr, elt) {
	for (var i = arr.length - 1; i >= 0; --i) {
		if (arr[i] === elt) {
			arr.splice(i, 1);
		}
	}
}

function heuristic(a, b) {
	if (metric === "E") {
		return dist(a.i, a.j, b.i, b.j); // Euclidean distance
	}
	else if (metric === "M") {
		return Math.abs(a.i - b.i) + Math.abs(a.j - b.j); // Manhattan metric
	} else if (metric === "D") {
		return 0
	}
}

