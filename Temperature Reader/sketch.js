// Carla de Beer
// November 2016
// Temperature reader for various cities.

var weather;
var apiURL = "";
var api = "http://api.openweathermap.org/data/2.5/forecast/city?q=";
var city = "London";
var units = "&units=metric";
var apiKEY = "&APPID=9e8ce0f88e33cfe869e32d5ea5509db3";
var height;
var width;

var arrayX1 = [];
var arrayY1 = [];
var arrayX2 = [];
var arrayY2 = [];

var arrayDate = [];
var arrayTxt = [60, 190, 320, 450, 580];

var days = {
	Mon: "Monday",
	Tue: "Tuesday",
	Wed: "Wednesday",
	Thu: "Thursday",
	Fri: "Friday",
	Sat: "Saturday",
	Sun: "Sunday"
};

var button;
var input;

function setup() {
	createCanvas(1050, 750);
	apiURL = api + city + units + apiKEY;
	loadJSON(apiURL, gotData);
	setHeight();
	setWidth();

}

function setWidth() {
	width = 300;
}

function setHeight() {
	height = 60;
}

function incrementWidth() {
	width += 90;
}

function incrementHeight() {
	height += 130;
}

function gotData(data) {
	weather = data;
}

function getWeatherData() {
	var selectValue = document.getElementById("selectID");
	city = encodeURI(selectValue.value);
	apiURL = api + city + units + apiKEY;

	(function() {

		loadJSON(apiURL, gotData);

		setHeight();
		setWidth();

		arrayX1 = [];
		arrayY1 = [];
		arrayX2 = [];
		arrayY2 = [];

		loop();

	})();

}

function draw() {

	background(51);

	var j = 0;

	if (weather) {

		for (var i = 0; i < weather.list.length; ++i) {
			if (i % 8 === 1) {
				arrayDate.push(weather.list[i].dt_txt.substring(0, 10));
			}
		}

		//arrayDate.print();
		//console.log(weather.list.length);

		var remainder = weather.list.length % 8;

		for (var i = 0; i < remainder; ++i) {

			var temp = weather.list[i].main.temp;

			var r = map(temp, -50, 50, 100, 255);
			var g = map(temp, -50, 50, 10, 200);
			var b = map(temp, -50, 50, 5, 200);

			fill(r , 200 - g, 200 - b);
			noStroke();

			if (i % remainder === 0) {
				height += 80;
				setWidth();
			}

			var size = map(temp, -50, 50, 5, 50);
			var mappedTemp = map(temp, -50, 50, -20, 20);
			var h = height - 80 - mappedTemp;

			ellipse(width, h, size, size);

			// stroke(200);
			// line(0, height, 1100, height);
			// noStroke();

			fill(r , 200 - g, 200 - b);
			text(Math.round(temp * 10) / 10 + "˚C", width - 16, h + 36);

			fill(200);
			var time = weather.list[i].dt_txt.substring(11, 16);
			text(time, width - 16, h - 24);

			fill(180);
			if (i % remainder === 0) {
				getDate(arrayDate[0], arrayTxt[0]);
			}

			arrayX1.push(width);
			arrayY1.push(h);

			incrementWidth();
		}

		if (remainder !== 0) {
			height = 240;
			width = 300;
		} else {
			setHeight();
			setWidth();
			j = 0;
		}

		for (var i = remainder; i < weather.list.length; ++i) {

			var temp = weather.list[i].main.temp;
			//console.log(temp);

			var r = map(temp, -50, 50, 100, 255);
			var g = map(temp, -50, 50, 10, 255);
			var b = map(temp, -50, 50, 10, 255);

			//console.log(r);

			fill(r , 200 - g,  255 - b);
			noStroke();

			if (remainder !== 0) {
				if (i === 8 + remainder) {
					incrementHeight();
					setWidth();
				} else if (i > (8 + remainder) && i % (8 * 2 + remainder) === 0) {
					incrementHeight();
					setWidth();
				} else if (i > (8 + remainder) && i % (8 * 3 + remainder) === 0) {
					incrementHeight();
					setWidth();
				}
			} else if (remainder === 0) {
				if (i % 8 === 0) {
					incrementHeight();
					setWidth();
				}
			}

			var size = map(temp, -50, 50, 5, 50);
			var mappedTemp = map(temp, -50, 50, -20, 20);
			var h = height - 70 - mappedTemp;

			ellipse(width, h, size, size);
			fill(r , 200 - g, 200 - b);
			text(Math.round(temp * 10) / 10 + "˚C", width - 16, h - 24);

			// if (i <= weather.list.length ) {
			// 	stroke(200);
			// 	line(0,  height - 150, 1100, height - 150);
			// 	noStroke();
			// }

			fill(200);
			var time = weather.list[i].dt_txt.substring(11, 16);
			text(time, width - 16, h - 44);

			fill(180);

			if (remainder !== 0) {
				if (i === 8 + remainder) {
					getDate(arrayDate[j], arrayTxt[j]);
				} else if (i > (8 + remainder) && i % (8 * 2 + remainder) === 0) {
					getDate(arrayDate[j], arrayTxt[j]);
				} else if (i > (8 + remainder) && i % (8 * 3 + remainder) === 0) {
					getDate(arrayDate[j], arrayTxt[j]);
				} else if (i > (8 + remainder) && i ==  weather.list.length- 1) {
					getDate(arrayDate[j], arrayTxt[j]);
				}
			} else if (remainder === 0) {
				if (i % 8 === 0) {
					getDate(arrayDate[j], arrayTxt[j]);
				}
			}

			arrayX2.push(width);
			arrayY2.push(h);

			incrementWidth();

		}

		stroke(80);

		for (var i = 0; i < arrayX1.length - 1; ++i) {
			line(arrayX1[i], arrayY1[i], arrayX1[i + 1], arrayY1[i + 1]);
		}

		for (var i = 0; i < arrayX2.length - 1; ++i) {
			if (i !== 7 && i !== 15 && i !== 23 && i !== 31) {
				line(arrayX2[i], arrayY2[i], arrayX2[i + 1], arrayY2[i + 1]);
			}
		}

		noLoop();

	}

	function getDate(indexDate, indexText) {
		var date = new Date(indexDate);
		var dd = date.toString().substring(4, 15);
		var day = date.toString().substring(0, 3);
		textSize(18);
		text(days[day], 80, indexText + 30);
		textSize(12);
		text(dd, 80, indexText + 50);
		j++;
	}

	Array.prototype.print = function() {
		for(var i = 0; i < this.length; ++i) {
			console.log(this[i]);
		}
	}
}