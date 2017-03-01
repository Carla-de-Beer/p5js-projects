function Symbol(x, y, speed, first) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.switchInterval = round(random(2, 10));
	this.first = first;

	this.setToRandomSymbol = function() {
		if (frameCount % this.switchInterval === 0) {
			var charValue = round(random(0, 192));
			//this.value = String.fromCharCode(0x30A0 + round(random(0, 96))); 	// Katakana
			//this.value = String.fromCharCode(0x0400 + round(random(0, 256))); // Cyrillic
			//this.value = String.fromCharCode(0x0600 + round(random(0, 255))); // Arabic
			//this.value = String.fromCharCode(0x2190 + round(random(0, 112))); // Arrows
			this.value = String.fromCharCode(0x2700 + charValue); 	    		// Dingbats
			charValue === 118 || charValue === 119 || charValue === 120 || charValue === 121 || charValue === 122 ||
			charValue === 123 || charValue === 124 || charValue === 125 || charValue === 126 || charValue === 127 ||
			charValue === 138 || charValue === 139 || charValue === 140 || charValue === 141 || charValue === 142 ||
			charValue === 143 || charValue === 144 || charValue === 145 || charValue === 146 || charValue === 147
				? this.special = true : this.special = false;
		}
	};

	this.rain = function() {
		this.y = (this.y >= height) ? 0 : this.y += this.speed;
	};
}