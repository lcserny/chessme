import dgram from "dgram";

// UDP client example
let socket = dgram.createSocket("udp4");
socket.bind(function () {
    socket.setBroadcast(true);
});
let message = Buffer.from("Hi");
socket.send(message, 0, message.length, 41234, '255.255.255.255', function (err, bytes) {
    socket.close();
});