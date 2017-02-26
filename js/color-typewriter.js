(function ( $ ) {
 
    // various color palettes;
    // array position 0: base color value
    // array position 1: range of (random) color value
    // values must range between 0 and 255
    var darkPalette = [0, 100];
    var lightPalette = [200, 55];
    var fullPalette = [0, 255];

    // this function manages the color fades
    $.fn.controlColorFade = function(options) {
        console.log("control color called - options: " + options);
        var defaultSettings = $.extend({
            doColorFade: true,          // true: active background color fading
            delayTime: 10000,           // defines how much time (ms) should pass before a new fade starts
            animationTime: 10000,       // defines the duration (ms) of color animation change
            colorPalette: fullPalette   // sets a specific color palette
        }, options );

        if(defaultSettings.doColorFade) {
            colorFade(defaultSettings.delayTime, defaultSettings.animationTime, defaultSettings.colorPalette);
        }
    }

    // random colors, default timer
    function colorFade(delayTime, animationTime, colorPalette) {       
        // generate random rgb values (formerly between 100 and 255)
        var colors = [0, 0, 0];
        for(var i = 0; i < 3; i++) {
            colors[i] = Math.floor(Math.random() * colorPalette[1]) + colorPalette[0];
        }


        // transform rgb parts into hex value
        var colorHex = jQuery.Color({ red: colors[0], green: colors[1], blue: colors[2], alpha: 50 });
        console.log("Next color: " + colorHex);

        // animate
        // TODO: wie kann man body zu variable machen?!
        $('body').animate({
            //backgroundColor: jQuery.Color([colors[0], colors[1], colors[2], 155])
            backgroundColor: colorHex
        }, animationTime, function() {
            // when animation finishes, back to managing function
            console.log("fade finished - timeout starts");
            setTimeout(function() {
                $(document).controlColorFade({
                    animationTime: animationTime,
                    delayTime: delayTime,
                    colorPalette: colorPalette
                });
            }, delayTime);  
        });
    };

    $.fn.controlCursor = function(options) {
        var cursorTimeout;
        console.log("control cursor called - options: " + options);
        var defaultSettings = $.extend({
            doControlCursor: true,  // true: active cursor hiding
            timeout: 1000           // defines how much time (ms) should pass before cursor is hidden
        }, options );

        if(defaultSettings.doControlCursor) {
            $('#text').mousemove(function(event) {
                console.log("MOUSEMOVE");
                $('#text').css('cursor', 'auto');
                clearTimeout(cursorTimeout);
                cursorTimeout = setTimeout(function() {
                    $('#text').css('cursor', 'none');
                    console.log("MOUSEMOVE TIMEOUT");
                }, defaultSettings.timeout);
            }); 
        }
    }

    $.fn.controlScrollbar = function(options) {
        console.log("control scrollbar called - options: " + options);
        var defaultSettings = $.extend({
            doControlScrollbar: true,  // true: active scrollbar hiding
            timeout: 1000               // defines how much time (ms) should pass before cursor is hidden
        }, options );

        if(defaultSettings.doControlScrollbar) {
                var scrollbarTimeout;
                $(window).scroll(function() {
                    console.log("SCROLL");
                    $('html').addClass('showScrollbar');
                    clearTimeout(scrollbarTimeout);
                    scrollbarTimeout = setTimeout(function() {
                        $('html').removeClass('showScrollbar');
                        console.log("SCROLL TIMEOUT");
                    }, defaultSettings.timeout);
                }); 
            }
        }

}( jQuery ));