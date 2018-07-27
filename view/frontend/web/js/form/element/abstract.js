define([
    'jquery',
    'Magento_Ui/js/form/element/abstract',
    'Magento_Ui/js/modal/modal',
    'mage/translate',
    'Extait_W3W/js/google_init'
], function ($, Component, modal, $t, googleMap) {
    'use strict';

    var w3wMapOptions = {
            modalID: '#w3w-map-modal',
            modalClass: 'extait-w3w-popup',
            modalTitle: $t('What3Words Modal Map'),
        };

    return Component.extend({

        showMap: function () {
            var popup = modal(this.getPopupW3WMapOptions(), w3wMapOptions.modalID);
            popup.openModal();
            googleMap.initMap();
        },

        getPopupW3WMapOptions: function () {

            function closeActionPopup () {
                $('#w3w-map-input').insertBefore($('#w3w_map_div'));
                $('#infowindow-content').insertAfter($('#w3w_map_div'));
                $('#w3w-words-result-container').insertAfter($('#w3w_map_div'));
            }

            return {
                type: 'popup',
                responsive: true,
                innerScroll: true,
                title: w3wMapOptions.modalTitle,
                modalClass: w3wMapOptions.modalClass,
                buttons: [{
                    text: $t('Accept'),
                    class: 'action primary',
                    click: function () {
                        var popup = this;
                        var w3w_input_value = $('.w3w_address').text();
                        if (w3w_input_value !== '-------.-------.-------') {
                            $('.w3w-input').val(w3w_input_value);
                        }
                        closeActionPopup();
                        popup.closeModal();
                    }
                }],
                modalCloseBtnHandler: function () {
                    var popup = this;
                    closeActionPopup();
                    popup.closeModal();
                }
            };
        }
    });
});