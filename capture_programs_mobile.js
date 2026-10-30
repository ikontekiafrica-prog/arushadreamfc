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

server.listen(9136, '127.0.0.1', () => {
    run();
});

async function run() {
    try {
        console.log('1. Launching Edge...');
        const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
            '--headless', '--remote-debugging-port=9962', '--disable-gpu', 'about:blank'
        ]);
        await new Promise(r => setTimeout(r, 1200));

        const pageTarget = await new Promise((resolve, reject) => {
            http.get('http://127.0.0.1:9962/json', res => {
                let raw = ''; res.on('data', c => raw += c);
                res.on('end', () => {
                    const targets = JSON.parse(raw);
                    const target = targets.find(t => t.type === 'page' && !t.url.startsWith('chrome-extension://'));
                    resolve(target || targets[0]);
                });
            }).on('error', reject);
        });

        console.log('2. Connected to target:', pageTarget.url);
        const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
        await new Promise(r => ws.addEventListener('open', r));

        let msgId = 1;
        const send = (method, params = {}) => new Promise((resolve, reject) => {
            const id = msgId++;
            const timer = setTimeout(() => {
                reject(new Error(`Timeout on ${method}`));
            }, 8000);
            const handler = e => {
                const d = JSON.parse(e.data);
                if (d.id === id) {
                    clearTimeout(timer);
                    ws.removeEventListener('message', handler);
                    if (d.error) reject(new Error(d.error.message || JSON.stringify(d.error)));
                    else resolve(d.result);
                }
            };
            ws.addEventListener('message', handler);
            ws.send(JSON.stringify({ id, method, params }));
        });

        await send('Page.enable');
        await send('DOM.enable');

        const artifactDir = 'C:\\Users\\IkonTeki Africa\\.gemini\\antigravity\\brain\\7eb86dd8-bc3b-4e01-8f74-cfe2dc71287d';

        // 1. Mobile screen (iPhone 14 / 390x844)
        console.log('3. Setting mobile emulation (390x844)...');
        await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

        console.log('4. Navigating to index.html...');
        await send('Page.navigate', { url: 'http://127.0.0.1:9136/index.html' });
        await new Promise(r => setTimeout(r, 2000));

        // Click hamburger
        console.log('5. Clicking hamburger button...');
        await send('Runtime.evaluate', {
            expression: `(() => {
                const btn = document.querySelector('.navbar-toggle');
                btn.click();
            })()`
        });
        await new Promise(r => setTimeout(r, 600));

        // Hover on Programs (mouseenter)
        console.log('6. Hovering on Programs dropdown...');
        await send('Runtime.evaluate', {
            expression: `(() => {
                const dd = document.querySelector('.dropdown.mega-dropdown');
                dd.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            })()`
        });
        await new Promise(r => setTimeout(r, 600));

        let shot1 = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(artifactDir, 'programs_mobile_hover.png'), Buffer.from(shot1.data, 'base64'));
        console.log('✓ programs_mobile_hover.png saved!');

        // Scroll slightly to capture full development groups list
        console.log('7. Scrolling down menu to view all age categories...');
        await send('Runtime.evaluate', {
            expression: `(() => {
                document.querySelector('.mega-dropdown-menu').scrollIntoView({ behavior: 'instant', block: 'start' });
            })()`
        });
        await new Promise(r => setTimeout(r, 500));

        let shot2 = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(artifactDir, 'programs_mobile_expanded.png'), Buffer.from(shot2.data, 'base64'));
        console.log('✓ programs_mobile_expanded.png saved!');

        // 2. Tablet View (768x1024)
        console.log('8. Testing Tablet View (768x1024)...');
        await send('Emulation.setDeviceMetricsOverride', { width: 768, height: 1024, deviceScaleFactor: 2, mobile: false });
        await send('Page.navigate', { url: 'http://127.0.0.1:9136/index.html' });
        await new Promise(r => setTimeout(r, 1800));

        // Hover on Programs in desktop/tablet navbar
        await send('Runtime.evaluate', {
            expression: `(() => {
                const dd = document.querySelector('.dropdown.mega-dropdown');
                dd.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            })()`
        });
        await new Promise(r => setTimeout(r, 600));

        let shot3 = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(artifactDir, 'programs_tablet_hover.png'), Buffer.from(shot3.data, 'base64'));
        console.log('✓ programs_tablet_hover.png saved!');

        console.log('All captures completed successfully!');
        ws.close();
        edge.kill();
        server.close();
        process.exit(0);
    } catch (err) {
        console.error('Error during test:', err);
        process.exit(1);
    }
}
