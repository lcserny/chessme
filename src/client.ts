import dgram, {RemoteInfo} from "dgram";

// UDP client example
let client = dgram.createSocket("udp4");
client.on("error", function (err: Error) {
    console.log("client error:n" + err.stack);
    client.close();
});
client.on("message", function (msg: Buffer, rinfo: RemoteInfo) {
    console.log("client got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
});
client.on("listening", function () {
    let address = client.address();
    console.log("client listening " + address.address + ":" + address.port);
});
client.bind(51234, function () {
    client.setBroadcast(true);
});
let message = Buffer.from("Hi");
client.send(message, 0, message.length, 41234, '255.255.255.255');