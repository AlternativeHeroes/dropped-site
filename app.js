// require leaflet.js
var L = require('leaflet');
// require firebase
var Firebase = require('firebase');

// path to leaflet images folder
L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

var map = initMap(initPoints);

function initMap(callback) {
  // function to initialize the map
  function gogo (map, loc) {
    if (!loc) { loc = [33.776508, -84.397352]; }
    map = L.map('map').setView(loc, 18);

    var attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">MapBox</a>';
    var tiles = 'http://{s}.tiles.mapbox.com/v3/alternativeheroes.je8e089a/{z}/{x}/{y}.png';

    L.tileLayer(tiles, {
      maxZoom: 23,
      attribution: attribution
    }).addTo(map);
    callback(map);
  }

  var map;
  // initialize leaflet with current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos){
      map = gogo(map, [pos.coords.latitude, pos.coords.longitude]);
    });
  } else {
    map = gogo(map);
  }
  return map;
}

function initPoints(map) {
  var ref = new Firebase('https://shining-fire-2142.firebaseio.com/');

  ref.on('value', firstUpdate, function (errorObject) {
    console.log('The read failed: ' + errorObject.code);
  });


  function firstUpdate(snapshot) {
    console.log(snapshot.val());
    var data = snapshot.val();
    for (var users in data) {
      var user = data[users];
      for (var time in user) {
        addPoint(user[time])
      }
    }
  }

  function addPoint (point) {
    var marker = L.marker([point.latitude, point.longitude]);
    marker.addTo(map);
  }
}
