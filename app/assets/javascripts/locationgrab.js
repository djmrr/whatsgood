if (navigator.geolocation) {
 var timeoutVal = 10 * 1000 * 1000;
 navigator.geolocation.getCurrentPosition(
   displayPosition, 
   displayError,
   { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
 );
} else {
 alert("Geolocation is not supported by this browser");
}

function displayPosition(position) {
 alert("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
}


function displayError(error) {
 var errors = { 
   1: 'Permission denied',
   2: 'Position unavailable',
   3: 'Request timeout'
 };
 alert("Error: " + errors[error.code]);
}

function locationNation(position) {
  var grabbedLat = position.coords.latitude;
  var grabbedLon = position.coords.longitude;
  document.cookie = 'sconsnaggedLat='+grabbedLat+'; expires=Wed, 1 Jan 2070 13:47:11 UTC; path=/static_pages/'
  document.cookie = 'sconsnaggedLon='+grabbedLon+'; expires=Wed, 1 Jan 2070 13:47:11 UTC; path=/static_pages/'
}

