// path to leaflet images folder
// L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

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
      console.log(map);
    });
  } else {
    map = gogo(map);
  }
  return map;
}


function initPoints(map) {
  var ref = new Firebase('https://shining-fire-2142.firebaseio.com/');

  ref.on('value', update, function (errorObject) {
    console.log('The read failed: ' + errorObject.code);
  });

  function update(snapshot) {
    var data = snapshot.val();
    for (var user in data) {
      if (!newestIndeces[user]) {
        newestIndeces[user] = 0;
      }
      var i = 0;
      for(var drop in data[user]){
        if (i >= newestIndeces[user]) {
          addPoint(data[user][drop], "#"+user.substring(0,6));
        }
        i++;
      }
      newestIndeces[user] = i;
    }
  }

  function addPoint (point, color) {
    console.log("New point! " + color);
    color = color || "blue";
    var marker = L.circleMarker([point.latitude, point.longitude],
      {'fillOpacity': .5, 'fillColor': color, 'color': 'darkgray', 'radius': 20});
    marker.addTo(map);
  }
}
