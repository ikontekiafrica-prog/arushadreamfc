const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(__dirname, reqPath);
    if (!fs.existsSync(filePath)) {
        res.statusCode = 404;
        return res.end('Not found');
    }
    fs.createReadStream(filePath).pipe(res);
});

server.listen(9133, '127.0.0.1', () => {
    run();
});

async function run() {
    const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
        '--headless', '--remote-debugging-port=9959', '--disable-gpu', 'about:blank'
    ]);
    await new Promise(r => setTimeout(r, 1200));

    http.get('http://127.0.0.1:9959/json', res => {
        let raw = ''; res.on('data', c => raw += c);
        res.on('end', async () => {
            const targets = JSON.parse(raw);
            const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
            let msgId = 1;
            const send = (method, params = {}) => new Promise((resolve) => {
                const id = msgId++;
                const handler = e => {
                    const d = JSON.parse(e.data);
                    if (d.id === id) { ws.removeEventListener('message', handler); resolve(d); }
                };
                ws.addEventListener('message', handler);
                ws.send(JSON.stringify({ id, method, params }));
            });
            await new Promise(r => ws.addEventListener('open', r));
            await send('Page.enable');

            await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
            await send('Page.navigate', { url: 'http://127.0.0.1:9133/index.html' });
            await new Promise(r => setTimeout(r, 2000));

            const res = await send('Runtime.evaluate', {
                expression: "document.documentElement.outerHTML.slice(0, 1000)"
            });
            console.log('HTML snippet:', res.result.result.value);

            ws.close(); edge.kill(); server.close(); process.exit(0);
        });
    });
}
