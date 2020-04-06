// Carla de Beer
// Created: December 2016.
// Example of the use of the P5js library with RequireJS.

require(["sketch", "Bubble", "../libraries/p5"],
  function(sketch, Bubble, p5) {
    "use strict";

    // Testing to see if the Bubble object can be reached outside the p5 namespace below
    var bub1 = new Bubble();
    bub1.print();

    var numBubbles = 150;
    var bubbles = [];
    var main = {};

    // Create the p5 namespace
    main.p = new p5(function(p) {

      p.setup = function() {
        // Need to use the sketch.p values to link the new sketch to the existing one
        var p = sketch.p;
        p.createCanvas(screen.width, screen.height);
        for (var i = 0; i < numBubbles; ++i) {
          bubbles.push(new Bubble());
        }
      };

      p.draw = function() {
        // Need to use the sketch.p values to link the new sketch to the existing one
        var p = sketch.p;
        p.background(255);
        for (var i = 0; i < bubbles.length; ++i) {
          bubbles[i].draw();
          bubbles[i].move();
        }
      };

    });
  });