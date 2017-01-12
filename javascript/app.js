$(".mapResults").hide(); //hiding map/results section on page-load

$("#submitBtn").on("click", function(){
    event.preventDefault();
    $("#userPetSearch").hide();
    $('#petResponse').show();

    var petStreet;
    var petCity;
    var petState;
    var petFullAddress;
    var petSearchType;
    var petSearchGen;
    var petQueryURL;
    var petSearchVal = $("#userZip").val();

    if ($("#petType")["0"][0].selected == true) {
        petSearchType = "&animal=cat";
    }

    else if ($("#petType")[0].selected == true) {
        petSearchType = "&animal=dog";
    }

    else {
        petSearchType = undefined;
    }


    if ($('#gender')["0"][0].selected == true) {
            petSearchGen = "&sex=F"
    }

    else if ($('#gender')["0"][1].selected == true) {
            petSearchGen = "&sex=M"
    }
        
    else {
            petSearchGen = undefined;
    }

    var petURL = "https://api.petfinder.com/pet.find?format=json" ;
    var petKey = "&key=2cefc690d24d8a6092439aa540dd7c2d" ;
    var searchLocation = "&location=" + petSearchVal ;
    var petOutput ="&output=full&callback=?"

    if (petSearchGen == undefined && petSearchType == undefined) {
        petQueryURL = petURL + petKey + searchLocation + petOutput ;
    }

    else if (petSearchGen != undefined && petSearchType == undefined) {
        petQueryURL = petURL + petKey + searchLocation + petSearchGen + petOutput;
    }

    else if (petSearchGen == undefined && petSearchType != undefined) {
        petQueryURL = petURL + petKey + searchLocation + petSearchType + petOutput;
    }

    else {
        petQueryURL = petURL + petKey + searchLocation + petSearchGen + petSearchType + petOutput;
    }

    $.ajax({
        type: 'GET',
        data: {},
        url: petQueryURL,
        dataType: 'json',
        success: function(response) {  
                 $("#petResponse").empty();

                var results = response.petfinder.pets.pet;
                console.log(results)

                for (var i = 0; i < results.length; i++) {
                    var petName = results[i].name.$t;
                    var petAge = results[i].age.$t;
                    var petType = results[i].animal.$t;
                    var petGender = results[i].sex.$t;
                    var petInfo = petName + " " + petAge + " " + petType + " " + petGender;
               
                   
                    petStreet = results[i].contact.address1.$t;
                    petCity = results[i].contact.city.$t;
                    petState = results[i].contact.state.$t;
                    petFullAddress =  petStreet + ",+" + petCity + ",+" + petState;
                    

                    var petEmail = results[i].contact.email.$t;
                    var petPhone = results[i].contact.phone.$t;
                    var petDescription = results[i].description.$t;
                    var petLastUpdate = results[i].lastUpdate.$t;

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

                    var petPics = results[i].media.photos.photo[0].$t;

                    var petContainer = $("<div class='col-md-3 fourAcross'>")
                    var newPetDiv = $("<div class='petDetes'>");
                    var petImage = $("<img class='imagez'>").attr("src", petPics).attr("data-address", petFullAddress);
                    
                    petContainer.append(newPetDiv).append(petImage);
                    var contactBtn = $("<button id='contact'><a href='modal.html'>Contact</a></button");
                    var petResults = newPetDiv.text(petInfo).append(contactBtn);
                    $("#petResponse").append(petContainer);      
             } // For loop
        }, //AJAX function
    }); // AJAX Request

}); // on click


$(document).on("click", ".imagez" , function(){
    $("#results").show();
    $("#map").html("");

    var petPin = $('img').data("address").replace(/\s+/g, '') ;
   
    var mapsURL = "https://maps.googleapis.com/maps/api/geocode/json?";
    var mapsKey = "&key=AIzaSyB6ABdEM48UdJKrS7oG5F-qs0ZRbll1koY";
    var pinLocation = "&address=" + petPin;
    var mapsQueryURL = mapsURL + pinLocation + mapsKey;
        console.log(mapsQueryURL);
    var gridLat, gridLong ;

    $.ajax({
    url: mapsQueryURL,
    method: "GET"
    }) //ajax header

    .done(function(mapsData) {
        gridLat = mapsData.results[0].geometry.location.lat
        gridLong = mapsData.results[0].geometry.location.lng
           var petMarker= {};
            petMarker.lat = gridLat;
            petMarker.lng = gridLong;

            var map = new google.maps.Map(document.getElementById("map"), {
              zoom: 10,
              center: petMarker
            });
            var marker = new google.maps.Marker({
              position: petMarker,
              map: map
            });  
      }); //.done function
}); // image on click

function markerMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }


