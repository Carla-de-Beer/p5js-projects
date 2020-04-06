function Symbol(x, y, speed, first) {
	"use strict";

	this.x = x;
	this.y = y;
	this.speed = speed;
	this.switchInterval = round(random(2, 10));
	this.first = first;

	this.setToRandomSymbol = function() {
		if (frameCount % this.switchInterval === 0) {
			//this.value = String.fromCharCode(0x30A0 + round(random(0, 96))); 	// Katakana
			//this.value = String.fromCharCode(0x0400 + round(random(0, 256))); // Cyrillic
			//this.value = String.fromCharCode(0x0600 + round(random(0, 255))); // Arabic
			//this.value = String.fromCharCode(0x2190 + round(random(0, 112))); // Arrows

			var charValue = round(random(0, 192));
			this.value = String.fromCharCode(0x2700 + charValue); 	    		// Dingbats

			// Highlight the solid fill number values in a reddish colour
			charValue >= 118 && charValue <= 127 || charValue >= 138 && charValue <= 147
				? this.special = true : this.special = false;
		}
	};

	this.rain = function() {
		this.y = (this.y >= height) ? 0 : this.y += this.speed;
	};
}