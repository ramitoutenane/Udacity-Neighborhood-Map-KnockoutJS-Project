//populate info window with data from Wikipwedia
function populateInfoWindow(marker, infowindow) {
    //replace spaces with underscore '_' before appending title to URLs
    let title = (marker.name).replace(/\s/g, '_');

    //Create API URL and Wikipedia page URL according to each marker title
    let apiUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + title;
    let wikiPageUrl = 'https://en.wikipedia.org/wiki/' + title;


    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div class=info>Loading...</div>');


        const wikiTimeout = setTimeout(function () {
            infowindow.setContent('<div class="info">Somthing went wrong with WIKIPEDIA API <br>Please Try Again Later...</div>');
        }, 2500);

        $.ajax({
            url: apiUrl,
            dataType: 'jsonp',
            success: function (response) {
                let pageid = Object.keys(response.query.pages)[0];
                if (pageid != -1) {
                    let article = response.query.pages[pageid].extract;
                    let windowContent = '<div class="info"><h3>' + marker.name + '</h3><p>' + article + '</p>' +
                        '<span class="wikiLink">Wikipedia page : <a href=' + wikiPageUrl + ' target="_blank">' + marker.name + '</a></span></div>';
                    infowindow.setContent(windowContent);
                } else {
                    let windowContent = '<div class="info">WIKIPEDIA article not found <br>Please Try Again Later...</div>';
                    infowindow.setContent(windowContent);
                }
                clearTimeout(wikiTimeout);
            }
        });
        infowindow.open(map, marker);
        infowindow.addListener('closeclick', function () {
            infowindow.marker = null;
        });
    }
}
