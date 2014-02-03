var socket = io.connect();

socket.on('connect', function () {
    $('#status').text(this.name + ' Connected');
});
socket.on('message', function (m) {
    $('#message').text(m);
});
socket.on('disconnect', function () {
    $('#status').text(this.name + ' Disconnected');
});

socket.on('receiveMessage', function (message) {
    $("#messages").prepend("<br>" + message);
});
$(function () {
    $("#send-button").click(function () {
        socket.emit('distributeMessage', $("#text-input").val());
        $("#text-input").val("");
    });

    socket.name = prompt("What's your name?", "");

    socket.emit('message', 'this is a test message');
});