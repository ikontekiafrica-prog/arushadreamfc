const fs = require('fs');

const headerHtmlPath = 'd:/my-workshop/projects/arushadreamfc/header.html';
const headerJsPath = 'd:/my-workshop/projects/arushadreamfc/js/header.js';

if (!fs.existsSync(headerHtmlPath)) {
  console.error('header.html not found!');
  process.exit(1);
}

const htmlContent = fs.readFileSync(headerHtmlPath, 'utf8');

let jsContent = fs.readFileSync(headerJsPath, 'utf8');

// Convert html content to escaped JS string lines
const escapedLines = htmlContent.split('\n').map(line => {
  const escaped = line.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r/g, '');
  return "'" + escaped + "\\n'";
}).join(' +\n');

const regex = /var masterHeaderHTML =\s*[\s\S]*?;\n\n  function highlightActive/;
const replacement = 'var masterHeaderHTML = \n' + escapedLines + ';\n\n  function highlightActive';

if (regex.test(jsContent)) {
  jsContent = jsContent.replace(regex, replacement);
  fs.writeFileSync(headerJsPath, jsContent, 'utf8');
  console.log('Successfully synchronized header.html -> js/header.js');
} else {
  console.error('Could not find masterHeaderHTML block in js/header.js');
}
