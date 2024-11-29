let lat = 0
let lng = 0
let radius = 20

// Initialize the map and set the default view
const map = L.map('map').setView([41.9028, 12.4964], 5);

// Add OpenStreetMap tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let marker;

// Add the search control (geocoder) to the map
L.Control.geocoder({
  defaultMarkGeocode: false // Prevent default marker placement
}).on('markgeocode', function (e) {
  const { center } = e.geocode; ì
  map.setView(center, 15);

  if (marker) {
    map.removeLayer(marker);
  }
  marker = L.marker(center).addTo(map);
  lat = center.lat;
  lng = center.lng;
}).addTo(map);

// Add a click event listener to the map
map.on('click', function (e) {
  if (marker) {
    map.removeLayer(marker);
  }
  marker = L.marker(e.latlng).addTo(map);
  lat = e.latlng.lat;
  lng = e.latlng.lng;
});

document.getElementById("radiusBar").oninput = (e) => {
  document.getElementById("radiusValue").textContent = e.target.value
  radius = parseInt(e.target.value)
}

// Search button event listener
document.getElementById("search").onclick = search

function addressToCoords(query, callback) {
  var api_url = 'https://api.opencagedata.com/geocode/v1/json',
    api_key = 'fb54306ef2d0402fa82cd55386e91cb0';
  var request_url = `${api_url}?key=${api_key}&q=${encodeURIComponent(query)}&pretty=1&no_annotations=1`;

  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);
  request.onload = function () {
    if (request.status === 200) {
      var data = JSON.parse(request.responseText);
      if (data.results && data.results.length > 0) {
        var lat = data.results[0].geometry.lat;
        var lon = data.results[0].geometry.lng;
        callback(lat, lon);
      } else {
        callback('No results found');
      }
    } else {
      var errMsg = JSON.parse(request.responseText).status.message;
      callback(`Geocoding error: ${errMsg}`);
    }
  };
  request.onerror = function () { callback("Unable to connect to server"); };
  request.send();
}


// Function to calculate the distance between two coordinates using Haversine formula
function haversineDistance(lat1, lon1, lat2, lon2) {
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  const R = 6371; // Radius of the Earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

async function search() {
  const data = await fetch('data.json').then((e => e.json()));
  const table = document.getElementById("searchResults");
  table.innerHTML = "<tr><th>Nome</th><th>Email</th></tr>"
  for (const person of data) {
    addressToCoords(person.city + " " + person.zip, (p_lan, p_lng) => {
      if (haversineDistance(p_lan, p_lng, lat, lng) < radius) {
        table.innerHTML += `<tr><td>${person.name}</td><td><a href="mailto:${person.email}">${person.email}</a></td></tr>`
      }
    })
  }
  return searchResults;
}




