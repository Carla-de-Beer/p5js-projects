// Carla de Beer
// Created: May 2017
// Genetic algorithm to find an optimised solution to the Travelling Salesman Problem.
// The sketch dynamically reads in city data from a file and calculates the shortest distance it can find, linking all cities.
// The actual physical distance on the route, calculated as the Haversine distance, is also shown.
// Specifiable parameters: crossover rate, mutation rate, popuation size, max. no. iterations, elitism generation gap.
// City data obtained from: https://gist.github.com/Miserlou/c5cd8364bf9b2420bb29
// The crossover strategy makes use of Modified Order Crossover (MOX), as described in:
// http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.91.9167&rep=rep1&type=pdf
// Haversine distance formula:
// http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
// Map from MapBox; https://www.mapbox.com/api-documentation/#retrieve-a-sprite-image-or-json

var numCities;
var generation = 0;
var maxGeneration = 350;
var numPop = 3000;
var crossoverRate = 85.0;
var mutationRate = 25.0;
var generationGap = 25.0;
var sumHaversine = 0.0;
var converge = 0;
var randomStrategy;

var minLon, maxLon, minLat, maxLat;
var lonList = [],latList = [], nameList = [];
var tmpLon = [], tmpLat = [];
var pitch = 0;
var clat = 38.27;
var clon = -101.7431;
var zoom = 3.45;

var path = [], pathTrue = [];
var populationList = [];
var record = 0.0;

var mapImage;
var imageWidth = 512 * 2, imageHeight = 512;
//var imageWidth = 512 * 2.5, imageHeight = 512 * 1.25;
var cityData = [];

function preload() {
	loadJSON("sourceFiles/cities.json", gotData);

	// Load the map
	mapImage = loadImage("https://api.mapbox.com/styles/v1/mapbox/light-v9/static/" +
		clon + "," + clat + "," + zoom + "," + pitch + "/" + imageWidth + "x" + imageHeight +
		"?access_token=pk.eyJ1IjoiY2FkZWJlIiwiYSI6ImNqMDNvOWU5YzAwYXIzMm55YTNyMGtoNzcifQ.B7Y5DHMKO6o8tj2woXVxQw");
}

function gotData(data) {
	cityData = data;
	numCities = data.length;

	var header2 = document.getElementById("header2");
	header2.innerText = "Travelling to the " + numCities + " largest cities in the US";

	parse(data, lonList, latList, nameList);

	for (var i = 0; i < latList.length; ++i) {
		tmpLon.push(lonList[i]);
		tmpLat.push(latList[i]);
	}

	init();
}

function setup() {
	createCanvas(imageWidth, imageHeight);
}

function draw() {
	translate(width * 0.5, height * 0.5);
	imageMode(CENTER);
	image(mapImage, 0, 0);
	fill(255, 0, 0);
  	noStroke();

	// Run GA
	randomStrategy.runGA();
	generation++;

	if (Math.abs(record - randomStrategy.optimalValue) > 0.00001) {
		converge = generation;
	}

	record = randomStrategy.optimalValue;

	// Draw route
	beginShape();
	noFill();
	stroke(255, 64, 64, 200);
	strokeWeight(2);
	for (var i = 0, l = randomStrategy.getBestSolution().length; i < l; ++i) {
		stroke(255, 64, 64, 200);
		vertex(randomStrategy.getBestSolution()[i].lon, randomStrategy.getBestSolution()[i].lat);
	}
	endShape();

	// Draw city dots
	var cx = webMercatorX(clon);
	var cy = webMercatorY(clat);

	for (var i = 0; i < cityData.length; ++i) {
		var lon = cityData[i].longitude;
		var lat = cityData[i].latitude;

		var x = webMercatorX(lon) - cx;
		var y = webMercatorY(lat) - cy;
		strokeWeight(1);
		fill(250, 170);
		ellipse(x, y, 8, 8);
	}

	// Calculate the Haversine distance
	var bestArray = randomStrategy.optimalRoute.chromosome.slice(0);
	var bestTrue = [];

	// Fill the bestTrue array with the true coordinate values,
	// and in the sequence of the most optimal route
	for (var i = 0; i < bestArray.length; ++i) {
		for (var j = 0; j < bestArray.length; ++j) {
			if (bestArray[i].name === pathTrue[j].name) {
				var city = new City(0, 0, "");
				city.copyCity(pathTrue[j]);
				bestTrue.push(city);
			}
		}
	}

	noStroke();
	fill(80, 200);
	for (var i = 0; i < numCities - 1; ++i) {
		sumHaversine += haversine(bestTrue[i].lon, bestTrue[i + 1].lon, bestTrue[i].lat, bestTrue[i + 1].lat);
	}

	//console.log(numberWithCommas(sumHaversine.toFixed(3)));
	printResults(sumHaversine);

	sumHaversine = 0.0;

	if (generation >= maxGeneration) {
		fill(80, 200);
		textStyle(ITALIC);
		text("Max. number of iterations reached", -4855, -230);
		noLoop();
	}
}

function parse(data, list1, list2, list3) {
	for (var i = 0, l = data.length; i < l; ++i) {
		var lon = data[i].longitude;
		var lat = data[i].latitude;
		var name = data[i].city;
		list1.push(lon);
		list2.push(lat);
		list3.push(name);
	}
}

function init() {
	tmpLon.sort();
	tmpLat.sort();

	maxLon = tmpLon[0];
	minLon = tmpLon[tmpLon.length - 1];
	maxLat = tmpLat[0];
	minLat = tmpLat[tmpLat.length - 1];

	for (var i = 0; i < latList.length; ++i) {
		var cx = webMercatorX(clon);
		var cy = webMercatorY(clat);
		var x = webMercatorX(lonList[i]) - cx;
		var y = webMercatorY(latList[i]) - cy;
		path.push(new City(x, y, nameList[i]));
		pathTrue.push(new City(lonList[i], latList[i], nameList[i]));
	}

	populationList = [];
	for (var i = 0; i < numPop; ++i) {
		populationList.push(new Route(path, true));
	}

	randomStrategy = new RandomStrategy(populationList, numPop, crossoverRate, mutationRate, generationGap, numCities);
}

function haversine(lon1, lon2, lat1, lat2) {
	var p = 0.017453292519943295;
	var a = 0.5 - Math.cos((lat2 - lat1) * p) * 0.5
		+ Math.cos(lat1 * p) * Math.cos(lat2 * p) * (1 - Math.cos((lon2 - lon1) * p)) * 0.5;
	return 12742 * Math.asin(Math.sqrt(a));
}

function printResults(haversineDistance) {
	var offset = -485;
	var indent = -480;
	var top = 40;

	textStyle(NORMAL);
	haversineDistance = numberWithCommas(haversineDistance.toFixed(3));
	text("Genetic Algorithm Parameters:", offset, top + 20);
	text("*  Generations: " + numberWithCommas(generation), indent, top + 40);
	text("*  Population size: " + numberWithCommas(numPop) + " individuals", indent, top + 60);
	text("*  Crossover rate: " + crossoverRate + "%", indent, top + 80);
	text("*  Mutation rate: " + mutationRate + "%", indent, top + 100);
	text("*  Elitism generation gap: " + numberWithCommas(randomStrategy.numElite) +
		" individuals", indent, top + 120);
	textStyle(BOLD);
	text("Convergence at generation: " + converge, offset, top + 160);
	text("Total distance travelled: " + haversineDistance + " km (Haversine distance)", offset, top + 180);
	textStyle(NORMAL);
}

function numberWithCommas(value) {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function webMercatorX(lon) {
	lon = radians(lon);
	var a = (256 / Math.PI) * Math.pow(2, zoom);
	var b = lon + Math.PI;
	return a * b;
}

function webMercatorY(lat) {
	lat = radians(lat);
	var a = (256 / Math.PI) * Math.pow(2, zoom);
	var b = Math.tan(Math.PI * 0.25 + lat * 0.5);
	var c = Math.PI - Math.log(b);
	return a * c;
}