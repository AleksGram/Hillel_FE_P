var http = require('http');
var extract = require('./extract');
var reader = require('./reader');
var wss = require('./websockets-server');

var server = http.createServer(function (req, res) {
    console.log('Responding to a request.');
    var filePath = extract(req.url);
   reader(filePath, res);
});
server.listen(3028);