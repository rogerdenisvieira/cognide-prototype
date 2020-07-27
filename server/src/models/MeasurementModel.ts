import { IMeasurement } from "./IMeasurement"

export class MeasurementModel implements IMeasurement {
    attention: Number;
    meditation: Number;

    constructor(attention: Number, meditation: Number){
        this.attention = attention;
        this.meditation = meditation;

    }
}