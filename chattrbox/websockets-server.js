
// for start wscat -c ws://localhost:3001
var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});
console.log('websockets server started');

ws.on('connection', function (socket) {
    console.log('client connection established');

    socket.on('message', function (data) {
        console.log('message recivied: ' + data);
        socket.send(data);
    });
});