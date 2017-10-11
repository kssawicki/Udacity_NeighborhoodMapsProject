'use strict';

// Information about the places these dogs live

var locations = [{

    title: 'Ziggy',

    description: "This is my dog! She's 6 years old, a border collie-lab mix, and likes to eat anything that has peanut butter (like me!)",

    location: {

      lat: 39.5050151,

      lng: -119.812267,

     }


  },

  {

    title: 'Pogo',

    location: {

      lat: 39.533983,

      lng: -119.878318

    }

  },

  {

    title: 'Frank & Oreo',

    location: {

      lat: 39.419104,

      lng: -119.772268

    }

  },

  {

    title: 'Valentina',

    location: {

      lat: 39.512546,

      lng: -119.813448

    }

  },

  {

    title: 'Milo',

    location: {

      lat: 39.504568,

      lng: -119.809846

    }

  },

  {

    title: 'Kimbo',

    location: {

      lat: 39.576616,

      lng: -119.824863

    }

  },



];



// Initializing map

var map, markers;



function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {

    center: {

      lat: 39.530895,

      lng: -119.814972

    },

    zoom: 14

  });



  // Markers and infowindows

  var largeInfoWindow = new google.maps.InfoWindow();



  // Create a new blank array for all the markers

  markers = [];


  // The following group uses the location array to create an array of markers on initialize.

  for (var i = 0; i < locations.length; i++) {

    // Get the position from the location array.

    var position = locations[i].location;

    var title = locations[i].title;

    // Create a marker per location, and put into markers array.

    var marker = new google.maps.Marker({

      map: map,

      position: position,

      title: title,

      animation: google.maps.Animation.DROP,

      id: i

    });

    // Push the marker to our array of markers.

    markers.push(marker);

    // Create an onclick event to open an infowindow at each marker.

    marker.addListener('click', function() {

      populateInfoWindow(this, largeInfoWindow);

    });

  }

  document.getElementById('show-dogs').addEventListener('click', showDogs);

  document.getElementById('hide-dogs').addEventListener('click', hideDogs);

}



// This function populates the infowindow when the marker is clicked. We'll only allow

// one infowindow which will open at the marker that is clicked, and populate based

// on that markers position.

function populateInfoWindow(marker, infowindow) {

  // Check to make sure the infowindow is not already opened on this marker.

  if (infowindow.marker != marker) {

    infowindow.marker = marker;

    infowindow.setContent('<div><strong>' + marker.title + '</strong><br></div>');

    infowindow.open(map, marker);

    infoWindowContent += '<h4>' + 

    // Make sure the marker property is cleared if the infowindow is closed.

    infowindow.addListener('closeclick', function() {

      infowindow.marker = null;

    });

  }

}

// This function will show all names so that the user will search by the search bar
function searchlist() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('search-box');
    filter = input.value.toUpperCase();
    ul = document.getElementById("dog-list");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}



// This function will loop through the markers array and display them all.

function showDogs() {

  var bounds = new google.maps.LatLngBounds();

  // Extend the boundaries of the map for each marker and display the marker

  for (var i = 0; i < markers.length; i++) {

    markers[i].setMap(map);

    bounds.extend(markers[i].position);

  }

  map.fitBounds(bounds);

}

// This function will loop through the listings and hide them all.

function hideDogs() {

  for (var i = 0; i < markers.length; i++) {

    markers[i].setMap(null);

  }

}

var googleError = function() {
  window.alert("Unable to load the map.")
}