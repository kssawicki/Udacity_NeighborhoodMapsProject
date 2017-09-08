// Initializing map
var map;
function initMap() {
	"use strict";
	map = new google.maps.Map(document.getElementbyId('map'), {
		center: {lat: 39.5296, lng: 119.8138},
		zoom: 10
	});
}