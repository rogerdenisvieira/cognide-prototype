import { IAdapter } from "../IAdapter"
import { IMeasurement } from "../../models/IMeasurement";
import { Socket } from "net"
import { MeasurementModel } from "../../models/MeasurementModel";
import { IConfig } from "../../config/IConfig";





export class ThinkGearAdapter implements IAdapter {

    

    readonly config: IConfig = require('../../config/IConfig')

    readonly THINKGEAR_CONNECTOR_HOST = '127.0.0.1';
    readonly THINKGEAR_CONNECTOR_PORT = 13854;
    readonly HANDSHAKE = { appName: "CognIDE", appKey: "aSimpleKey" };
    readonly CONFIG = { enableRawOutput: false, format: "Json" };
    readonly client: Socket;

    

    public constructor() {
        this.client = new Socket();

        // ==============================  THINKGEAR CONNECTOR COMMUNICATION ============================== //

        this.client.connect(this.config.ThinkGear.Port, this.config.ThinkGear.Host, () => {

            var config = JSON.stringify(this.CONFIG);
            var handshake = JSON.stringify(this.HANDSHAKE);

            console.log(`Connected to ${this.config.ThinkGear.Host}:${this.config.ThinkGear.Port}.`);

            console.debug(`Sending handshake message: ${handshake}`)
            this.client.write(config);

            console.debug(`Sending config message: ${config}`)
            this.client.write(config);
        });

    }


    public getMetrics(): IMeasurement {

        let sharedData: string;


        this.client.setEncoding('utf-8');
        this.client.setTimeout(10000);
        var readData: string = this.client?.read();

        console.log(`Received data from ThinkGear:` + readData);

        

        // this.client.on("data", (rawData: string) => {
        //     console.log(`${Date.now()} - ThinkGear Connector raw data: ${rawData}`);
        //     //console.log(`RECEIVED: Poor Signal Level: ${data.poorSignalLevel} Status: ${data.status}`);
        
        //     sharedData = JSON.parse(rawData);
        
        // });

        return new MeasurementModel(12, 60);

    }
}