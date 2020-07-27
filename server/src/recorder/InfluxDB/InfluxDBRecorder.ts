import { InfluxDB, IPoint } from 'influx'
import { IRecorder } from '../IRecorder'
import { InfluxDBEntity } from './InfluxDBEntity'
import { IMetricEntity } from '../IMetricEntity'


export class InfluxDBRecorder implements IRecorder{
    
    private client: InfluxDB;
    public readonly CONNECTION: string = 'http://:@host:8086/cognide';
    
    /**
     *
     */
    constructor() {
        this.client = new InfluxDB(this.CONNECTION);              
    }

    
    Save(metricEntity: IMetricEntity): boolean {

         var entity: IPoint = new InfluxDBEntity();




        try {
            // this.client.writePoints(
            //     [
                    
            //     ]
            // );

            return true;

        } catch (error) {
            console.error(error);
            return false
        }


    }
    
}