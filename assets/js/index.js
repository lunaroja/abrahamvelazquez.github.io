/*global jQuery */
/*jshint browser:true */
/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    $(document).ready(function () {

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

        var id = '35581';
        var token = '35581.71f3d8d.cf11bd26407e4217a4267aa7dd2680be'
        var $image = $('.main-header-image');
        $.ajax({
          dataType: "jsonp",
          url: 'https://api.instagram.com/v1/users/' + id + '/media/recent/?access_token=' + token,
          error: function(response){
            
          }
          success: function(response) {
            var rand = Math.floor(Math.random() * response.data.length);
            var image = response.data[rand].images.low_resolution.url.replace('320x320');
            $image.css({'background-image': 'url(' + image +')'}).addClass('loaded');
          }
        });
    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);
