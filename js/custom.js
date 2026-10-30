/******************************************
    File Name: custom.js
/****************************************** */

(function($) {
    "use strict";

    /* ==============================================
    AFFIX
    =============================================== */
    $('.megamenu').affix({
        offset: {
            top: 800,
            bottom: function() {
                return (this.bottom = $('.footer').outerHeight(true))
            }
        }
    })

    /* ==============================================
    BACK TOP
    =============================================== */
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > 1) {
            jQuery('.dmtop').css({
                bottom: "75px"
            });
        } else {
            jQuery('.dmtop').css({
                bottom: "-100px"
            });
        }
    });

    /* ==============================================
       LOADER -->
        =============================================== */

    $(document).ready(function() {
        $("#preloader").fadeOut(300);
        $(".preloader").fadeOut("fast");
    });
    $(window).on('load', function() {
        $("#preloader").fadeOut(200);
        $(".preloader").fadeOut("fast");
    });

    /* ==============================================
     FUN FACTS -->
     =============================================== */

    function count($this) {
        var current = parseInt($this.html(), 10);
        current = current + 50; /* Where 50 is increment */
        $this.html(++current);
        if (current > $this.data('count')) {
            $this.html($this.data('count'));
        } else {
            setTimeout(function() {
                count($this)
            }, 30);
        }
    }
    $(".stat_count, .stat_count_download").each(function() {
        $(this).data('count', parseInt($(this).html(), 10));
        $(this).html('0');
        count($(this));
    });

    /* ==============================================
     TOOLTIP -->
     =============================================== */
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-toggle="popover"]').popover()

    /* ==============================================
     CONTACT -->
     =============================================== */
    jQuery(document).ready(function() {
        $('#contactform').submit(function() {
            var action = $(this).attr('action');
            $("#message").slideUp(750, function() {
                $('#message').hide();
                $('#submit')
                    .after('<img src="images/ajax-loader.gif" class="loader" />')
                    .attr('disabled', 'disabled');
                $.post(action, {
                        first_name: $('#first_name').val(),
                        last_name: $('#last_name').val(),
                        email: $('#email').val(),
                        phone: $('#phone').val(),
                        select_service: $('#select_service').val(),
                        select_price: $('#select_price').val(),
                        comments: $('#comments').val(),
                        verify: $('#verify').val()
                    },
                    function(data) {
                        document.getElementById('message').innerHTML = data;
                        $('#message').slideDown('slow');
                        $('#contactform img.loader').fadeOut('slow', function() {
                            $(this).remove()
                        });
                        $('#submit').removeAttr('disabled');
                        if (data.match('success') != null) $('#contactform').slideUp('slow');
                    }
                );
            });
            return false;
        });
    });

    /* ==============================================
     CODE WRAPPER -->
     =============================================== */

    $('.code-wrapper').on("mousemove", function(e) {
        var offsets = $(this).offset();
        var fullWidth = $(this).width();
        var mouseX = e.pageX - offsets.left;

        if (mouseX < 0) {
            mouseX = 0;
        } else if (mouseX > fullWidth) {
            mouseX = fullWidth
        }

        $(this).parent().find('.divider-bar').css({
            left: mouseX,
            transition: 'none'
        });
        $(this).find('.design-wrapper').css({
            transform: 'translateX(' + (mouseX) + 'px)',
            transition: 'none'
        });
        $(this).find('.design-image').css({
            transform: 'translateX(' + (-1 * mouseX) + 'px)',
            transition: 'none'
        });
    });
    $('.divider-wrapper').on("mouseleave", function() {
        $(this).parent().find('.divider-bar').css({
            left: '50%',
            transition: 'all .3s'
        });
        $(this).find('.design-wrapper').css({
            transform: 'translateX(50%)',
            transition: 'all .3s'
        });
        $(this).find('.design-image').css({
            transform: 'translateX(-50%)',
            transition: 'all .3s'
        });
    });

})(jQuery);

/** TEXT ANIMATION **/

var TxtType = function(el, toRotate, period) {
                this.toRotate = toRotate;
                this.el = el;
                this.loopNum = 0;
                this.period = parseInt(period, 10) || 2000;
                this.txt = '';
                this.tick();
                this.isDeleting = false;
            };
         
            TxtType.prototype.tick = function() {
                var i = this.loopNum % this.toRotate.length;
                var fullTxt = this.toRotate[i];
         
                if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
                } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
                }
         
                this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
         
                var that = this;
                var delta = 200 - Math.random() * 100;
         
                if (this.isDeleting) { delta /= 2; }
         
                if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = true;
                } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
                }
         
                setTimeout(function() {
                that.tick();
                }, delta);
            };
         
            window.onload = function() {
                var elements = document.getElementsByClassName('typewrite');
                for (var i=0; i<elements.length; i++) {
                    var toRotate = elements[i].getAttribute('data-type');
                    var period = elements[i].getAttribute('data-period');
                    if (toRotate) {
                      new TxtType(elements[i], JSON.parse(toRotate), period);
                    }
                }
                // INJECT CSS
                var css = document.createElement("style");
                css.type = "text/css";
                css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
                document.body.appendChild(css);
            };   
   

         
            window.onload = function() {
                var elements = document.getElementsByClassName('typewrite');
                for (var i=0; i<elements.length; i++) {
                    var toRotate = elements[i].getAttribute('data-type');
                    var period = elements[i].getAttribute('data-period');
                    if (toRotate) {
                      new TxtType(elements[i], JSON.parse(toRotate), period);
                    }
                }
                // INJECT CSS
                var css = document.createElement("style");
                css.type = "text/css";
                css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
                document.body.appendChild(css);
            };
			
/** menu dropdown hover & click handling across desktop and small screens **/

$(document).ready(function(){
    // Dropdown hover handling
    $(".dropdown").on('mouseenter', function() {
        $(this).addClass('open');
        $(this).find('> .dropdown-menu').stop(true, true).slideDown(250);
    }).on('mouseleave', function() {
        $(this).removeClass('open');
        $(this).find('> .dropdown-menu').stop(true, true).slideUp(200);
    });

    // Dropdown click / tap toggle handling (crucial for mobile, tablets and touchscreens)
    $(".dropdown > a.dropdown-toggle").on('click', function(e) {
        var $dropdown = $(this).parent('.dropdown');
        var $menu = $dropdown.find('> .dropdown-menu');

        if ($dropdown.hasClass('open')) {
            $dropdown.removeClass('open');
            $menu.stop(true, true).slideUp(200);
        } else {
            $dropdown.addClass('open');
            $menu.stop(true, true).slideDown(250);
        }
        e.preventDefault();
        e.stopPropagation();
    });
});
		 
/** slider js **/

(function( $ ) {
         
         //Function to animate slider captions 
         function doAnimations( elems ) {
         //Cache the animationend event in a variable
         var animEndEv = 'webkitAnimationEnd animationend';
         
         elems.each(function () {
         var $this = $(this),
         $animationType = $this.data('animation');
         $this.addClass($animationType).one(animEndEv, function () {
         $this.removeClass($animationType);
         });
         });
         }
         
         //Variables on page load 
         var $myCarousel = $('#carousel-example-generic'),
         $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
         
         //Initialize carousel 
         $myCarousel.carousel({
              interval: 10000,
              pause: 'hover',
              wrap: true
          });
          
          //Animate captions in first slide on page load 
          doAnimations($firstAnimatingElems);
         
         
         //Other slides to be animated on carousel slide event 
         $myCarousel.on('slide.bs.carousel', function (e) {
         var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
         doAnimations($animatingElems);
         });  
         
         })(jQuery);
		 

		 