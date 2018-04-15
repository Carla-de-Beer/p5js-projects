function Stream() {
	"use strict";

	this.symbols = [];
	this.totalSymbols = round(random(5, 30));
	this.speed = round(random(3, 10));

	this.generateSymbols = function(x, y) {
		var first = round(random(0, 4)) === 1;
		for(var i = 0; i <= this.totalSymbols; ++i) {
			var symbol = new Symbol(x, y, this.speed, first);
			symbol.setToRandomSymbol();
			this.symbols.push(symbol);
			y -= symbolSize;
			first = false;
		}

		this.render = function() {
			this.symbols.forEach(function(symbol) {
				var r = round(random(10, 100));
				var g = round(random(150, 255));
				var b = round(random(10, 100));
				symbol.first ? fill(200, 255, 200) : fill(r, g, b);
				text(symbol.value, symbol.x, symbol.y);
				symbol.rain();
				symbol.setToRandomSymbol();
			});
		}
	}
}