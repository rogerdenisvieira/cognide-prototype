import { IAdapter } from "./IAdapter";
import { IMeasurement } from "../models/IMeasurement";
import { Measurement } from "../models/Measurement";

export class MockedAdapter implements IAdapter {

    getMetrics(): IMeasurement {

        return new Measurement(
            Math.random() * 100,
            Math.random() * 100
        );
    }
}

