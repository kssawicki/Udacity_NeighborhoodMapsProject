// 'use strict';

// Information about the places these dogs live

var friendLocations = [{

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

markers = [];

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

  var friendLocationMarker = function(f, marker){
    friendLocations[f].marker = marker;
  };

  var markerListener = function(marker){
    marker.addListener('click', function(){
      populateInfoWindow(this, largeInfoWindow);
    });
  };

  var bounds = new google.maps.LatLngBounds();

  // The following group uses the location array to create an array of markers on initialize.

  for (var i = 0; i < friendLocations.length; i++) {

    // Get the position from the location array.

    var position = friendLocations[i].location;

    var title = friendLocations[i].title;

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

    //bind markers to friends
    friendLocationMarker(i, marker);

    //use extracted function for onclick 
    markerListener(marker)
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);

}



// This function populates the infowindow when the marker is clicked. We'll only allow

// one infowindow which will open at the marker that is clicked, and populate based

// on that markers position.

function populateInfoWindow(marker, infowindow) {

  //ajax call variable formatting (commas on multiple var assignment not semicolons)

  // var query = marker.title,
  //     dt = 'jsonp',
  //     urlBase = "whatever the api gives you that never changes between calls",
  //     fullApiURL = urlBase + "formatting" + query + "formatting from api docs"

  // $.ajax({
  //   url: fullApiURL,
  //   dataType: dt,
  //   success: function(response){
  //     move the stuff between ************** and ******** here after this call ServiceWorkerMessageEvent

  //   } error: function(response){
  //     googleError();
  //   }
  // });


  // Check to make sure the infowindow is not already opened on this marker.
// **************
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
// ********************
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


function FriendLocation(title, location, count){
  var self = this;
  self.count = count;
  self.title = title;
  self.locaiton = location;
  self.visibility = ko.observable(true);
}

function FriendsViewModel(){
  var self = this;

  self.searchBar = ko.observable('');

  self.searchResults = ko.computed(function(){
    var results = "";
    results += self.searchBar().toUpperCase();
    return results;
  },(self));

  self.capitalizeInput = function(){
    var currentVal = self.searchBar();
    self.searchBar(currentVal.toUpperCase());
  };

  //init the friends
  self.friendLocations = ko.observableArray();

  var i = 0;
  friendLocations.forEach((friend) =>{
    self.friendLocations.push(new FriendLocation(friend.title, friend.locaiton, i));
    i += 1;
  });

  //  http://www.knockmeout.net/2011/04/utility-function-in-knockoutjs.html
  self.filteredList = ko.computed(function(){
    var filter = self.searchResults().toUpperCase();
    if(filter === ""){
      self.friendLocations().forEach((friend) =>{
        friend.visibility(true);
        markers.forEach((marker) => {marker.setVisible(true);});
      });
      return self.friendLocations();
    } else {
      return ko.utils.arrayFilter(self.friendLocations(), function(friend){
        var string = friend.title.toUpperCase();
        var result = (string.search(filter) >= 0);
        friend.visibility(result);
        markers[friend.count].setVisible(result);
        return result;
      });
    }
  });

  self.eventClickWindow = function() {
    largeInfowindow = new googleError.maps.Infowindow();
    for(var i = 0; i < markers.length; i++){
      if(this.title == markers[i].title){
        populateInfoWindow(markers[i], largeInfowindow)
      }
    }
  };

}


var FVM = new FriendsViewModel();
ko.applyBindings(FVM);

