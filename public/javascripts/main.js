console.log('HIHIHIHI');
// var Firebase = require('firebase');
jQuery.getScript('http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js');

// initializes Leaflet Map centered on param loc.
// loc defaults to Gatech
function initMap (loc) {
  if (!loc) { loc = [33.776508, -84.397352]; }
  var map = L.map('map').setView(loc, 13);
  L.tileLayer('http://{s}.tiles.mapbox.com/v3/alternativeheroes.je8e089a/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
  }).addTo(map);
}

// gets the current location (if possible) and initializes the Leaflet map.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(pos){
    initMap([pos.coords.latitude, pos.coords.longitude]);
  });
} else {
  initMap();
}
