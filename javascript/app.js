
$("#submitBtn").on("click", function(){
    event.preventDefault()
    var petSearchVal = $("#userZip").val()
    var petURL = "https://api.petfinder.com/pet.find?format=json";
    var petKey = "&key=2cefc690d24d8a6092439aa540dd7c2d";
    var searchLocation = "&location=" + petSearchVal; // + (unNamed var here) - need to replace 08820 with user input data - this will have to be a variable set up later and pushed to here
    var petOutput ="&output=full"
    var petCallBack = "&callback=?"

    var petQueryURL = petURL + petKey + searchLocation + petOutput + petCallBack;
    
    $.ajax({
    type : 'GET',
    data : {},
    url : petQueryURL,
    dataType: 'json',
    success : function(response) {  
        $("#petResponse").empty();

        var results = response.petfinder.pets.pet; //auto-pulling first 25 results?
        console.log(results);

        for (var i = 0; i < results.length; i++) {
            var petName = results[i].name.$t;
            var petAge = results[i].age.$t;
            var petType = results[i].animal.$t;
            var petGender = results[i].sex.$t;
            var petInfo = petName + " " + petAge + " " + petType + " " + petGender;
            console.log(petInfo);
            var petEmail = results[i].contact.email.$t;
            var petPhone = results[i].contact.phone.$t;
            var petStreet = results[i].contact.address1.$t;
            var petCity = results[i].contact.city.$t;
            var petState = results[i].contact.state.$t;
            var petDescription = results[i].description.$t;
            var petLastUpdate = results[i].lastUpdate.$t;
            // var petPics = [];
            //     for (var y = 0; y < results[i].media.photos.photo.length; y++) {
            //         petPics.push(results[i].media.photos.photo[y].$t);
            //         console.log(petPics);
            //         }
            // var petDetails = [];
            //     for (var z = 0; z < results[i].options.option.length; z++) {
            //         petDetails.push(results[i].options.option[z].$t);
            //         console.log(petDetails);
            //         }
            // var petBreed = [];
            // console.log(petName + " " + petAge);
            //     for (var x = 0; x < results[i].breeds.breed.length; x++) {
            //         petBreed.push(results[i].breeds.breed[x].$t);
            //         console.log(petBreed);
            //         }
        var newPetDiv = $("<div class='petDetes'>");
        var contactBtn = $("<button id='contact'><a href='modal.html'>Contact</a></button")
        // petResults.addClass("petDetes");
        var petResults = newPetDiv.text(petInfo).append(contactBtn);
        $("#petResponse").append(petResults);
        // $("#petResponse").append(petInfo + "<button id='contact'><a href='modal.html'>Contact</a></button");
         }
        },
    });
});

//Gathering API data

//These are Petfinder API arguments needed to pull data to our site:
var petURL = "https://api.petfinder.com/pet.find?format=json";
var petKey = "&key=2cefc690d24d8a6092439aa540dd7c2d";
var searchLocation = "&location=" + petSearchVal; // + (unNamed var here) - need to replace 08820 with user input data - this will have to be a variable set up later and pushed to here
var petOutput ="&output=full"
var petCallBack = "&callback=?"

//Directly below is the query URL created from variables initialized above, & where we'll need to add additional arguments related to the pets' info. petCallBack must always be last for this variable to work!
var petQueryURL = petURL + petKey + searchLocation + petOutput + petCallBack;

//WORK ON THIS TODAY - GETTING CORRECT DATA TO PUSH TO THESE VARIABLE

//Conditionals for cat/dog preference will go here
//Here I created additional variables to access later - the data contained here will be specific to the animals, and pulled from the API!
var petStreet = "7 clinton ave" //example street
var petCity = "edison " //example city
var petState = "NJ" //example state

// //Now we are setting the stage for google Maps

// //Formatting the pets' locations for google maps:
// var petLocation = petStreet + petCity + petState;

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
//we need to figure out how to sort and display by "last update"
//we also need to figure out how to sort by age
//input form needs to be finished
//contact the shelter form needs to be created - maybe use a modal window? - in process
//we need a set-timeout function for the markermap function
//we need to figure out how to set multiple pins on the map for displaying multiple pet locations
//we need to finish pulling data to variables in the petfinders ajax request on lines 31-40
//we should review our trello board to modify it and check our to-dos to catch anything we've missed so far

