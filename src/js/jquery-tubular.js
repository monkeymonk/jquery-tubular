
(function ($) {
    'use strict';


    var Tubular = function (element, options) {
        this.options = options;
        this.$element = $(element);
    }; // Tubular

    Tubular.DEFAULTS = {
        ratio: 16/9, // usually either 4/3 or 16/9 -- tweak as needed
        videoId: 'ZCAnLxRvNNc', // toy robot in space is a good default, no?
        mute: true,
        repeat: true,
        width: $(window).width(),
        wrapperZIndex: 99,
        playButtonClass: 'tubular-play',
        pauseButtonClass: 'tubular-pause',
        muteButtonClass: 'tubular-mute',
        volumeUpClass: 'tubular-volume-up',
        volumeDownClass: 'tubular-volume-down',
        increaseVolumeBy: 10,
        start: 0,
        callback: null
    }; // DEFAULTS

    Tubular.prototype = {}; // Prototypes

    var old = $.fn.tubular;

    $.fn.tubular = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('.tubular'),
                options = $.extend({}, Tubular.DEFAULTS, $this.data(), typeof option === 'object' && option);

            if (!data) {
                $this.data('.tubular', (data = new Tubular(this, options)));
            }

            if (typeof option === 'string') {
                data[option]();
            }
        });
    }; // $.fn.tubular

    $.fn.tubular.Constructor = Tubular;

    $.fn.tubular.noConflict = function () {
        $.fn.tubular = old;
        return this;
    }; // No conflict

    $(document)
    .on('', '', function () {});

}) (window.jQuery);
