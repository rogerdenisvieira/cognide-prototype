import { IMetricEntity } from './IMetricEntity'

export interface IRecorder {
    Save(metricEntity: IMetricEntity): Boolean;
}