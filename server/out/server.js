"use strict";
// var message: string = "Hello World";
Object.defineProperty(exports, "__esModule", { value: true });
// console.log(`Message: ${message}`);
var net = require('net');
var express = require("express");
var app = express();
var client = new net.Socket();
var Influx = require('influx');
var ThinkGearAdapter_1 = require("./adapter/ThinkGearAdapter");
var adapter = new ThinkGearAdapter_1.ThinkGearAdapter();
// ========================================= COGNIDE SERVER ======================================== //
app.listen(3000, function () {
    console.log("Server running on port 3000");
});
// ============================================ INFLUXDB ========================================== //
var influx = new Influx.InfluxDB('http://:@host:8086/cognide');
// =================================  CLIENT REQUESTS  ============================== //
var sharedData = "";
app.get("/metrics", function (req, res, next) {
    console.log(Date.now() + " - received request from CognIDE Extension: " + req);
    console.log("Retrieved from adapter: " + adapter.getMetrics());
    res.send(sharedData);
    if (sharedData.poorSignalLevel > 200) {
        console.log(Date.now() + " - saving into InfluxDB.");
        influxClient.writePoints([
            {
                measurement: 'cognide',
                tags: { artifact: 'helloWorld.cs', line: '1' },
                fields: { attention: metrics.eSense.attention, meditation: metrics.eSense.meditation },
            }
        ]);
    }
});
client.on("close", function () {
    console.log(Date.now() + " - Disconnected");
});
