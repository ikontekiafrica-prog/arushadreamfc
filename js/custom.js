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
     MATCH FIXTURE REAL-TIME COUNTDOWN -->
     =============================================== */
    function initMatchCountdown() {
        var el = document.getElementById('countdown-1');
        if (!el) return;

        // Calculate next upcoming Saturday at 16:00 (East Africa Time, UTC+3)
        function getNextMatchDate() {
            var now = new Date();
            var target = new Date(now);
            var day = target.getDay(); // 0 is Sunday, 6 is Saturday
            var daysUntilSaturday = (6 - day + 7) % 7;
            if (daysUntilSaturday === 0 && target.getHours() >= 16) {
                daysUntilSaturday = 7;
            }
            target.setDate(target.getDate() + daysUntilSaturday);
            target.setHours(16, 0, 0, 0);
            return target.getTime();
        }

        var matchTime = getNextMatchDate();

        function updateTimer() {
            var now = new Date().getTime();
            var distance = matchTime - now;

            if (distance < 0) {
                matchTime = getNextMatchDate();
                distance = matchTime - now;
            }

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            var daysEl = el.querySelector('.days');
            var hoursEl = el.querySelector('.hours');
            var minsEl = el.querySelector('.minutes');
            var secsEl = el.querySelector('.seconds');

            if (daysEl) daysEl.textContent = (days < 10 ? '0' : '') + days;
            if (hoursEl) hoursEl.textContent = (hours < 10 ? '0' : '') + hours;
            if (minsEl) minsEl.textContent = (minutes < 10 ? '0' : '') + minutes;
            if (secsEl) secsEl.textContent = (seconds < 10 ? '0' : '') + seconds;
        }

        updateTimer();
        setInterval(updateTimer, 1000);
    }
    initMatchCountdown();

    /* ==============================================
     UNIFIED FORM HANDLERS (Contact, Join, Support) -->
     Works seamlessly on Static Hosting (GitHub Pages) with WhatsApp Direct
     =============================================== */
    jQuery(document).ready(function($) {
        // 1. General Contact Form
        $('#contactform').on('submit', function(e) {
            e.preventDefault();
            var $form = $(this);
            var name = $('#name').val() || $('#first_name').val() || 'Friend';
            var email = $('#email').val() || '';
            var phone = $('#phone').val() || '';
            var msg = $('#message').val() || $('#comments').val() || '';

            var responseBox = $('#contact_form_responce');
            var whatsappText = encodeURIComponent('Hello Arusha Dream FC! My name is ' + name + ' (' + phone + ', ' + email + '). ' + msg);
            var whatsappUrl = 'https://wa.me/255752553876?text=' + whatsappText;

            responseBox.html(
                '<div class="alert alert-success" style="margin-top:20px; background:#dcfce7; color:#15803d; border:1px solid #86efac; border-radius:6px; padding:15px;">' +
                '<strong>Thank you, ' + name + '!</strong> Your inquiry has been recorded.<br>' +
                'For immediate response, click below to open chat directly with our Team Manager:<br>' +
                '<a href="' + whatsappUrl + '" target="_blank" class="btn-whatsapp-direct" style="margin-top:10px; display:inline-block;"><i class="fa fa-whatsapp"></i> Chat via WhatsApp Now</a>' +
                '</div>'
            ).fadeIn();

            $form[0].reset();
        });

        // 2. Player Registration Form
        $('#joinform').on('submit', function(e) {
            e.preventDefault();
            var playerName = $('#player_name').val();
            var dob = $('#player_dob').val();
            var category = $('#player_category').val();
            var parentName = $('#parent_name').val();
            var parentPhone = $('#parent_phone').val();
            var school = $('#player_school').val();
            var notes = $('#player_notes').val();

            var text = 'ADFC FREE REGISTRATION ENROLLMENT:\n' +
                '• Player: ' + playerName + ' (DOB: ' + dob + ')\n' +
                '• Age Category: ' + category + '\n' +
                '• School: ' + school + '\n' +
                '• Parent/Guardian: ' + parentName + ' (' + parentPhone + ')\n' +
                '• Notes: ' + notes;

            var waUrl = 'https://wa.me/255752553876?text=' + encodeURIComponent(text);

            $('#join_form_response').html(
                '<div class="alert alert-success" style="margin-top:20px; background:#dcfce7; color:#15803d; border:1px solid #86efac; border-radius:6px; padding:20px;">' +
                '<h4><i class="fa fa-check-circle"></i> Registration Details Submitted!</h4>' +
                '<p>Thank you for enrolling <strong>' + playerName + '</strong> with Arusha Dream FC. Training, kits, and equipment are 100% free.</p>' +
                '<p>Click below to notify Team Manager Engineer Matokeo Owden via WhatsApp to confirm the next training schedule:</p>' +
                '<a href="' + waUrl + '" target="_blank" class="btn-whatsapp-direct"><i class="fa fa-whatsapp"></i> Confirm Registration via WhatsApp</a>' +
                '</div>'
            ).fadeIn();

            $(this)[0].reset();
        });

        // 3. Sponsorship & Donation Form
        $('#supportform').on('submit', function(e) {
            e.preventDefault();
            var sponsorName = $('#sponsor_name').val();
            var sponsorEmail = $('#sponsor_email').val();
            var sponsorPhone = $('#sponsor_phone').val();
            var sponsorTier = $('#sponsor_tier').val();
            var sponsorMsg = $('#sponsor_message').val();

            var text = 'ADFC SPONSORSHIP / DONATION PLEDGE:\n' +
                '• Sponsor/Partner: ' + sponsorName + ' (' + sponsorPhone + ', ' + sponsorEmail + ')\n' +
                '• Sponsorship Type: ' + sponsorTier + '\n' +
                '• Message: ' + sponsorMsg;

            var waUrl = 'https://wa.me/255752553876?text=' + encodeURIComponent(text);

            $('#support_form_response').html(
                '<div class="alert alert-success" style="margin-top:20px; background:#ffedd5; color:#c2410c; border:1px solid #fdba74; border-radius:6px; padding:20px;">' +
                '<h4><i class="fa fa-heart"></i> Thank You for Supporting Our Young Talents!</h4>' +
                '<p>Your partnership pledge as <strong>' + sponsorTier + '</strong> has been received with deep gratitude.</p>' +
                '<p>Connect directly with Team Manager Eng. Matokeo Owden on WhatsApp to coordinate donation details or equipment handover:</p>' +
                '<a href="' + waUrl + '" target="_blank" class="btn-whatsapp-direct"><i class="fa fa-whatsapp"></i> Connect via WhatsApp Directly</a>' +
                '</div>'
            ).fadeIn();

            $(this)[0].reset();
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
			
/** menu **/

$(document).ready(function(){
          $(".dropdown").hover(            
              function() {
                  $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("400");
                  $(this).toggleClass('open');        
              },
              function() {
                  $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("400");
                  $(this).toggleClass('open');       
              }
          );
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
		 

		 

/* ==================================================================
   CLIENT-SIDE LIVE SEARCH ENGINE & MODAL
================================================================== */
var ADFC_SEARCH_INDEX = [
    { title: "Home Page", url: "index.html", snippet: "Arusha Dream Football Centre official portal, news, upcoming match fixtures, and youth announcements." },
    { title: "About Our Academy", url: "about.html", snippet: "Charity background, motto 'Dream • Develop • Believe • Achieve', core pillars, leadership and philosophy." },
    { title: "Programs & Age Groups (U6 to U20)", url: "programs.html", snippet: "Structured training pathways for boys & girls: U6-U8, U9-U11, U12-U13, U14-U15, U16-U17, U18-U20 and Women's Football." },
    { title: "U6 – U8 Grassroots Program", url: "programs.html#u8", snippet: "Introduction to football, movement, fun, coordination and enjoyment for young kids in Arusha." },
    { title: "U9 – U11 Ball Mastery", url: "programs.html#u11", snippet: "Basic techniques, ball mastery, 1v1 dribbling and early teamwork development." },
    { title: "U12 – U13 Technique & Spatial Awareness", url: "programs.html#u13", snippet: "Technical development, positional play, game understanding, and confidence building." },
    { title: "U14 – U15 Tactical & Physical Growth", url: "programs.html#u15", snippet: "Tactics, speed, strength, agility, and decision-making on the pitch." },
    { title: "U16 – U17 Competition Squad", url: "programs.html#u17", snippet: "Competitive match play, tactical discipline, and tournament exposure." },
    { title: "U18 – U20 Elite Academy", url: "programs.html#u20", snippet: "Elite career preparation, professional club pathways, and competitive excellence." },
    { title: "Girls' & Women's Football Programme", url: "programs.html#girls", snippet: "Grassroots and youth training empowering girls and young women in football." },
    { title: "Support Us & Donations", url: "sponsors.html#support-us", snippet: "100% Charity Football Model. Support training equipment, player kits, boots, M-Pesa, Tigo Pesa, and bank donations." },
    { title: "Sponsors & Strategic Partners", url: "sponsors.html", snippet: "Corporate CSR, kit branding, title partnerships, equipment sponsors, and community partners." },
    { title: "Donate via M-Pesa & Tigo Pesa", url: "sponsors.html#channels", snippet: "Mobile money donation details: M-Pesa +255 752 553 876 (Engineer Matokeo Owden)." },
    { title: "Join Free - Player Registration & Trials", url: "join.html", snippet: "100% free enrollment for boys & girls aged 5 to U20. No joining fee, no kit fees, all equipment provided." },
    { title: "Safeguarding & Child Protection Policy", url: "safeguarding.html", snippet: "Zero tolerance for abuse, safe travel, coach standards, and welfare contact led by Amina Bakari." },
    { title: "Team & Coaching Staff", url: "team.html", snippet: "Engineer Matokeo Owden (Team Manager), Head Coach Juma Nassor, Youth Coaches & Captains." },
    { title: "Latest News & Bulletins", url: "news.html", snippet: "Updates on enrolled players, tournament results, friendly matches, and education mentorship." },
    { title: "News: Over 65 Enrolled Young Players", url: "news-65-players.html", snippet: "Arusha Dream FC reaches milestone with over 65 registered kids in Sakina and Elerai." },
    { title: "News: Girls' Football Grassroots Training", url: "news-girls-football.html", snippet: "Dedicated training sessions empowering young female athletes in Arusha." },
    { title: "News: 100% Free Charity Model", url: "news-charity-model.html", snippet: "How zero-fee training is breaking economic barriers for aspiring footballers." },
    { title: "News: Football Meets Education Mentorship", url: "news-education-football.html", snippet: "Academic support and life skills development alongside pitch training." },
    { title: "Photo & Match Gallery", url: "gallery.html", snippet: "Stadium photos, training drills, kit distribution, and youth tournament moments." },
    { title: "Contact Us & Location", url: "contact.html", snippet: "Plot No. 36/37DD Kware Street, Elerai Ward, Sakina Area, Arusha, Tanzania." }
];

function handleSiteSearch(e) {
    if (e && e.preventDefault) e.preventDefault();
    var input = document.getElementById('site-search-input');
    if (!input) return;
    var query = input.value.trim().toLowerCase();
    if (!query) return;

    var modal = document.getElementById('site-search-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'site-search-modal';
        modal.innerHTML = 
            '<div class="search-modal-content">' +
                '<div class="search-modal-header">' +
                    '<h4><i class="fa fa-search"></i> Search Results for "<span id="modal-search-term"></span>"</h4>' +
                    '<button type="button" class="search-modal-close" onclick="closeSiteSearchModal()">&times;</button>' +
                '</div>' +
                '<div class="search-modal-body" id="modal-search-results"></div>' +
            '</div>';
        document.body.appendChild(modal);

        modal.addEventListener('click', function(evt) {
            if (evt.target === modal) closeSiteSearchModal();
        });
        document.addEventListener('keydown', function(evt) {
            if (evt.key === 'Escape') closeSiteSearchModal();
        });
    }

    document.getElementById('modal-search-term').textContent = query;
    var resultsBox = document.getElementById('modal-search-results');
    resultsBox.innerHTML = '';

    var matches = ADFC_SEARCH_INDEX.filter(function(item) {
        return item.title.toLowerCase().indexOf(query) !== -1 || item.snippet.toLowerCase().indexOf(query) !== -1;
    });

    if (matches.length === 0) {
        resultsBox.innerHTML = '<div style="padding: 20px; text-align: center; color: #64748b;">No results found for "<strong>' + query + '</strong>". Try searching for <em>programs, donate, register, team,</em> or <em>contact</em>.</div>';
    } else {
        matches.forEach(function(item) {
            var a = document.createElement('a');
            a.className = 'search-result-item';
            a.href = item.url;
            a.innerHTML = '<div class="search-result-title">' + item.title + '</div><p class="search-result-snippet">' + item.snippet + '</p>';
            resultsBox.appendChild(a);
        });
    }

    modal.classList.add('active');
}

function closeSiteSearchModal() {
    var modal = document.getElementById('site-search-modal');
    if (modal) modal.classList.remove('active');
}
