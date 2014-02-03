var http = require('http'),
    io = require('socket.io'),
    sys = require('sys'),
    express = require('express');

var port = 8080;

//Upgraded for express 3.x
var app = express();
app.use('/', express.static(__dirname + '/'));
app.use('/Scripts', express.static(__dirname + 'Scripts'));
app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));

//socket requires a http server
var socket = io.listen(http.createServer(app).listen(port));
sys.log('Started server on http://localhost:' + port + '/');

socket.sockets.on('connection', function (client) {
    var connected = true;

    //On receiving the message event - echo to console
    client.on('message', function (m) {
        sys.log('Message received: ' + m);
    });

    client.on('disconnect', function () {
        connected = false;
    });

    sys.log(client.name + ' connected');

    client.on('distributeMessage', function (data) {
        sys.log('message from client: ' + data);
        io.sockets.emit('receiveMessage', data);
    });

    //Loop function that sends the current date time
    //var tick = function () {
    //    if (!connected) {
    //        return;
    //    }

    //    var dateTime = new Date();

    //    console.log("Sending " + dateTime);

    //    //This will be converted to a string and sent
    //    client.send(dateTime);

    //    //This will send an object across
    //    client.emit('customEvent', { 'time': dateTime });
    //    setTimeout(tick, 1000);
    //};

    //tick();
});


var gpio4;
//nowjs.on("connect", function () {
//    console.log("Joined: " + this.now.name);
//});

//nowjs.on("disconnect", function () {
//    console.log("Left: " + this.now.name);
//});


//everyone.now.distributeMessage = function (message) {
//    everyone.now.receiveMessage(this.now.name, message);
//};

//gpio4 = gpio.export(4, {
//    ready: function () {
//    }
//});
//everyone.now.turnLEDon = function () {
//    gpio4.set(1);
//    everyone.now.receiveMessage(this.now.name, "turned the light on");
//    console.log("light on");
//};

//everyone.now.turnLEDoff = function () {
//    gpio4.reset();
//    everyone.now.receiveMessage(this.now.name, "turned the light off");
//    console.log("light off");
//};

//process.on('SIGINT', function () {
//    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
//    // some other closing procedures go here
//    gpio4.unexport(); console.log("closing gpio");
//    process.exit();
//})
