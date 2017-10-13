// 'use strict';

// Information about the places these dogs live

var friendLocations = [{

    title: 'Ziggy',

    image: '<IMG SRC=./imgs/ziggy.jpeg>',

    description: 'This is my dog! She is 6 years old, a border collie-lab mix, and likes to eat anything that has peanut butter (like me!)',

    

    location: {

      lat: 39.5050151,

      lng: -119.812267,

     }


  },

  {

    title: 'Pogo',

    description: 'This half jack russell, half lab mix is really hyper! He loves eating all the veggies and fruits his owners grow, so he is very fit!',

    location: {

      lat: 39.533983,

      lng: -119.878318

    }

  },

  {

    title: 'Frank & Oreo',

    description: 'Frank and Oreo are my boyfriend`s parents` dogs! They are both seniors, and are very friendly! Though they can annoy each other to the point of biting one another, they are best friends!',

    location: {

      lat: 39.419104,

      lng: -119.772268

    }

  },

  {

    title: 'Valentina',

    description: 'Valentina is a half pomeranian, half chihuahua mix! She is basically a model because of how extravagant her fur is!',

    location: {

      lat: 39.512546,

      lng: -119.813448

    }

  },

  {

    title: 'Milo',

    description: 'Milo is a great guard dog that lives next door to my mom. His favorite hobby is to bark at EVERYTHING.',

    location: {

      lat: 39.504568,

      lng: -119.809846

    }

  },

  {

    title: 'Kimbo',

    description: 'Though Kimbo looks gigantic and threatening, he is actually kinda dumb and very sweet! He is a purebred rotweiller.',

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

    var description = friendLocations[i].description;

    var image = friendLocations[i].image;

    // Create a marker per location, and put into markers array.

    var marker = new google.maps.Marker({

      map: map,

      position: position,

      image: image,

      description: description,

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

function getContentString(marker) {
  var contentString = '<div class="infoWindow"><h4><strong>' + marker.title + '</strong></h4><br>'
                      + '<p>' + marker.description + '</p></div>';

  return contentString;
}

function populateInfoWindow(marker, infowindow) {

  //ajax call variable formatting (commas on multiple var assignment not semicolons)

 // var query = marker.title,
 //     dt = 'jsonp',
 //     urlBase = "https://api.instagram.com/v1/users/search",
 //    fullApiURL = "https://api.instagram.com/v1/users/search" + "formatting" + query + "formatting from api docs"

  //if marker has no description do the call
   //otherwise set info window content and open info window


// Instagram API
 //  var token = '271162913.1677ed0.7a8017e118e146b2a2ebe40414359c1d',
 //  username = '',
 //  num_photos = 4;
  
 // $.ajax({
 //  url: 'https://api.instagram.com/v1/users/search',
 // dataType: 'jsonp',
//  type: 'GET',
//  data: {access_token: token, q: username},
//  success: function(data){
//            console.log(data);
//            $.ajax({
//              url: 'https://api.instagram.com/v1/users/' + data.data[0].id + '/media/recent',
 //             dataType: 'jsonp',
 //             type: 'GET',
 //             data: {access_token: token, count num_photos},
 //             success: function(data2){
 //               console.log(data2);
 //               for(x in data2.data){
 //                 $('ul').append('<li><img src="'+data2.data[x].images.thumbnail.url+'"></li>');  
 //       }
 //         },
 //     error: function(data2){
 //       console.log(data2);
 //     }
 //   });
//  },
//  error: function(data){
//    console.log(data);
 // }
//});
        


  // Check to make sure the infowindow is not already opened on this marker.
// **************
  if (infowindow.marker != marker) {

    infowindow.marker = marker;

    //infowindow.setContent('<div><strong>' + marker.title + '</strong><br></div>');
    infowindow.setContent(getContentString(marker));

    infowindow.open(map, marker);

    //infoWindowContent += '<h4>' + 

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
