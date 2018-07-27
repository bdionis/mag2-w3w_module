define([
    'jquery',
    'jquery.googleapi'
], function ($, googleapi) {
    var map;
    var w3wApiKey = 'S1DKBC18';

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

            var autocomplete = new google.maps.places.Autocomplete(input, {placeIdOnly: true});
            autocomplete.bindTo('bounds', map);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            var infowindow = new google.maps.InfoWindow();
            var infowindowContent = document.getElementById('infowindow-content');
            infowindow.setContent(infowindowContent);
            var geocoder = new google.maps.Geocoder;

            getLatLngByW3w();

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

                    getW3W(marker);

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
                    "url": "https://api.what3words.com/v2/reverse?coords="+lat+","+lng+"&display=full&format=json&key="+w3wApiKey,
                    "method": "GET",
                    "headers": {}
                };

                $.ajax(settings).done(function (response) {
                    var words = '';
                    if (response.words) {
                        words = response.words;
                    } else {
                        words = '-------.-------.-------';
                    }
                    $('.w3w_address').text(words);
                });
            }

            function getLatLngByW3w() {
                var w3wText = $('.w3w-input').val();
                // var w3wCheck = new RegExp('^\p{L}{3,}+\.\p{L}{3,}+\.\p{L}{1,}+$');
                // var email = new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$');

                if (w3wText) {
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://api.what3words.com/v2/forward?addr="+w3wText+"&key="+w3wApiKey+"&lang=en&format=json&display=full",
                        "method": "GET",
                        "headers": {}
                    };

                    $.ajax(settings).done(function (response) {
                        var words = '';

                        if (response.words) {
                            words = response.words;

                            geocoder.geocode({'location': response.geometry}, function(results, status) {

                                if (status !== 'OK') {
                                    window.alert('Geocoder failed due to: ' + status);
                                    return;
                                }

                                map.setZoom(11);
                                map.setCenter(results[0].geometry.location);

                                marker.setPosition(response.geometry);
                                marker.setVisible(true);
                                infowindowContent.children['place-address'].textContent =
                                    results[0].formatted_address;
                            });

                        } else {
                            words = '-------.-------.-------';
                        }
                        $('.w3w_address').text(words);
                    });

                }

            }
        }
    };
});