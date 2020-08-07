import { IMeasurement } from "./IMeasurement"

export class Measurement implements IMeasurement {
    attention: number;
    meditation: number;

    constructor(attention: number, meditation: number){
        this.attention = attention;
        this.meditation = meditation;

    }
}