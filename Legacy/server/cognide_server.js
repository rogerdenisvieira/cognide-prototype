var net = require('net')
var express = require("express");
var app = express();
var client = new net.Socket();
var Influx = require('influx');

const THINKGEAR_CONNECTOR_HOST = '127.0.0.1';
const THINKGEAR_CONNECTOR_PORT = 13854;

const INFLUX_HOST = '127.0.0.1';
const INFLUX_PORT = '8086';
const INFLUX_DATABASE = 'cognide';

const HANDSHAKE = { appName: "CognIDE", appKey: "aSimpleKey" };
const CONFIG = { enableRawOutput: false, format: "Json" };

// ============================================ INFLUXDB ========================================== //

const influxClient = new Influx.InfluxDB(`http://${INFLUX_HOST}:${INFLUX_PORT}/${INFLUX_DATABASE}`)

// ========================================= COGNIDE SERVER ======================================== //

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


// ==============================  THINKGEAR CONNECTOR COMMUNICATION ============================== //

client.connect(THINKGEAR_CONNECTOR_PORT, THINKGEAR_CONNECTOR_HOST, () => {

    var config = JSON.stringify(CONFIG);
    var handshake = JSON.stringify(HANDSHAKE);

    console.log(`Connected to ${THINKGEAR_CONNECTOR_HOST}:${THINKGEAR_CONNECTOR_PORT}.`);

    console.debug(`Sending handshake message: ${handshake}`)
    client.write(config);
    
    console.debug(`Sending config message: ${config}`)
    client.write(config);


});

// =================================  CLIENT REQUESTS  ============================== //

var sharedData = "";

client.on("data", rawData => {
    console.log(`${Date.now()} - ThinkGear Connector raw data: ${rawData}`);
    //console.log(`RECEIVED: Poor Signal Level: ${data.poorSignalLevel} Status: ${data.status}`);

    sharedData = JSON.parse(rawData);

});


app.get("/metrics", (req, res, next) => {
    console.log(`${Date.now()} - received request from CognIDE Extension: ${req}`);
    res.send(sharedData);

    
    if(sharedData.poorSignalLevel > 200){
        console.log(`${Date.now()} - saving into InfluxDB.`)
        influxClient.writePoints([
            {
              measurement: 'cognide',
              tags: { artifact: 'helloWorld.cs', line: '1' },
              fields: { attention: metrics.eSense.attention, meditation: metrics.eSense.meditation },
            }
          ]);
    }
    
    
});



client.on("close", () => {
    console.log(`${Date.now()} - Disconnected`);
});