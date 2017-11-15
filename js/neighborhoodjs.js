/* globals google  */
/* jshint esversion: 6 */

(function(global) {
  "use strict";

  // 'use strict';
  // Information about the places these dogs live
  var friendLocations = [{

      title: "Ziggy",

      image: "ziggy.jpeg",

      username: "katherinessawicki",

      description: "This is my dog! She is 6 years old, a border collie-lab mix, and likes to eat anything that has peanut butter (like me!)",

      breed: "Border_Collie",

      location: {

        lat: 39.5050151,

        lng: -119.812267,

      }


    },

    {

      title: "Pogo",

      image: "pogo.jpeg",

      username: "jackrussellofinstagram",

      description: "This half jack russell, half lab mix is really hyper! He loves eating all the veggies and fruits his owners grow, so he is very fit!",

      breed: "Jack_Russell_Terrier",

      location: {

        lat: 39.533983,

        lng: -119.878318

      }

    },

    {

      title: "Frank & Oreo",

      description: "Frank and Oreo are my boyfriend`s parents` dogs! They are both seniors, and are very friendly! Though they can annoy each other to the point of biting one another, they are best friends!",

      image: "f_o.jpg",

      breed: "Chihuahua_(dog)",

      username: "explore/tags/dogs",

      location: {

        lat: 39.419104,

        lng: -119.772268

      }

    },

    {

      title: "Valentina",

      description: "Valentina is a half pomeranian, half chihuahua mix! She is basically a model because of how extravagant her fur is!",

      image: "Valentina.png",

      username: "valentina__sauce",

      breed: "Pomeranian_dog",

      location: {

        lat: 39.512546,

        lng: -119.813448

      }

    },

    {

      title: "Milo",

      description: "Milo is a great guard dog that lives next door to my mom. His favorite hobby is to bark at EVERYTHING.",

      image: "milo.JPG",

      breed: "Chow_Chow",

      username: "explore/tags/dogsofinstagram",

      location: {

        lat: 39.504568,

        lng: -119.809846

      }

    },

    {

      title: "Kimbo",

      description: "Though Kimbo looks gigantic and threatening, he is actually kinda dumb and very sweet! He is a purebred rottweiler.",

      image: "kimbo.png",

      breed: "Rottweiler",

      username: "taylor1403",

      location: {

        lat: 39.576616,

        lng: -119.824863

      }

    },



  ];



  // Initializing map

  var map;

  var markers = [];

  function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {

      center: {

        lat: 39.530895,

        lng: -119.814972

      },

      zoom: 14

    });

function mapError() {
  alert('No doggies for you! Try again!');
}

    // Markers and infowindows

    var largeInfoWindow = new google.maps.InfoWindow();

    var friendLocationMarker = function(f, marker) {
      friendLocations[f].marker = marker;

    };


    var markerListener = function(marker) {
      marker.addListener('click', function() {
        // no marker breed exists, and this was a string.
        getData(marker.breed);
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

      var username = friendLocations[i].username;

      var breed = friendLocations[i].breed;



      // Create a marker per location, and put into markers array.

      var marker = new google.maps.Marker({

        map: map,

        position: position,

        image: image,

        description: description,

        title: title,

        username: username,

        id: i,

        breed: breed

      });
      // Credit for bounce animation: https://stackoverflow.com/questions/45507427/stop-marker-animation-in-google-maps-with-multiple-markers
      /* jshint ignore:start */
      marker.addListener('click', function() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setAnimation(null);
        }
        toggleBounce(this);
        map.setZoom(10);
        map.setCenter(marker.getPosition());
      });




      function toggleBounce(ele) {
        if (ele.getAnimation() !== null) {
          ele.setAnimation(null);
        } else {
          ele.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
      /* jshint ignore:end */



      // Push the marker to our array of markers.

      markers.push(marker);

      //bind markers to friends
      friendLocationMarker(i, marker);


      //use extracted function for onclick
      markerListener(marker);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
  }

  //Maps Error Handling
  function MapError() {
    alert('No doggies for you!');
  }

  //Wikipedia API error Handling
  var wikiRequestTimeout = setTimeout(function(){
    $wikiElem.text("Failed to get doggy info!");
  }, 8000);

  // Wikipedia API
  function getData(breed) {
    // Source: https://www.mediawiki.org/wiki/API:Main_page
    $.ajax({
      type: "GET",
      url: "http://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=" + breed + "&callback=?",
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    }).then(function(data, textStatus, jqXHR) {
      Object.values(data.query.pages).forEach(function(item) {

        FVM.details([]);
        FVM.details.push(item.extract);
     /* // var funsEl = document.querySelector('#funs');
        if (funsEl) {
          var _tempDoc = document.createElement('div');
          _tempDoc.innerHTML = item.extract;
          _tempDoc.querySelectorAll('.gallery').forEach(function(el) {
            el.remove();
          });
          funsEl.innerHTML = _tempDoc.innerHTML; */
          FVM.breed(breed);
          FVM.hideDog(false);
//document.querySelector('#doggyTitle').innerHTML = breed;
       //   document.querySelector('#hideWiki').classList.remove('d-none');
       // } else {
        //  throw new Error("There is no FUN!!!!!");
       // }
      });
      clearTimeout(wikiRequestTimeout);

    }).catch(function(errorMessage) {
      console.error(errorMessage);
    });
  }

  // This function populates the infowindow when the marker is clicked. We'll only allow

  // one infowindow which will open at the marker that is clicked, and populate based

  // on that markers position.

  function getContentString(marker) {
    var contentString = '<div class="infoWindow"><h4><strong>' + marker.title + '</strong></h4><br>' + '<p>' + marker.description + '</p>' + '<img src="imgs/' + marker.image + '" />' + '<a href="https://www.instagram.com/' + marker.username + '">Instagram page</a></div>';

    return contentString;
  }

  function populateInfoWindow(marker, infowindow) {





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


  function FriendLocation(title, location, count) {
    var self = this;
    self.count = count;
    self.title = title;
    self.location = location;
    self.visibility = ko.observable(true);
    self.eventClickWindow = function (el) {
      google.maps.event.trigger(markers[count], 'click');
    };
  }

  function FriendsViewModel() {
    var self = this;

    self.searchBar = ko.observable('');
    self.breed = ko.observable('');
    self.details = ko.observableArray();
    self.hideDog = ko.observable(true);
    self.searchResults = ko.computed(function() {
      var results = "";
      results += self.searchBar().toUpperCase();
      return results;
    }, (self));

    self.capitalizeInput = function() {
      var currentVal = self.searchBar();
      self.searchBar(currentVal.toUpperCase());
    };

    //init the friends
    self.friendLocations = ko.observableArray();
    var i = 0;
    friendLocations.forEach((friend) => {
      self.friendLocations.push(new FriendLocation(friend.title, friend.location, i));
      i += 1;
    });

    //  http://www.knockmeout.net/2011/04/utility-function-in-knockoutjs.html
    self.filteredList = ko.computed(function() {
      var filter = self.searchResults().toUpperCase();
      if (filter === "") {
        self.friendLocations().forEach((friend) => {
          friend.visibility(true);
          markers.forEach((marker) => {
            marker.setVisible(true);
          });
        });
        return self.friendLocations();
      } else {
        return ko.utils.arrayFilter(self.friendLocations(), function(friend) {
          var string = friend.title.toUpperCase();
          var result = (string.search(filter) >= 0);
          friend.visibility(result);
          markers[friend.count].setVisible(result);
          return result;
        });
      }
    });

  }


  var FVM = new FriendsViewModel();
  ko.applyBindings(FVM);

  global.initMap = initMap;
})(window);
