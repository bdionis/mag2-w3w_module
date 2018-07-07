// require(
//     [
//         'jquery',
//         'Magento_Ui/js/modal/modal'
//     ],
//     function ($, modal) {
//         var options = {
//             type: 'popup',
//             responsive: true,
//             innerScroll: true,
//             title: '',
//             buttons: [{
//                 text: $.mage.__('Close'),
//                 class: '',
//                 click: function () {
//                     this.closeModal();
//                 }
//             }]
//         };
//
//         var popup = modal(options, $('#w3w-map-modal'));
//         $(".w3w-icon-input").on('click',function(){
//             console.log('renoten');
//             $("#w3w-map-modal").modal("openModal");
//         });
//     }
// );


define(
    [
        "jquery",
        "Magento_Ui/js/modal/modal"
    ], function($){
        var w3w_modal_map = {
            initModal: function(config, element) {
                $target = $(config.target);
                $target.modal();
                $element = $(element);
                $element.click(function() {
                    $target.modal('openModal');
                });
            }
        };

        return {
            'w3w_modal': w3w_modal_map.initModal
        };
    }
);