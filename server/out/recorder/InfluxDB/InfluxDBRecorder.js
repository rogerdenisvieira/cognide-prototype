"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfluxDBRecorder = void 0;
var influx_1 = require("influx");
var InfluxDBRecorder = /** @class */ (function () {
    /**
     *
     */
    function InfluxDBRecorder() {
        // public readonly CONNECTION: string = 'http://:@host:8086/cognide';
        this.HOSTNAME = 'localhost';
        this.PORT = 8086;
        this.DATABASE = 'cognide';
        this.client = new influx_1.InfluxDB({
            host: this.HOSTNAME,
            port: this.PORT,
            database: this.DATABASE,
            schema: [
                {
                    measurement: 'psychometrics',
                    fields: {
                        attention: influx_1.FieldType.FLOAT,
                        meditation: influx_1.FieldType.FLOAT
                    },
                    tags: [
                        "clientId", "artifactName", "lineNumber"
                    ]
                }
            ]
        });
    }
    InfluxDBRecorder.prototype.Save = function (metricEntity) {
        console.debug("Saving metrics into InfluxDB.");
        try {
            this.client.writePoints([
                {
                    measurement: "psycho-set",
                    tags: {
                        clientId: metricEntity.ClientId,
                        artifactName: metricEntity.ArtifactName,
                        lineNumber: String(metricEntity.LineNumber)
                    },
                    fields: {
                        attention: metricEntity.Attention,
                        meditation: metricEntity.Meditation
                    }
                }
            ]);
            return true;
        }
        catch (error) {
            console.error("As error occurred while saving metrics into InfluxDB: " + error);
            return false;
        }
    };
    return InfluxDBRecorder;
}());
exports.InfluxDBRecorder = InfluxDBRecorder;
//# sourceMappingURL=InfluxDBRecorder.js.map