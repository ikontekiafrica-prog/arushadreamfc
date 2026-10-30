const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(__dirname, reqPath);
    if (!fs.existsSync(filePath)) {
        res.statusCode = 404;
        return res.end('Not found');
    }
    const ext = path.extname(filePath).toLowerCase();
    res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
    fs.createReadStream(filePath).pipe(res);
});

server.listen(9127, '127.0.0.1', () => {
    run();
});

async function run() {
    const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
        '--headless', '--remote-debugging-port=9952', '--disable-gpu', 'about:blank'
    ]);
    await new Promise(r => setTimeout(r, 1200));

    http.get('http://127.0.0.1:9952/json', res => {
        let raw = ''; res.on('data', c => raw += c);
        res.on('end', async () => {
            const targets = JSON.parse(raw);
            const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
            let msgId = 1;
            const send = (method, params = {}) => new Promise((resolve, reject) => {
                const id = msgId++;
                const handler = e => {
                    const d = JSON.parse(e.data);
                    if (d.id === id) { ws.removeEventListener('message', handler); resolve(d.result); }
                };
                ws.addEventListener('message', handler);
                ws.send(JSON.stringify({ id, method, params }));
            });
            await new Promise(r => ws.addEventListener('open', r));
            await send('Page.enable');
            
            const artifactDir = 'C:\\Users\\IkonTeki Africa\\.gemini\\antigravity\\brain\\7eb86dd8-bc3b-4e01-8f74-cfe2dc71287d';

            // 1. Mobile screen (iPhone 14 / 390x844)
            console.log('Setting mobile device metrics (390x844)...');
            await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
            await send('Page.navigate', { url: 'http://127.0.0.1:9127/index.html' });
            await new Promise(r => setTimeout(r, 2000));

            // Click hamburger
            console.log('1. Opening hamburger menu...');
            await send('Runtime.evaluate', { expression: "document.querySelector('.navbar-toggle').click();" });
            await new Promise(r => setTimeout(r, 600));

            // Trigger hover (mouseenter) on Programs
            console.log('2. Triggering hover on Programs dropdown...');
            await send('Runtime.evaluate', {
                expression: "document.querySelector('.dropdown.mega-dropdown').dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));"
            });
            await new Promise(r => setTimeout(r, 600));

            let shot = await send('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync(path.join(artifactDir, 'programs_mobile_hover.png'), Buffer.from(shot.data, 'base64'));
            console.log('✓ Captured programs_mobile_hover.png');

            // Scroll slightly down inside menu to view full development groups list
            await send('Runtime.evaluate', {
                expression: "document.querySelector('.menu-inner').scrollIntoView({ behavior: 'instant', block: 'nearest' });"
            });
            await new Promise(r => setTimeout(r, 400));
            shot = await send('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync(path.join(artifactDir, 'programs_mobile_expanded.png'), Buffer.from(shot.data, 'base64'));
            console.log('✓ Captured programs_mobile_expanded.png');

            // 2. Tablet screen (768x1024) Hover Test
            console.log('3. Testing Tablet screen (768x1024)...');
            await send('Emulation.setDeviceMetricsOverride', { width: 768, height: 1024, deviceScaleFactor: 2, mobile: false });
            await new Promise(r => setTimeout(r, 500));
            await send('Runtime.evaluate', {
                expression: "document.querySelector('.dropdown.mega-dropdown').dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));"
            });
            await new Promise(r => setTimeout(r, 500));
            shot = await send('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync(path.join(artifactDir, 'programs_tablet_hover.png'), Buffer.from(shot.data, 'base64'));
            console.log('✓ Captured programs_tablet_hover.png');

            const status = await send('Runtime.evaluate', {
                expression: `JSON.stringify({
                    display: window.getComputedStyle(document.querySelector('.mega-dropdown-menu')).display,
                    parentClass: document.querySelector('.mega-dropdown').className,
                    height: window.getComputedStyle(document.querySelector('.mega-dropdown-menu')).height,
                    width: window.getComputedStyle(document.querySelector('.mega-dropdown-menu')).width
                })`,
                returnByValue: true
            });
            console.log('Final Programs dropdown state:', status.result.value);

            ws.close();
            edge.kill();
            server.close();
            process.exit(0);
        });
    });
}
