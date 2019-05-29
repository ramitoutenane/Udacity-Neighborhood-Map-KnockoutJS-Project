//Define an object to hold place name and id .
const Place = function (data) {
    //id is used as index to connect between markers list and knockout arrays.
    this.id = data.id;
    this.name = data.name;
};

const ViewModel = function () {
    const self = this;
    this.filterBox = ko.observable('');
    this.allPlacesList = ko.observableArray([]);

    //create a Place object for every place in places.js.
    //add every new Place object to allPlacesList observableArray.
    places.forEach(function (place, index) {
        let data = {name: place.name, id: index};
        self.allPlacesList.push(new Place(data));
    });

    //function to return a filtered places list according to user input.
    this.filteredPlacesList = ko.computed(function () {
        let filter = self.filterBox().toLowerCase();
        if (!filter) {
            showAllMarkers();
            return self.allPlacesList();
        } else {
            return ko.utils.arrayFilter(self.allPlacesList(), function (place) {
                if (place.name.toLowerCase().indexOf(filter) != -1) {
                    markers[place.id].setMap(map);
                    return true;
                } else {
                    markers[place.id].setMap(null);
                    return false;
                }
            });
        }
    });

    //connect event from list to marker click
    this.clickMarker = function (place) {
        google.maps.event.trigger(markers[place.id], 'click');
    };
};
