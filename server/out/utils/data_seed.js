"use strict";
var express = require("express");
var app = express();
var Influx = require('influx');
// ============================================ INFLUXDB ========================================== //
var influxClient = new Influx.InfluxDB('http://localhost:8086/cognide');
// =============================================================================================== //
console.log("Starting data seeding...");
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
    console.log("Sending response: " + JSON.stringify(metrics));
    console.log("Saving into InfluxDB.");
    influxClient.writePoints([
        {
            measurement: 'cognide',
            tags: { artifact: 'helloWorld.cs', line: '1' },
            fields: { attention: metrics.eSense.attention, meditation: metrics.eSense.meditation },
        }
    ]);
}
//# sourceMappingURL=data_seed.js.map