// var message: string = "Hello World";


// console.log(`Message: ${message}`);


var net = require('net')
var express = require("express");
var app = express();
var client = new net.Socket();
var Influx = require('influx');

import { ThinkGearAdapter } from "./adapter/ThinkGear/ThinkGearAdapter"
import { IMeasurement } from "./models/IMeasurement";
import { IAdapter } from "./adapter/IAdapter";
import { IRecorder } from "./recorder/IRecorder";
import { InfluxDBRecorder } from "./recorder/InfluxDB/InfluxDBRecorder";
import { MetricEntity } from "./recorder/MetricEntity";
import { IMetricEntity } from "./recorder/IMetricEntity";
import { IMetricRequest } from "./dto/MetricRequest";

var adapter: IAdapter = new ThinkGearAdapter();
var recorder: IRecorder = new InfluxDBRecorder();


// ========================================= COGNIDE SERVER ======================================== //

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// =================================  CLIENT REQUESTS  ============================== //

// http://localhost:3000/metrics?clientId=123&artifactName=helloWorld.js&lineNumber=24
app.get("/metrics", (req: IMetricRequest, res: { send: (arg0: string) => void; }, next: any) => {

    console.info(`${Date.now()} - received request from CognIDE Extension: ${req}`);


    var measurement: IMeasurement = adapter.getMetrics();
    console.debug(`Retrieved from adapter: ${measurement}`);

    var metric: IMetricEntity = new MetricEntity(
        req.clientId,
        req.artifactName,
        req.lineNumber,
        measurement.attention,
        measurement.meditation
    );

    recorder.Save(metric);
    res.send(JSON.stringify(measurement));
    
    
});



client.on("close", () => {
    console.log(`${Date.now()} - Disconnected`);
});