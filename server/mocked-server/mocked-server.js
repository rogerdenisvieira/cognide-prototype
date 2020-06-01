var express = require("express");
var app = express();
var Influx = require('influx')

// ============================================ INFLUXDB ========================================== //

const influxClient = new Influx.InfluxDB('http://localhost:8086/cognide')

// =============================================================================================== //

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

console.log('A request has been received.');

app.get("/metrics", (req, res, next) => {

    var metrics = {
        eSense: {

            "attention": ((Math.random() * 255) * 100 / 255),
            "meditation": ((Math.random() * 255) * 100 / 255)
        },
        eegPower: {
            "alpha": Math.random(),
            "beta": Math.random(),
            "gama":Math.random(),
            "delta":Math.random(),
            "theta":Math.random()
        }
    }

    console.log(`Sending response: ${JSON.stringify(metrics)}`)

    res.json(metrics);

    console.log(`Saving into InfluxDB.`)
    influxClient.writePoints([
        {
          measurement: 'cognide',
          tags: { artifact: 'helloWorld.cs', line: '1' },
          fields: { attention: metrics.eSense.attention, meditation: metrics.eSense.meditation },
        }
      ])

});


