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
    '.svg': 'image/svg+xml'
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

server.listen(9131, '127.0.0.1', () => {
    run();
});

async function run() {
    const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
        '--headless', '--remote-debugging-port=9957', '--disable-gpu', 'about:blank'
    ]);
    await new Promise(r => setTimeout(r, 1200));

    http.get('http://127.0.0.1:9957/json', res => {
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

            await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
            await send('Page.navigate', { url: 'http://127.0.0.1:9131/index.html' });
            await new Promise(r => setTimeout(r, 2000));

            // State before click
            const before = await send('Runtime.evaluate', {
                expression: `(() => {
                    const el = document.querySelector('.navbar-collapse');
                    return JSON.stringify({ class: el.className, style: el.style.cssText, height: window.getComputedStyle(el).height });
                })()`,
                returnByValue: true
            });
            console.log('Before toggle:', before.result ? before.result.value : before);

            // Click toggle button
            await send('Runtime.evaluate', {
                expression: `(() => {
                    document.querySelector('.navbar-toggle').click();
                })()`
            });
            await new Promise(r => setTimeout(r, 100));

            const during = await send('Runtime.evaluate', {
                expression: `(() => {
                    const el = document.querySelector('.navbar-collapse');
                    return JSON.stringify({ class: el.className, style: el.style.cssText, height: window.getComputedStyle(el).height });
                })()`,
                returnByValue: true
            });
            console.log('100ms after toggle:', during.result.value);

            await new Promise(r => setTimeout(r, 600));

            const after = await send('Runtime.evaluate', {
                expression: `(() => {
                    const el = document.querySelector('.navbar-collapse');
                    return JSON.stringify({ class: el.className, style: el.style.cssText, height: window.getComputedStyle(el).height, display: window.getComputedStyle(el).display });
                })()`,
                returnByValue: true
            });
            console.log('700ms after toggle:', after.result.value);

            ws.close();
            edge.kill();
            server.close();
            process.exit(0);
        });
    });
}
