import { IMetricEntity } from "./IMetricEntity";

export class MetricEntity implements IMetricEntity {
    
    ClientId: string;
    ArtifactName: string;
    LineNumber: number;
    Attention: number;
    Meditation: number;

    /**
     *
     */
    constructor(clientId: string, artifactName: string, lineNumber: number, attention: number, meditation: number) {
        this.ClientId = clientId;
        this.ArtifactName = artifactName;
        this.LineNumber = lineNumber;
        this.Attention = attention;
        this.Meditation = meditation;
    }




    




}






