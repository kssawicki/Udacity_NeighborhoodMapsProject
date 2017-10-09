'use strict';

// Information about the places these dogs live
    var locations = [
    {title: 'Ziggy', location: {lat: 39.5050151, lng: -119.812267}},
    {title: 'Pogo', location: {lat: 39.533983, lng: -119.878318}},
    {title: 'Frank & Oreo', location: {lat: 39.419104, lng: -119.772268}},
    {title: 'Valentina', location: {lat: 39.512546, lng: -119.813448}},
    {title: 'Milo', location: {lat: 39.504568, lng: -119.809846}},
    {title: 'Kimbo', location: {lat: 39.576616, lng: -119.824863}},

];

// Initializing map
var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 39.530895, lng: -119.814972},
		zoom: 14
	});

// Markers and infowindows
var infowindow = new google.maps.InfoWindow();

// Create a new blank array for all the markers
var markers = [];

 // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
          // Create a marker per location, and put into markers array.
           var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
          });
          // Push the marker to our array of markers.
          markers.push(marker);
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
        }
        document.getElementById('show-dogs').addEventListener('click', show-dogs);
        document.getElementById('hide-dogs').addEventListener('click', hide-dogs);
      }

       // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      }

      // This function will loop through the markers array and display them all.
      function showListings() {
        var bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
      }
      // This function will loop through the listings and hide them all.
      function hideListings() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
      }


