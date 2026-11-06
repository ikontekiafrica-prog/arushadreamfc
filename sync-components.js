/**
 * Arusha Dream Football Centre - Unified Header & Footer Sync Script
 * 
 * Usage: node sync-components.js
 * 
 * Synchronizes header.html and footer.html into js/layout.js as offline fallbacks.
 * Note: When running on a local web server (http://arushadreamfc.test), 
 * edits to header.html and footer.html are loaded dynamically in real-time 
 * without needing to run this script!
 */
const fs = require('fs');
const path = require('path');

const root = __dirname;
const headerHtmlPath = path.join(root, 'header.html');
const footerHtmlPath = path.join(root, 'footer.html');
const layoutJsPath = path.join(root, 'js/layout.js');
const headerJsPath = path.join(root, 'js/header.js');

if (!fs.existsSync(headerHtmlPath)) {
  console.error('Error: header.html not found!');
  process.exit(1);
}
if (!fs.existsSync(footerHtmlPath)) {
  console.error('Error: footer.html not found!');
  process.exit(1);
}

const headerContent = fs.readFileSync(headerHtmlPath, 'utf8');
const footerContent = fs.readFileSync(footerHtmlPath, 'utf8');

const layoutScript = `/**
 * Arusha Dream Football Centre - Unified Master Layout Component Loader
 * 
 * Automatically loads the single master header (header.html) and 
 * single master footer (footer.html) across every page of the website.
 * 
 * Edit header.html or footer.html once and all pages update immediately.
 */
(function () {
  var fallbackHeaderHTML = ${JSON.stringify(headerContent)};
  var fallbackFooterHTML = ${JSON.stringify(footerContent)};

  function highlightActive() {
    var rawPath = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0].split('#')[0];
    if (rawPath === '' || rawPath === '/') rawPath = 'index.html';

    var links = document.querySelectorAll('#site-header-inner .nav.navbar-nav > li > a');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      var li = link.parentElement;
      if (!li.classList.contains('dropdown')) {
        if (
          href === rawPath ||
          (rawPath.indexOf('news') === 0 && href === 'news.html') ||
          (rawPath === 'safeguarding.html' && href === 'programs.html')
        ) {
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

  function initHeader() {
    var target = document.getElementById('site-header');
    if (!target) return;

    if (!target.innerHTML.trim()) {
      target.innerHTML = fallbackHeaderHTML;
      highlightActive();
      setupStickyHeader();
    }

    if (window.location.protocol.indexOf('http') === 0) {
      fetch('header.html?v=' + Date.now())
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.text();
        })
        .then(function (html) {
          if (html && html.trim()) {
            target.innerHTML = html;
            highlightActive();
            setupStickyHeader();
          }
        })
        .catch(function () {});
    }
  }

  function initFooter() {
    var target = document.getElementById('site-footer');
    if (!target) return;

    if (!target.innerHTML.trim()) {
      target.innerHTML = fallbackFooterHTML;
    }

    if (window.location.protocol.indexOf('http') === 0) {
      fetch('footer.html?v=' + Date.now())
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.text();
        })
        .then(function (html) {
          if (html && html.trim()) {
            target.innerHTML = html;
          }
        })
        .catch(function () {});
    }
  }

  initHeader();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initHeader();
      initFooter();
    });
  } else {
    initHeader();
    initFooter();
  }
})();
`;

fs.writeFileSync(layoutJsPath, layoutScript, 'utf8');
console.log('✓ Synchronized header.html and footer.html -> js/layout.js');

// Also update js/header.js to delegate to js/layout.js for backwards compatibility
fs.writeFileSync(headerJsPath, `// Backwards-compatibility wrapper\nrequire && typeof require === 'function' ? null : null;\n` + layoutScript, 'utf8');
console.log('✓ Synchronized js/header.js');
