//npm run dev
// for start wscat -c ws://localhost:3001

var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});
var messages = [];
console.log('websockets server started');

ws.on('connection', function (socket) {
    socket.approved = false;
    console.log('client connection established');

    socket.on('message', function (data) {
        if(data === 'honda'){
            socket.approved = true;
            messages.forEach(function (msg) {
                socket.send(msg);
            });
        }
        messages.push(data);
        ws.clients.forEach(function (clientSocket) {
            if(clientSocket.approved){
                clientSocket.send(data);
            }
        });
        console.log('message recivied: ' + data);
    });
});