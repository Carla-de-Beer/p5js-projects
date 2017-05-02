function RandomStrategy(populationList, numPop, crossoverRate, mutationRate, generationGap, numCities) {
	"use strict";

	this.populationList = populationList.slice(0);
	this.numPop = numPop;
	this.crossoverRate = crossoverRate / 100;
	this.mutationRate = mutationRate / 100;
	this.numCities = numCities;
	this.numElite = this.numPop * generationGap / 100;
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
		for (var i = 0; i < this.populationList.length; ++i) {
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
		var nextPopulationList = [];

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

		nextPopulationList = newPopulationList.slice(0);

		// Apply elitism if required; sort hashmaps by value
		// if (numElite > 0) {
		// 	populationList = this.createEliteList(nextPopulationList).slice(0);
		// } else {
		// 	// else, if no elitism applied, carry new population over as is
		this.populationList = newPopulationList.slice(0);
		// }
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
		for (var i = rand; i < parentA.length; ++i) {
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

		for (var i = 0; i < nums.length; ++i) {
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

	this._swap = function(list, x, y) {
		var b = list[x];
		list[x] = list[y];
		list[y] = b;
	};
}