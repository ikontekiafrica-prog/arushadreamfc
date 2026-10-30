const fs = require('fs');
const path = require('path');

const root = 'd:/my-workshop/projects/arushadreamfc';
const headerHtmlPath = path.join(root, 'header.html');
const headerJsPath = path.join(root, 'js/header.js');

if (!fs.existsSync(headerHtmlPath)) {
  console.error('header.html not found!');
  process.exit(1);
}

const htmlContent = fs.readFileSync(headerHtmlPath, 'utf8');

// 1. Sync into js/header.js
let jsContent = fs.readFileSync(headerJsPath, 'utf8');
const escapedLines = htmlContent.split('\n').map(line => {
  const escaped = line.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r/g, '');
  return "'" + escaped + "\\n'";
}).join(' +\n');

const regex = /var masterHeaderHTML =\s*[\s\S]*?;\n\n  function highlightActive/;
const replacement = 'var masterHeaderHTML = \n' + escapedLines + ';\n\n  function highlightActive';

if (regex.test(jsContent)) {
  jsContent = jsContent.replace(regex, replacement);
  fs.writeFileSync(headerJsPath, jsContent, 'utf8');
  console.log('✓ Synchronized header.html -> js/header.js');
}

// 2. Sync into all HTML pages directly
const pages = [
  { file: 'index.html', active: 'index.html' },
  { file: 'about.html', active: 'about.html' },
  { file: 'team.html', active: 'team.html' },
  { file: 'news.html', active: 'news.html' },
  { file: 'news-detail.html', active: 'news.html' },
  { file: 'contact.html', active: 'contact.html' }
];

pages.forEach(p => {
  const filePath = path.join(root, p.file);
  if (!fs.existsSync(filePath)) return;

  let pageHtml = fs.readFileSync(filePath, 'utf8');

  let customHeader = htmlContent;
  customHeader = customHeader.replace(/<li class="active"><a href="[^"]+">/g, (m) => m.replace('class="active"', ''));
  customHeader = customHeader.replace(
    new RegExp('<li><a href="' + p.active + '">'),
    '<li class="active"><a href="' + p.active + '">'
  );

  const blockToInject = customHeader + '\n         <script src="js/header.js"></script>';
  const targetRegex = /(?:<div id="site-header"><\/div>\s*<script src="js\/header\.js"><\/script>|<header id="site-header-inner">[\s\S]*?<\/header>(?:\s*<script src="js\/header\.js"><\/script>)?)/;

  if (targetRegex.test(pageHtml)) {
    pageHtml = pageHtml.replace(targetRegex, blockToInject);
    fs.writeFileSync(filePath, pageHtml, 'utf8');
    console.log('✓ Synchronized header.html -> ' + p.file);
  }
});

console.log('Master Global Header synchronization complete!');
