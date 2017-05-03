function RandomStrategy(populationList, numPop, crossoverRate, mutationRate, generationGap, numCities) {
	"use strict";

	this.populationList = populationList.slice(0);
	this.numPop = numPop;
	this.crossoverRate = crossoverRate * 0.01;
	this.mutationRate = mutationRate * 0.01;
	this.numCities = numCities;
	this.numElite = this.numPop * generationGap * 0.01;
	this.optimalRoute = null;
	this.optimalValue = Infinity;
	this.overallBestFitness = Infinity;

	this.runGA = function() {
		this.calculateOptimal();
		this.calculateBestEver();
		this.generatePopulation();
	};

	this.calculateOptimal = function() {
		var fitnessValue = 0.0;
		for (var i = 0, l = this.populationList.length; i < l; ++i) {
			fitnessValue = this.populationList[i].calculateFitness();
			if (fitnessValue < this.optimalValue) {
				var route = new Route([], false);
				route.copyRoute(this.populationList[i]);
				this.optimalRoute = Object.assign({}, route);
				this.optimalValue = fitnessValue;
			}
		}
	};

	this.calculateBestEver = function() {
		var currentBestFitness = this.optimalValue;
		if (currentBestFitness < this.overallBestFitness) {
			this.overallBestFitness = currentBestFitness;
		}
	};

	this.generatePopulation = function() {
		var newPopulationList = [];

		while (newPopulationList.length < this.numPop) {
			var parentA = [];
			var parentB = [];
			var child = [];

			// Randomly select two parents from the population
			var randA = Math.floor(random(this.numPop));
			var randB = Math.floor(random(this.numPop));

			parentA = this.populationList[randA].chromosome.slice(0);
			parentB = this.populationList[randB].chromosome.slice(0);

			var cProb = Math.random();
			var mRand = Math.random();

			// Crossover, if applicable
			if (this.crossoverRate > cProb) {
				child = this.crossover(parentA, parentB).slice(0);

				// if you are crossing over, mutate
				// Mutate, if applicable
				if (this.mutationRate > mRand) {
					this.mutate(child);
				}
				// Populate the ArrayList newPopulation
				// with the offspring
				var newRoute = new Route(child, false);
				newPopulationList.push(newRoute);
			}
		}

		var nextPopulationList = newPopulationList.slice(0);

		// Apply elitism if required; sort hashmaps by value
		if (this.numElite > 0) {
			this.populationList = this.createEliteList(nextPopulationList).slice(0);
		} else {
			// else, if no elitism applied, carry new population over as is
		this.populationList = newPopulationList.slice(0);
		 }
	};

	this.createEliteList = function(nextPopulationList) {
		nextPopulationList.sort(function(a, b) {
			return parseFloat(a.calculateFitness()) - parseFloat(b.calculateFitness());
		});

		this.populationList.sort(function(a, b) {
			return parseFloat(a.calculateFitness()) - parseFloat(b.calculateFitness());
		}).reverse();

		var eliteList = this.populationList.slice(0);

		for (var i = 0; i < this.numElite; ++i) {
			eliteList[i] = nextPopulationList[i];
		}
		return eliteList;
	};

	this.crossover = function(parentA, parentB) {
		var end = [];
		var rand = Math.floor(random(this.numCities));
		var child = [];

		// Copy over first part of the chromosome
		for (var i = 0; i < rand; ++i) {
			child.push(parentA[i]);
		}

		// Copy over second part of the chromosome
		for (var i = rand, l = parentA.length; i < l; ++i) {
			end.push(parentA[i]);
		}

		var nums = [];

		// get index values
		for (var i = 0; i < end.length; ++i) {
			var x = end[i];
			for (var j = 0; j < parentB.length; ++j) {
				if (x.name === parentB[j].name) {
					nums[i] = j;
				}
			}
		}

		nums.sort();
		var res = [];

		for (var i = 0, l = nums.length; i < l; ++i) {
			res.push(parentB[nums[i]]);
		}

		// concatenate the two parts
		return child.concat(res);
	};

	 this.mutate = function(path) {
		var rand1 = Math.floor(random(numCities));
		var rand2 = Math.floor(random(numCities));
		this._swap(path, rand1, rand2);
	};

	this.getBestSolution = function() {
		return this.optimalRoute.chromosome;
	};


	// ------------------------------------------------
	// Internal methods
	// ------------------------------------------------

	this._swap = function(list, x, y) {
		var b = list[x];
		list[x] = list[y];
		list[y] = b;
	};
}