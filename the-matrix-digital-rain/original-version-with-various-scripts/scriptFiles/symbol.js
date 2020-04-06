function Symbol(x, y, speed, first) {
  "use strict";

  this.x = x;
  this.y = y;
  this.speed = speed;
  this.switchInterval = round(random(2, 10));
  this.first = first;

  this.setToRandomSymbol = function() {
    if (frameCount % this.switchInterval === 0) {
      // Katakana: 0x30A0
      // Cyrillic: 0x0400
      // Hangul: 0x1100
      this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
    }
  };

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  };
}