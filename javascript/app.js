
//Gathering API data

//First we are staging our variables for the Petfinder API

//These are Petfinder API arguments needed to pull data to our site:
var petURL = "https://api.petfinder.com/pet.find?format=json";
var petKey = "&key=2cefc690d24d8a6092439aa540dd7c2d";
var searchLocation = "&location=08820"; // + (unNamed var here) - need to replace 08820 with user input data - this will have to be a variable set up later and pushed to here
var petOutput ="&output=full"
var petCallBack = "&callback=?"

//Directly below is the query URL created from variables initialized above, & where we'll need to add additional arguments related to the pets' info. petCallBack must always be last for this variable to work!
var petQueryURL = petURL + petKey + searchLocation + petOutput + petCallBack;

//Here I created additional variables to access later - the data contained here will be specific to the animals, and pulled from the API!
var petStreet = "7 clinton ave" //example street
var petCity = "edison " //example city
var petState = "NJ" //example state

//sending request to Petfinder to retrieve information
$.ajax({
	type : 'GET',
    data : {},
    url : petQueryURL,
    dataType: 'json',
    success : function(response) {                
        //we need to create a for-loop and append returned pets to page across all elements in the returned array
        var results= response.petfinder.pets.pet;
        var petName = results[0].name.$t;
        var petAge = results[0].age.$t;
        var petType = results[0].animal.$t;
        // //we need to finish parsing out this info
        // // var petBreed = results[0].breed;
        var petEmail = results[0].contact.email.$t;
        var petPhone = results[0].contact.phone.$t;
        var petStreet = results[0].contact.address1.$t;
        var petCity = results[0].contact.city.$t;
        var petState = results[0].contact.state.$t;
        var petDescription = results[0].description.$t;
        var petLastUpdate = results[0].lastUpdate.$t;
        var petPics = results[0].media.photos.photo[0];
        var petDetails = results[0].options.option
        var petGender = results[0].sex.$t;
        var petInfo = petName + " " + petAge + " " + petType;
        // //using this for testing purposes
        // // console.log(petAge); 
        // console.log(petGender);
        // //Using below as test to append new div/pet details!
        // //Incidentally, we should probably use Bootstrap's grid system to place this beside the map and also just in general to ensure nice formatting
        $("#petResponse").append( "<div class='petDetes'>" + petInfo + "</div>" + "<button id='contact'>Contact</button");
        },
    });

//Now we are setting the stage for google Maps

//Formatting the pets' locations for google maps:
var petLocation = petStreet + petCity + petState;

//google Maps API arguments for displaying map and placing a location pin
var mapsURL = "https://maps.googleapis.com/maps/api/geocode/json?";
var pinLocation = "address=" + petLocation;
var mapsKey = "&key=AIzaSyB6ABdEM48UdJKrS7oG5F-qs0ZRbll1koY";

//Here is the query URL created using the variables directly above
var mapsQueryURL = mapsURL + pinLocation + mapsKey;

//And here are some additional variables to access later, which will contain the coordinates of each pet's location
var gridLat
var gridLong

//Retrieves data from google Maps for location of the pet (as supplied by Petfinder) so that we can pin it to the map
$.ajax({
    url: mapsQueryURL,
    method: "GET"
    })
    // After the data from the AJAX request comes back
      .done(function(mapsData) {
      	gridLat = mapsData.results[0].geometry.location.lat
      	gridLong = mapsData.results[0].geometry.location.lng
      });
//we need to create a setTimeout function for this following function (markerMap) to make sure it loads secondary to the ajax request! Otherwise it produces an occasional error
 function markerMap() {
        var petMarker= {};
        petMarker.lat = gridLat;
		petMarker.lng = gridLong;

        var map = new google.maps.Map(document.getElementById("map"), {
          zoom: 4,
          center: petMarker
        });
        var marker = new google.maps.Marker({
          position: petMarker,
          map: map
        }); 
      }

//TO-DO List:
//need to get dropdowns working on searchForm.html
//need a homepage/refresh
//we need to figure out how to sort and display by "last update"
//we also need to figure out how to sort by age
//input form needs to be finished
//contact the shelter form needs to be created - maybe use a modal window?
//we need a set-timeout function for the markermap function
//we need to figure out how to set multiple pins on the map for displaying multiple pet locations
//we need to finish pulling data to variables in the petfinders ajax request on lines 31-40
//DONE(we need hide/display functions for hiding the form/then hiding jumbotron and displaying form)
//we should review our trello board to modify it and check our to-dos to catch anything we've missed so far

