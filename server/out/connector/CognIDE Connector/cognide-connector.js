"use strict";
var SerialPort = require('serialport');
var port = new SerialPort('COM3', { baudRate: 9600 });
// Read data that is available but keep the stream in "paused mode"
port.on('readable', function () {
    console.log('Data:', port.read());
});
// Switches the port into "flowing mode"
port.on('data', function (data) {
    console.log('Data:', data);
});
// Pipe the data into another stream (like a parser or standard out)
// const lineStream = port.pipe(new Readline())
//# sourceMappingURL=cognide-connector.js.map