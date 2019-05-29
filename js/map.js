let map;
const markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 31.979676, lng: 35.8325821},
        zoom: 14.5
    });

    const infowindow = new google.maps.InfoWindow();

    places.forEach(function (place, index) {
        let marker = new google.maps.Marker({
            map: map,
            position: place.coordinates,
            name: place.name,
            animation: google.maps.Animation.DROP,
            id: index
        });
        markers.push(marker);
        marker.addListener('click', function () {
            populateInfoWindow(this, infowindow);
            //marker will bounce at least once before stopping
            this.setAnimation(google.maps.Animation.BOUNCE);
            this.setAnimation(null);

        });
    });
    //after initializing the map we apply knockout binding because to use marker.setMap()
    ko.applyBindings(new ViewModel());
}

//Google map error handling
//https://github.com/StacyMentor/Handling-Google-Maps-in-Async-and-Fallback/
function mapErrorHandling() {
    alert('Sorry, an error occurred with Google Map API\nPlease Try Again Later...');
}

function showAllMarkers() {
    markers.forEach(function (marker) {
        marker.setMap(map);
    });
}
