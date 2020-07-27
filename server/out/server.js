"use strict";
// var message: string = "Hello World";
Object.defineProperty(exports, "__esModule", { value: true });
// console.log(`Message: ${message}`);
var net = require('net');
var express = require("express");
var app = express();
var client = new net.Socket();
var Influx = require('influx');
var ThinkGearAdapter_1 = require("./adapter/ThinkGear/ThinkGearAdapter");
var InfluxDBRecorder_1 = require("./recorder/InfluxDB/InfluxDBRecorder");
var MetricEntity_1 = require("./recorder/MetricEntity");
var adapter = new ThinkGearAdapter_1.ThinkGearAdapter();
var recorder = new InfluxDBRecorder_1.InfluxDBRecorder();
// ========================================= COGNIDE SERVER ======================================== //
app.listen(3000, function () {
    console.log("Server running on port 3000");
});
// =================================  CLIENT REQUESTS  ============================== //
// http://localhost:3000/metrics?clientId=123&artifactName=helloWorld.js&lineNumber=24
app.get("/metrics", function (req, res, next) {
    console.info(Date.now() + " - received request from CognIDE Extension: " + req);
    var measurement = adapter.getMetrics();
    console.debug("Retrieved from adapter: " + measurement);
    var metric = new MetricEntity_1.MetricEntity(req.query.clientId, req.query.artifactName, req.query.lineNumber, measurement.attention, measurement.meditation);
    recorder.Save(metric);
    res.send(JSON.stringify(measurement));
});
client.on("close", function () {
    console.log(Date.now() + " - Disconnected");
});
//# sourceMappingURL=server.js.map