import { IMeasurement } from "../models/IMeasurement"

export interface IAdapter {
    getMetrics(): IMeasurement;
}