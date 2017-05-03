function Route(path, isShuffle) {
	"use strict";

	this.chromosome = path.slice(0);
	this.fitness = 0;
	this.normFitness = 0;

	if (isShuffle) {
		var currentIndex = this.chromosome.length, temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = this.chromosome[currentIndex];
			this.chromosome[currentIndex] = this.chromosome[randomIndex];
			this.chromosome[randomIndex] = temporaryValue;
		}
	}

	// Copy constructor equivalent
	this.copyRoute = function(other) {
		if (other instanceof Route) {
			this.chromosome = other.chromosome.slice(0);
			this.fitness = other.fitness;
			this.normFitness = other.normFitness;
		}
	};

	this.calculateFitness = function() {
		return this.sumDistance(this.chromosome);
	};

	this.sumDistance = function(path) {
		var sum = 0.0;
		for (var i = 0, l = path.length - 1; i < l; ++i) {
			var a = path[i];
			var b = path[i + 1];
			sum += this._distSq(a.lon, a.lat, b.lon, b.lat);
		}
		return sum;
	};


	// ------------------------------------------------
	// Internal methods
	// ------------------------------------------------

	this._distSq = function(x1, y1, x2, y2) {
		return ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
	};

}