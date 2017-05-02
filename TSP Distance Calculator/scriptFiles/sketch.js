var minLon, maxLon, minLat, maxLat;
var lonList = [],latList = [], nameList = [];
var tmpLon = [], tmpLat = [];

var numCities = 25;
var generation = 0;
var maxGeneration = 350;
var numPop = 5000;
var crossoverRate = 85.0;
var mutationRate = 25.0;
var generationGap = 25.0;
var sumHaversine = 0.0;
var converge = 0;
var randomStrategy;

var path = [], pathTrue = [];
var populationList = [];
var record = 0.0;

var mapImage;
var imageWidth = 1024, imageHeight = 512;
var cityData = [];

var pitch = 0;
var clat = 36.2672;
var clon = -97.7431;
var zoom = 3;

function preload() {
	loadJSON("sourceFiles/cities.json", gotData);

	// Load the map
	mapImage = loadImage("https://api.mapbox.com/styles/v1/mapbox/light-v9/static/" +
		clon + "," + clat + "," + zoom + "," + pitch + "/" + imageWidth + "x" + imageHeight +
		"?access_token=pk.eyJ1IjoiY2FkZWJlIiwiYSI6ImNqMDNvOWU5YzAwYXIzMm55YTNyMGtoNzcifQ.B7Y5DHMKO6o8tj2woXVxQw");
}

function gotData(data) {
	cityData = data;

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

	console.log(numberWithCommas(sumHaversine.toFixed(3)));
	printResults(sumHaversine);

	sumHaversine = 0.0;

	if (generation >= maxGeneration) {
		fill(255, 64, 64, 200);
		text("Max. number of iterations reached", -485, 40);
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
	var a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
		+ Math.cos(lat1 * p) * Math.cos(lat2 * p) * (1 - Math.cos((lon2 - lon1) * p)) / 2;
	return 12742 * Math.asin(Math.sqrt(a));
}

function printResults(haversineDistance) {
	var offset = -485;
	var indent = -480;
	haversineDistance = numberWithCommas(haversineDistance.toFixed(3));
	text("Genetic Algorithm Parameters:", offset, 70);
	text("*  Generations: " + numberWithCommas(generation), indent, 90);
	text("*  Population size: " + numberWithCommas(numPop) + " individuals", indent, 110);
	text("*  Crossover rate: " + crossoverRate + "%", indent, 130);
	text("*  Mutation rate: " + mutationRate + "%", indent, 150);
	text("*  Elitism generation gap: " + numberWithCommas(randomStrategy.numElite) +
		" individuals", indent, 170);
	text("Convergence at generation: " + converge, offset, 210);
	text("Total distance travelled: " + haversineDistance + " km (Haversine distance)", offset, 230);
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
	var b = Math.tan(Math.PI / 4 + lat / 2);
	var c = Math.PI - Math.log(b);
	return a * c;
}