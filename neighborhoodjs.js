// Initializing map
var map;
function initMap() {
	"use strict";
	map = new google.maps.Map(document.getElementbyId('map'), {
		center: {lat: 39.5296, lng: 119.8138},
		zoom: 10
	});
	//Start the ViewModel
	ko.applyBindings(new ViewModel());
}

// Alert user if the map isn't working
function googleError() {
	"use strict";
	document.getElementById('error').innerHTML = "<h2>Google Maps is not responding. Try refreshing the page later.</h2>";
}

// Place constructor
// Credit https://discussions.udacity.com/t/having-trouble-accessing-data-outside-an-ajax-request/39072/10
var Place = function (data) {
    "use strict";
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.id = ko.observable(data.id);
    this.marker = ko.observable();
    this.phone = ko.observable('');
    this.description = ko.observable('');
    this.address = ko.observable('');
    this.rating = ko.observable('');
    this.url = ko.observable('');
    this.canonicalUrl = ko.observable('');
    this.photoPrefix = ko.observable('');
    this.photoSuffix = ko.observable('');
    this.contentString = ko.observable('');
};

// ViewModel
var ViewModel = function () {
    "use strict";
    // Make this accessible
    var self = this;

    // Create an array of all places
    // Credit https://www.udacity.com/course/viewer#!/c-ud989-nd/l-3406489055/e-3464818693/m-3464818694
    this.placeList = ko.observableArray([]);

    // Call the Place constructor
    // Create Place objects for each item in locations & store them in the above array
    // Credit https://www.udacity.com/course/viewer#!/c-ud989-nd/l-3406489055/e-3464818693/m-3464818694
    locations.forEach(function (placeItem) {
        self.placeList.push(new Place(placeItem));
    });



// Information about the places these dogs live
var markers = [
{
	name: "Ziggy",
	lat: 39.5050151,
	lng: -119.812267,
},
{
	name: "Pogo",
	lat:
}
{
	name: "Milo",
	lat:
	lng:
}
{
	name: "Joey"
}
{
	name: "Valentina"
}
];