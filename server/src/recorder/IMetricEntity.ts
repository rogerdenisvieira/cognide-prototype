import { IPoint } from "influx";

export interface IMetricEntity {

    ClientId: String;
    ArtifactName: String;
    LineNumber: Number;
    Attention: Number;
    Meditation: Number;
}



// {
//     measurement: 'cognide',
//     tags: { artifact: 'helloWorld.cs', line: '1' },
//     fields: { attention: metrics.eSense.attention, meditation: metrics.eSense.meditation },
//   }