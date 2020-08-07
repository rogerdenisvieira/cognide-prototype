import { InfluxDB, IPoint, FieldType } from 'influx'
import { IRecorder } from '../IRecorder'
import { InfluxDBEntity } from './InfluxDBEntity'
import { IMetricEntity } from '../IMetricEntity'


export class InfluxDBRecorder implements IRecorder {

    private client: InfluxDB;
    // public readonly CONNECTION: string = 'http://:@host:8086/cognide';

    public readonly HOSTNAME = 'localhost';
    public readonly PORT = 8086;
    public readonly DATABASE = 'cognide';

    /**
     *
     */
    constructor() {

        this.client = new InfluxDB({
            host: this.HOSTNAME,
            port: this.PORT,
            database: this.DATABASE,
            schema: [
                {
                    measurement: 'psychometrics',
                    fields: {
                        attention: FieldType.FLOAT,
                        meditation: FieldType.FLOAT
                    },
                    tags: [
                        "clientId", "artifactName", "lineNumber"
                    ]
                }
            ]
        })
    }

    /**
     *
     */
    Save(metricEntity: IMetricEntity): boolean {

        console.debug("Saving metrics into InfluxDB.")

        try {
            this.client.writePoints(
                [
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
                ]
            );

            return true;

        } catch (error) {
            console.error(`As error occurred while saving metrics into InfluxDB: ${error}`);
            return false
        }
    }
}