var http = require('http');
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end();
}).listen(1337);
console.log("Web Server running at http://127.0.0.1:1337");

var nowjs = require('now');
var everyone = nowjs.initialize(httpServer);

everyone.now.sendMessage = function (message) {
    everyone.now.receiveMessage(message);
}