$(".mapResults").hide(); //hiding map/results section on page-load

$("#submitBtn").on("click", function(){
    event.preventDefault();
    $("#userPetSearch").hide();
    $('#petResponse').show();

   var petStreet, petCity, petState, petFullAddress, petSearchGen, petSearchType, petQueryURL;
   var petSearchVal = $("#userZip").val();

   if ($("#petType")["0"][0].selected == true) {
        petSearchType = "&animal=cat";
   }

   else if ($("#petType")["0"][1].selected == true) {
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
        type : 'GET',
        data : {},
        url : petQueryURL,
        dataType: 'json',
        success : function(response) {  
                 $("#petResponse").empty();

                var results = response.petfinder.pets.pet;
                
                var resultsPreSorted = []
                    results.forEach(function(petData){
                        var petSorted= {};
                            petSorted.petName = petData.name.$t;
                            petSorted.petAge = petData.age.$t;
                            petSorted.petType = petData.animal.$t;
                            petSorted.petGender = petData.sex.$t;
                            petSorted.petInfo = petSorted.petName + " " + petSorted.petAge + " " + petSorted.petType + " " + petSorted.petGender;
                       
                           
                            petSorted.petStreet = petData.contact.address1.$t;
                            petSorted.petCity = petData.contact.city.$t;
                            petSorted.petState = petData.contact.state.$t;
                            petSorted.petFullAddress =   petSorted.petStreet + ",+" +  petSorted.petCity + ",+" + petSorted.petState ;
                            

                            petSorted.petEmail = petData.contact.email.$t;
                            petSorted.petPhone = petData.contact.phone.$t;
                            petSorted.petDescription = petData.description.$t;
                            petSorted.petLastUpdate = petData.lastUpdate.$t.split("T");
                            var petDate = petSorted.petLastUpdate
                            petSorted.updateTimeEpoch =  Math.floor(moment(petDate).valueOf());
                            petSorted.petPics = petData.media.photos.photo[0].$t;
                            
                            resultsPreSorted.push(petSorted);    
                }); // end for each loop
            var resultSorted = resultsPreSorted.sort(function(a, b){return a.updateTimeEpoch-b.updateTimeEpoch});
              console.log(resultSorted)
           for (var i = 0; i  < resultSorted.length; i++) {
               
                 var petContainer = $("<div class='col-md-3 fourAcross'>")
                 var newPetDiv = $("<div class='petDetes'>");
                 var petImage = $("<img class='imagez'>").attr("src", resultSorted[i].petPics).attr("data-address", resultSorted[i].petFullAddress);
                    
                 petContainer.append(newPetDiv).append(petImage);
                 var petResults = newPetDiv.text(resultSorted[i].petInfo);
                 $("#petResponse").append(petContainer);
       }
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


                    

    