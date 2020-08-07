import { IMetricEntity } from '../entity/IMetricEntity'

export interface IRecorder {
    Save(metricEntity: IMetricEntity): Boolean;
}