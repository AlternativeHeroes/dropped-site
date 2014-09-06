// require leaflet.js
var L = require('leaflet');

// path to leaflet images folder
L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

// function to initialize the map
function initMap(loc) {
  if (!loc) { loc = [33.776508, -84.397352]; }
  var map = L.map('map');
  map.setView(loc, 11);

  var attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">MapBox</a>';

  var tiles = 'http://{s}.tiles.mapbox.com/v3/alternativeheroes.je8e089a/{z}/{x}/{y}.png';

  L.tileLayer(tiles, {
    maxZoom: 18,
    attribution: attribution
  }).addTo(map);

}


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(pos){
    initMap([pos.coords.latitude, pos.coords.longitude]);
  });
} else {
  initMap();
}
