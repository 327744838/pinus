(function ($) {
    'use strict';
//----------------------------------------
// Language Bar
//----------------------------------------
    if ($('#language').length > 0) {
        $('.lang-select a').on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
            $('#language').slideToggle();
        });
    }
//----------------------------------------
// Fixed Header
//----------------------------------------
    if ($(".header-area,.menus-two,.header-three-area").length > 0 && $(window).width() > 1025) {
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 300)
            {
                $(".header-area,.menus-two,.header-three-area").addClass('fixed-header animated fadeInDown');
            } else
            {
                $(".header-area,.menus-two,.header-three-area").removeClass('fixed-header animated fadeInDown');
            }
        });
    }
    if ($("#toggle-menu").length > 0 && $(window).width() > 319 && $(window).width() < 1025) {
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 150)
            {
                $("#toggle-menu").addClass('fixed-header animated fadeInDown');
            } else
            {
                $("#toggle-menu").removeClass('fixed-header animated fadeInDown');
            }
        });
    }

//----------------------------------------
// Donate button
//----------------------------------------
    if ($('.donate-buttons').length > 0) {
        $('.donate-buttons span').on('click', function () {
            $('.donate-buttons span.active').removeClass('active');
            $(this).addClass('active');
        });
    }


//----------------------------------------
// Mobile Menu
//----------------------------------------
    if ($('.mobile-menu-has-children').length > 0) {
        var activeClass = true;
        $('.mobile-menu-has-children > a').on('click', function (e) {
            e.preventDefault();
            if (activeClass) {
                $(this).parent('li').addClass('active');
                activeClass = false;
            } else
            {
                $(this).parent('li').removeClass('active');
                activeClass = true;
            }
            $(this).next('ul').slideToggle();
        });
    }
    if ($('.mobile-menu-toggle a').length > 0)
    {
        $('.mobile-menu-toggle a').on('click', function (e) {
            e.preventDefault();
            $('.mobile-menu > ul').slideToggle();
        });
    }
//----------------------------------------
// Home Slider
//----------------------------------------
    function doAnimations(elems) {
        var animEndEv = 'webkitAnimationEnd animationend';

        elems.each(function () {
            var $this = $(this),
                    $animationType = $this.data('animation');
            $this.addClass($animationType).one(animEndEv, function () {
                $this.removeClass($animationType);
            });
        });
    }
    var $myCarousel = $('#home-two-crousel');
    var $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
    $myCarousel.carousel();
    doAnimations($firstAnimatingElems);
    $myCarousel.on('slide.bs.carousel', function (e) {
        var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
        doAnimations($animatingElems);
    });
//----------------------------------------
// Product Carousel
//----------------------------------------
    if ($('#product-crousel').length > 0) {
        $('#product-crousel').owlCarousel({
            items: 3,
            autoPlay: 3000,
            rewindNav: false,
            navigation: true,
            pagination: false,
            navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
            itemsMobile: [500, 1],
            itemsDesktopSmall: [1024, 2],
            itemsDesktop: [1199, 3]
        });
    }
    if ($('#video-carosel').length > 0) {
        $('#video-carosel').owlCarousel({
            items: 4,
            autoPlay: 3000,
            rewindNav: true,
            navigation: true,
            pagination: false,
            navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
        });
    }
//-------------------------------------------------------
// Popups
//-------------------------------------------------------
    if ($("#videoPlay, #about-video, .champ-video").length > 0) {
        $("#videoPlay, #about-video, .champ-video a").magnificPopup({
            disableOn: 0,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 300,
            preloader: false,
            fixedContentPos: false,
        });
    }
    $('.plus-icon').magnificPopup({
        type: 'image',
        mainClass: 'mfp-with-zoom',
        zoom: {
            enabled: true,
            duration: 300,
            easing: 'ease-in-out',
            opener: function (openerElement) {
                return openerElement.next('img') ? openerElement : openerElement.find('img');
            }
        },
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        }

    });
//-------------------------------------------------------
// Count Down
//-------------------------------------------------------
    $('#clock,.clock').countdown('2017/06/02').on('update.countdown', function (event) {
        var $this = $(this).html(event.strftime('' +
                '<div class="pull-left single-count"><span class="count-number">%D</span><span class="count-text">day%!d </span></div>' +
                '<div class="pull-left single-count"><span class="count-number">%H</span><span class="count-text">Hours</span></div>' +
                '<div class="pull-left single-count"><span class="count-number">%M</span><span class="count-text">minutes</span></div>' +
                '<div class="pull-left single-count last"><span class="count-number">%S</span><span class="count-text">seconds</span></div>'));
    });

//---------------------------------------------------
// Subscribe Form
//----------------------------------------------------
    if ($("#subscribe-form").length > 0) {
        $("#subscribe-form").submit(function (e) {
            e.preventDefault();
            var email = $("#subscribe-form input").val();
            if (email !== '')
            {
                $("#subscribe-form input").removeClass('throw-error');
                $("#subscribe-form button").html('Sending...');
                $.ajax({
                    type: "POST",
                    url: 'subscribe.php',
                    data: {email: email},
                    success: function (data)
                    {
                        $("#subscribe-form input").val('');
                        $("#subscribe-form input").attr('placeholder', 'Successfully Done!');
                        $("#subscribe-form button").html('Subscribe Now');
                    }
                });
            } else
            {
                $("#subscribe-form input").addClass('throw-error');
                $("#subscribe-form button").html('Subscribe Now');
            }
            return false;
        });

    }
//---------------------------------------
//  Contact Form Submit.
//---------------------------------------
    if ($(".sign-up-form").length > 0) {
        $(".sign-up-form").on('submit', function (e) {
            e.preventDefault();
            var allData = $(this).serialize();
            var required = 0;
            $(".sign-up-form button").html('Sending...');
            $(".required", this).each(function () {
                if ($(this).val() === '')
                {
                    $(this).addClass('throw-error');
                    required += 1;
                } else
                {
                    if ($(this).hasClass('throw-error'))
                    {
                        $(this).removeClass('throw-error');
                        if (required > 0)
                        {
                            required -= 0;
                        }
                    }
                }
            });
            //alert(required);
            if (required === 0)
            {
                $(".sign-up-form button").html('Sending...');
                $.ajax({
                    type: "POST",
                    url: 'mail.php',
                    data: {allData: allData},
                    success: function (data)
                    {
                        $(".sign-up-form input").val('');
                        $(".sign-up-form button").html('Successful!');
                    }
                });
            } else
            {
                $(".sign-up-form button").html('Sign UP');
            }
        });
    }
//----------------------------------------
// Counter
//----------------------------------------
    $('.facts-content h1').appear(function () {
        var $this = $(this);
        $({Counter: 0}).animate({Counter: $this.text()}, {
            duration: 2000,
            easing: 'swing',
            step: function () {
                $this.text(Math.ceil(this.Counter));
            }
        });
    });
//----------------------------------------
// Product Sort
//----------------------------------------
    if ($('#mixer').length > 0) {
        $('#mixer').joomShaper();
    }
//----------------------------------------
// Product Size Selector
//----------------------------------------
    if ($('#meta-selector').length > 0) {
        $('#meta-selector').on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
            $('.product-size-data').slideToggle('slow');
        });
        $('.product-size-data li').on('click', function () {
            var dataCont = $(this).attr('data-content');
            $('.product-size-selctor p').html(dataCont);
            $('.product-size-data').slideUp('slow');
            $('#meta-selector').removeClass('active');
        });
    }
//----------------------------------------
// Color Preset
//----------------------------------------
    if ($('.color-switcher').length > 0) {
        var switchs = true;
        $(".toggle-switch").on('click', function (e) {
            e.preventDefault();
            if (switchs)
            {
                $(this).addClass('active');
                $(".color-switcher").animate({'left': '0px'}, 400);
                switchs = false;
            } else
            {
                $(this).removeClass('active');
                $(".color-switcher").animate({'left': '-86px'}, 400);
                switchs = true;
            }
        });
        $(".style-choose a").on('click', function (e) {
            e.preventDefault();
            var color = $(this).data('color'),
                    url = 'css/presets/' + color + '.css',
                    logoSrc = 'images/colorpreset/' + color + '/logo.png';

            $('.logo-area img').attr('src', logoSrc);
            $('#color-preset').attr('href', url);
        });
    }
//----------------------------------------
// Search
//----------------------------------------
    $("#search-toggle").on('click', function (e) {
        e.preventDefault();
        $(".search-area").fadeIn(500);
    });
    $("#search-close").on('click', function (e) {
        e.preventDefault();
        $(".search-area").fadeOut(500);
    });
    $(document).mouseup(function (e)
    {
        var container = $(".search-area");
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            container.fadeOut(500);
        }
    });
})(jQuery);
