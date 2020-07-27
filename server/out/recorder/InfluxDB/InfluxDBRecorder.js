"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfluxDBRecorder = void 0;
var influx_1 = require("influx");
var InfluxDBEntity_1 = require("./InfluxDBEntity");
var InfluxDBRecorder = /** @class */ (function () {
    /**
     *
     */
    function InfluxDBRecorder() {
        this.CONNECTION = 'http://:@host:8086/cognide';
        this.client = new influx_1.InfluxDB(this.CONNECTION);
    }
    InfluxDBRecorder.prototype.Save = function (metricEntity) {
        var entity = new InfluxDBEntity_1.InfluxDBEntity();
        try {
            // this.client.writePoints(
            //     [
            //     ]
            // );
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    };
    return InfluxDBRecorder;
}());
exports.InfluxDBRecorder = InfluxDBRecorder;
//# sourceMappingURL=InfluxDBRecorder.js.map