/**
 * Arusha Dream Football Centre - Unified Master Global Header Component
 *
 * This single file controls the header across all pages on the website.
 * Any edit made to this header is instantly reflected across every page.
 */
(function () {
  // Master Header HTML Template
  var masterHeaderHTML = 
'<!-- ==================================================================\n' +
'     ARUSHA DREAM FOOTBALL CENTRE - GLOBAL MASTER HEADER\n' +
'     This is the single header called across all pages of the site.\n' +
'     Edit here (or in js/header.js) to update all pages simultaneously.\n' +
'================================================================== -->\n' +
'<header id="site-header-inner">\n' +
'   <div class="brand-tricolor-ribbon"></div>\n' +
'   <div class="container">\n' +
'      <div class="header-top">\n' +
'         <div class="row">\n' +
'            <div class="col-md-5 col-sm-12">\n' +
'               <div class="full">\n' +
'                  <div class="logo">\n' +
'                     <a href="index.html"><img src="images/logo.png" alt="Arusha Dream Football Centre" /></a>\n' +
'                  </div>\n' +
'               </div>\n' +
'            </div>\n' +
'            <div class="col-md-7 col-sm-12">\n' +
'               <div class="right_top_section">\n' +
'                  <!-- social icon -->\n' +
'                  <ul class="social-icons pull-left">\n' +
'                     <li><a class="facebook" href="https://wa.me/255752553876" target="_blank" rel="noopener" title="WhatsApp Chat"><i class="fa fa-whatsapp"></i></a></li>\n' +
'                     <li><a class="facebook" href="https://facebook.com" target="_blank" rel="noopener" title="Facebook"><i class="fa fa-facebook"></i></a></li>\n' +
'                     <li><a class="twitter" href="https://instagram.com" target="_blank" rel="noopener" title="Instagram"><i class="fa fa-instagram"></i></a></li>\n' +
'                     <li><a class="youtube" href="https://youtube.com" target="_blank" rel="noopener" title="YouTube"><i class="fa fa-youtube-play"></i></a></li>\n' +
'                  </ul>\n' +
'                  <!-- end social icon -->\n' +
'                  <!-- button section -->\n' +
'                  <ul class="login">\n' +
'                     <li class="login-modal">\n' +
'                        <a href="sponsors.html#support-us" class="login"><i class="fa fa-heart"></i>Support Us</a>\n' +
'                     </li>\n' +
'                     <li>\n' +
'                        <div class="cart-option">\n' +
'                           <a href="join.html"><i class="fa fa-futbol-o"></i>Join Free</a>\n' +
'                        </div>\n' +
'                     </li>\n' +
'                  </ul>\n' +
'                  <!-- end button section -->\n' +
'               </div>\n' +
'            </div>\n' +
'         </div>\n' +
'      </div>\n' +
'      <div class="header-bottom">\n' +
'         <div class="row">\n' +
'            <div class="col-md-12">\n' +
'               <div class="full">\n' +
'                  <div class="main-menu-section">\n' +
'                     <div class="menu">\n' +
'                        <nav class="navbar navbar-inverse">\n' +
'                           <div class="navbar-header">\n' +
'                              <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".js-navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">\n' +
'                              <span class="sr-only">Toggle navigation</span>\n' +
'                              <span class="icon-bar"></span>\n' +
'                              <span class="icon-bar"></span>\n' +
'                              <span class="icon-bar"></span>\n' +
'                              </button>\n' +
'                              <a class="navbar-brand" href="index.html">Menu</a>\n' +
'                           </div>\n' +
'                           <div class="collapse navbar-collapse js-navbar-collapse">\n' +
'                              <ul class="nav navbar-nav">\n' +
'                                 <li><a href="index.html">Home</a></li>\n' +
'                                 <li><a href="about.html">About</a></li>\n' +
'                                 <li class="dropdown mega-dropdown">\n' +
'                                    <a href="programs.html" class="dropdown-toggle" data-toggle="dropdown">Programs <span class="caret"></span></a>				\n' +
'                                    <ul class="dropdown-menu mega-dropdown-menu">\n' +
'                                       <li class="col-sm-8">\n' +
'                                          <ul>\n' +
'                                             <li class="dropdown-header">Ages 5 to Under-20 Development</li>\n' +
'                                             <div id="menCollection" class="carousel slide" data-ride="carousel">\n' +
'                                                <div class="carousel-inner">\n' +
'                                                   <div class="item active">\n' +
'                                                      <div class="banner-for-match"><a href="programs.html"><img class="img-responsive" src="images/client/squad-orange-grassroots.jpg" alt="Grassroots Football Training" /></a></div>\n' +
'                                                   </div>\n' +
'                                                   <div class="item">\n' +
'                                                      <div class="banner-for-match"><a href="programs.html"><img class="img-responsive" src="images/client/squad-blue-u17.jpg" alt="Youth Football Academy" /></a></div>\n' +
'                                                   </div>\n' +
'                                                   <div class="item">\n' +
'                                                      <div class="banner-for-match"><a href="programs.html"><img class="img-responsive" src="images/client/women-team-official.jpg" alt="Girls and Womens Football" /></a></div>\n' +
'                                                   </div>\n' +
'                                                </div>\n' +
'                                                <a class="left carousel-control" href="#menCollection" role="button" data-slide="prev">\n' +
'                                                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\n' +
'                                                <span class="sr-only">Previous</span>\n' +
'                                                </a>\n' +
'                                                <a class="right carousel-control" href="#menCollection" role="button" data-slide="next">\n' +
'                                                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n' +
'                                                <span class="sr-only">Next</span>\n' +
'                                                </a>\n' +
'                                             </div>\n' +
'                                          </ul>\n' +
'                                       </li>\n' +
'                                       <li class="col-sm-4">\n' +
'                                          <ul class="menu-inner">\n' +
'                                             <li class="dropdown-header"><a href="programs.html" style="color: inherit; text-decoration: none;">All Programs Overview</a></li>\n' +
'                                             <li><a href="programs.html#u8">U6 – U8 Grassroots</a></li>\n' +
'                                             <li><a href="programs.html#u11">U9 – U11 Ball Mastery</a></li>\n' +
'                                             <li><a href="programs.html#u13">U12 – U13 Technique</a></li>\n' +
'                                             <li><a href="programs.html#u15">U14 – U15 Tactics & Speed</a></li>\n' +
'                                             <li><a href="programs.html#u17">U16 – U17 Competition</a></li>\n' +
'                                             <li><a href="programs.html#u20">U18 – U20 Elite Squad</a></li>\n' +
'                                             <li><a href="programs.html#girls">Girls\' & Women\'s Football</a></li>\n' +
'                                             <li><a href="safeguarding.html">Child Safeguarding</a></li>\n' +
'                                          </ul>\n' +
'                                       </li>\n' +
'                                    </ul>\n' +
'                                 </li>\n' +
'                                 <li><a href="sponsors.html">Sponsors</a></li>\n' +
'                                 <li><a href="join.html">Join Free</a></li>\n' +
'                                 <li><a href="team.html">Team</a></li>\n' +
'                                 <li><a href="news.html">News</a></li>\n' +
'                                 <li><a href="gallery.html">Gallery</a></li>\n' +
'                                 <li><a href="contact.html">Contact</a></li>\n' +
'                              </ul>\n' +
'                           </div>\n' +
'                        </nav>\n' +
'                        <div class="search-bar">\n' +
'                           <div id="imaginary_container">\n' +
'                              <form id="site-search-form" onsubmit="handleSiteSearch(event); return false;">\n' +
'                                 <div class="input-group stylish-input-group">\n' +
'                                    <input type="text" id="site-search-input" class="form-control" placeholder="Search Arusha Dream FC..." autocomplete="off">\n' +
'                                    <span class="input-group-addon">\n' +
'                                    <button type="submit" aria-label="Search"><i class="fa fa-search" aria-hidden="true"></i></button>  \n' +
'                                    </span>\n' +
'                                 </div>\n' +
'                              </form>\n' +
'                           </div>\n' +
'                        </div>\n' +
'                     </div>\n' +
'                  </div>\n' +
'               </div>\n' +
'            </div>\n' +
'         </div>\n' +
'      </div>\n' +
'   </div>\n' +
'</header>\n' +
'\n';

  function highlightActive() {
    var rawPath = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0].split('#')[0];
    if (rawPath === '' || rawPath === '/') rawPath = 'index.html';

    var links = document.querySelectorAll('#site-header-inner .nav.navbar-nav > li > a');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      var li = link.parentElement;
      if (!li.classList.contains('dropdown')) {
        if (href === rawPath || (rawPath === 'news-detail.html' && href === 'news.html')) {
          li.classList.add('active');
        } else {
          li.classList.remove('active');
        }
      }
    });
  }

  function setupStickyHeader() {
    var headerEl = document.querySelector('header#site-header-inner') || document.querySelector('header');
    if (!headerEl) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 120) {
        headerEl.classList.add('header-fixed-scrolled');
      } else {
        headerEl.classList.remove('header-fixed-scrolled');
      }
    });
  }

  function renderHeader() {
    var existingHeader = document.querySelector('header#site-header-inner');
    if (!existingHeader) {
      var target = document.getElementById('site-header');
      if (target) {
        target.outerHTML = masterHeaderHTML;
      } else {
        var headerOld = document.querySelector('header');
        if (headerOld) {
          headerOld.outerHTML = masterHeaderHTML;
        } else {
          document.write(masterHeaderHTML);
        }
      }
    }
    highlightActive();
    setupStickyHeader();
  }

  if (document.readyState === 'loading') {
    var target = document.getElementById('site-header');
    if (target) {
      renderHeader();
    } else {
      document.addEventListener('DOMContentLoaded', renderHeader);
    }
  } else {
    renderHeader();
  }
})();
