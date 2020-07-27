"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThinkGearAdapter = void 0;
var net_1 = require("net");
var MeasurementModel_1 = require("../../models/MeasurementModel");
var ThinkGearAdapter = /** @class */ (function () {
    function ThinkGearAdapter() {
        var _this = this;
        this.config = require('../../config/IConfig');
        this.THINKGEAR_CONNECTOR_HOST = '127.0.0.1';
        this.THINKGEAR_CONNECTOR_PORT = 13854;
        this.HANDSHAKE = { appName: "CognIDE", appKey: "aSimpleKey" };
        this.CONFIG = { enableRawOutput: false, format: "Json" };
        this.client = new net_1.Socket();
        // ==============================  THINKGEAR CONNECTOR COMMUNICATION ============================== //
        this.client.connect(this.config.ThinkGear.Port, this.config.ThinkGear.Host, function () {
            var config = JSON.stringify(_this.CONFIG);
            var handshake = JSON.stringify(_this.HANDSHAKE);
            console.log("Connected to " + _this.config.ThinkGear.Host + ":" + _this.config.ThinkGear.Port + ".");
            console.debug("Sending handshake message: " + handshake);
            _this.client.write(config);
            console.debug("Sending config message: " + config);
            _this.client.write(config);
        });
    }
    ThinkGearAdapter.prototype.getMetrics = function () {
        var _a;
        var sharedData;
        this.client.setEncoding('utf-8');
        this.client.setTimeout(10000);
        var readData = (_a = this.client) === null || _a === void 0 ? void 0 : _a.read();
        console.log("Received data from ThinkGear:" + readData);
        // this.client.on("data", (rawData: string) => {
        //     console.log(`${Date.now()} - ThinkGear Connector raw data: ${rawData}`);
        //     //console.log(`RECEIVED: Poor Signal Level: ${data.poorSignalLevel} Status: ${data.status}`);
        //     sharedData = JSON.parse(rawData);
        // });
        return new MeasurementModel_1.MeasurementModel(12, 60);
    };
    return ThinkGearAdapter;
}());
exports.ThinkGearAdapter = ThinkGearAdapter;
//# sourceMappingURL=ThinkGearAdapter.js.map