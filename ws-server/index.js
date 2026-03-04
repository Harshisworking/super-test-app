const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    console.log(ws);
    ws.send(JSON.stringify({ event: 'connected', msg: 'Hello from WS Backend!' }));
    ws.on('message', (data) => console.log('received: %s', data));
});
