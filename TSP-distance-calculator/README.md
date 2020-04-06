# Travelling Salesman Problem: Distance Calculator #

This project demonstrates how a genetic algorithm can be used to find an optimised solution to the Travelling Salesman Problem.
The sketch dynamically reads in city data from a file and calculates the shortest distance it can find, linking all cities.
The actual physical distance on the route, calculated as the Haversine distance, is also shown.
Specifiable parameters: crossover rate, mutation rate, population size, max. no. iterations, elitism generation gap.

This project is the P5js/JavaScript implementation of the [Processing version](https://github.com/Carla-de-Beer/Processing/tree/master/TSP%20Distance%20Calculators/TSP_Distance_Calculator_With_Map) of the same project.

Resources: 
* City data obtained from: https://gist.github.com/Miserlou/c5cd8364bf9b2420bb29
* The crossover strategy makes use of Modified Order Crossover (MOX), as described in:
http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.91.9167&rep=rep1&type=pdf
* Haversine distance formula: 
http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
* Map from MapBox; https://www.mapbox.com/api-documentation/#retrieve-a-sprite-image-or-json

<p align="center">
  <img src="images/screenShot-01.png"/>
</p>

