require(
    [
        'jquery',
        'Magento_Ui/js/modal/modal'
    ],
    function ($, modal) {
        var options = {
            type: 'popup',
            responsive: true,
            innerScroll: true,
            title: '',
            buttons: [{
                text: $.mage.__('Close'),
                class: '',
                click: function () {
                    this.closeModal();
                }
            }]
        };

        var popup = modal(options, $('#w3w-map-modal'));
        $(".w3w-icon-input").on('click',function(){
            console.log('renoten');
            $("#w3w-map-modal").modal("openModal");
        });
    }
);