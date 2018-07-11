define(
    [
        'domReady!',
        'jquery',
        'mage/translate',
        'Magento_Ui/js/modal/modal',
        'Magento_Ui/js/modal/alert',
        'jquery/ui'
    ], function(dom, $, $t, modal, alert){
        'use strict';

        $.widget('extait.w3w_modal', {
            options: {
                modalID: '#w3w-map-modal',
                modalClass: 'extait-w3w-popup',
                modalTitle: $t('What3Words Modal Map'),
            },

            _init: function () {
                var popup = modal(this.getModalOptions(), this.options.modalClass);

                $(this.element).click(function () {
                    alert('hren');
                    popup.openModal();
                });
            },

            getModalOptions: function () {
                var widget = this;

                return {
                    type: 'popup',
                    responsive: true,
                    innerScroll: true,
                    title: widget.options.modalTitle,
                    modalClass: widget.options.modalClass,
                    buttons: [{
                        text: $('Close'),
                        class: 'action primary',
                        click: function () {
                            var popup = this;
                            popup.closeModal();
                        }
                    }]
                };
            }
        });

        return $.extait.w3w_modal;
    }
);
//
// define([
//     'ko',
//     'jquery',
//     'mage/translate',
//     'Magento_Ui/js/modal/modal'
// ], function (ko, $, $t, modal) {
//     'use strict';
//
//     return function (config, element) {
//
//         /**
//          * Modal options
//          */
//         var options = {
//             type: 'popup',
//             title: $t('What3Words Modal Map'),
//             modalClass: 'extait-w3w-popup',
//             responsive: true,
//             buttons: [
//                 {
//                     text: $t('Cancel'),
//                     class: 'action primary',
//                     click: function() {
//                         popup.closeModal();
//                     }
//                 }
//             ]
//         };
//
//         var popup = modal(options, $('#w3w-map-modal'));
//
//         $(element).find('#w3w-map-link').on('click', function (event) {
//             alert('hren');
//             popup.openModal();
//
//             // return false;
//         })
//     };
// });
// alert('hren2');