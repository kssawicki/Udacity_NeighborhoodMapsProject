// Initializing map
var map;
function initMap() {
	"use strict";
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 39.530895, lng: -119.814972},
		zoom: 14
	});
}

// Alert user if the map isn't working
function googleError() {
	"use strict";
	document.getElementById('error').innerHTML = "<h2>Google Maps is not responding. Try refreshing the page later.</h2>";
}


// ViewModel
var ViewModel = function () {
    "use strict";

    // Create an array of all places
   
    // Initalize infowindow
    var infowindow = new google.maps.InfoWindow({
    	maxWidth: 200,
    });

    //Initalize marker
    var marker = new google.maps.Marker ({
        position: dogs,
        title: ''
    });

document.getElementById('show-dogs').addEventListener('click', show-dogs);
document.getElementById('hide-dogs').addEventListener('click', hide-dogs);


// Information about the places these dogs live
    var dogs = [
    {
        name: 'Ziggy',
	    lat: 39.5050151,
	    lng: -119.812267,
        id: 'ziggy'
    },
    {
        name: 'Pogo',
        lat: 39.534116,
        lng: -119.877041,
        id: 'pogo'
    },
    {
        name: 'Frank & Oreo',
        lat: 39.419104,
        lng: -119.772268,
        id: 'f_o'
    },
     {
        name: 'Valentina',
        lat: 39.512546,
        lng: -119.813448,
        id: 'valentina'
    },
    {
        name: 'Milo',
        lat: 39.504568,
        lng: -119.809846,
        id: 'milo'
    },
    {
        name: 'Kimbo',
        lat: 39.576616,
        lng: -119.824863,
        id: 'kimbo'
    },
    ];

}
