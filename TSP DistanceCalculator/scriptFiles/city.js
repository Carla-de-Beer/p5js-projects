function City(lon, lat, name) {
	"use strict";

	this.lon = lon;
	this.lat = lat;
	this.name = name;

	this.copyCity = function(other) {
		if (other instanceof City) {
			this.lon = other.lon;
			this.lat = other.lat;
			this.name = other.name;
		}
	}

}