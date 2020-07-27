"use strict";
var net = require('net');
var PORT = 13854;
var HOST = '127.0.0.1';
// Create Server instance 
var server = net.createServer(onClientConnected);
server.listen(PORT, HOST, function () {
    console.log("server listening on " + server.address());
});
function onClientConnected(sock) {
    var remoteAddress = sock.remoteAddress + ":" + sock.remotePort;
    console.log('new client connected: %s', remoteAddress);
    sock.on('close', function () {
        console.log("connection from " + remoteAddress + " closed");
    });
    sock.on('error', function (err) {
        console.log("Connection " + remoteAddress + " error: " + err.message);
    });
    while (true) {
        var metrics = {
            eSense: {
                "attention": ((Math.random() * 255) * 100 / 255),
                "meditation": ((Math.random() * 255) * 100 / 255)
            },
            eegPower: {
                "alpha": Math.random(),
                "beta": Math.random(),
                "gama": Math.random(),
                "delta": Math.random(),
                "theta": Math.random()
            }
        };
        var response = JSON.stringify(metrics);
        sock.write(response);
    }
}
//# sourceMappingURL=mocked_connector.js.map