define([
    'jquery',
    'jquery.googleapi'
], function ($, googleapi) {
    var map;

    return {
        initMap: function()
        {
            map = new google.maps.Map(document.getElementById('w3w_map_div'), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
            });

            var marker = new google.maps.Marker({
                map: map
            });

            var input = document.getElementById('w3w-map-input');

            var autocomplete = new google.maps.places.Autocomplete(
                input, {placeIdOnly: true});
            autocomplete.bindTo('bounds', map);

            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            var infowindow = new google.maps.InfoWindow();
            var infowindowContent = document.getElementById('infowindow-content');
            infowindow.setContent(infowindowContent);
            var geocoder = new google.maps.Geocoder;

            map.addListener('click', function(event) {
                marker.setPosition(event.latLng);
                marker.setVisible(true);

                getW3W(marker);

                geocoder.geocode({'location': event.latLng}, function(results, status) {

                    if (status !== 'OK') {
                        window.alert('Geocoder failed due to: ' + status);
                        return;
                    }

                    marker.setPosition(event.latLng);
                    marker.setVisible(true);
                    infowindowContent.children['place-address'].textContent =
                        results[0].formatted_address;
                });
            });

            marker.addListener('click', function() {
                console.log(marker);
                infowindow.open(map, marker);
            });

            autocomplete.addListener('place_changed', function() {
                infowindow.close();
                var place = autocomplete.getPlace();

                if (!place.place_id) {
                    return;
                }

                geocoder.geocode({'placeId': place.place_id}, function(results, status) {
                    if (status !== 'OK') {
                        window.alert('Geocoder failed due to: ' + status);
                        return;
                    }
                    map.setZoom(11);
                    map.setCenter(results[0].geometry.location);
                    marker.setPosition(results[0].geometry.location);
                    marker.setVisible(true);
                    infowindowContent.children['place-address'].textContent =
                        results[0].formatted_address;
                });

            });

            function getW3W(marker)
            {
                var lat = marker.getPosition().lat();
                var lng = marker.getPosition().lng();

                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://api.what3words.com/v2/reverse?coords="+lat+","+lng+"&display=full&format=json&key=S1DKBC18",
                    "method": "GET",
                    "headers": {}
                };

                $.ajax(settings).done(function (response) {
                    console.log(response);
                });
            }
        }
    };
});