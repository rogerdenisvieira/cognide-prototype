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
import { MetricEntity } from "./entity/InfluxDB/MetricEntity";
import { IMetricEntity } from "./entity/IMetricEntity";
import { IMetricRequest } from "./dto/MetricRequest";
import { MockedAdapter } from "./adapter/MockedAdapter";

// var adapter: IAdapter = new ThinkGearAdapter(); 

//TODO: start using configuration to define which Adapter and Recorder will be used, preferably implementing a factory pattern
var adapter: IAdapter = new MockedAdapter();
var recorder: IRecorder = new InfluxDBRecorder();


// ========================================= COGNIDE SERVER ======================================== //

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// =================================  CLIENT REQUESTS  ============================== //


//TODO: segregate the controller logic from the application
// http://localhost:3000/metrics?clientId=123&artifactName=helloWorld.js&lineNumber=24
app.get("/metrics", (req: any, res: any, next: any) => {

    var request: IMetricRequest = req.query;
    console.info(`Received request from CognIDE Extension: ${JSON.stringify(request)}`);

    var measurement: IMeasurement = adapter.getMetrics();
    console.debug(`Retrieved from adapter: ${measurement}`);

    var metric: IMetricEntity = new MetricEntity(
        request.clientId,
        request.artifactName,
        request.lineNumber,
        measurement.attention,
        measurement.meditation
    );

    recorder.Save(metric);
    res.send(JSON.stringify(measurement));


});

client.on("close", () => {
    console.log(`${Date.now()} - Disconnected`);
});