const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 7471 });

server.on('connection', ws => {
    console.log('we have a message')
    ws.on('message', message => {
        // do something with the video stream
        console.log(message);
    });
});
