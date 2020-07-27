import { IMetricEntity } from "./IMetricEntity";

export class MetricEntity implements IMetricEntity {
    
    ClientId: String;
    ArtifactName: String;
    LineNumber: Number;
    Attention: Number;
    Meditation: Number;

    /**
     *
     */
    constructor(clientId: String, artifactName: String, lineNumber: Number, attention: Number, meditation: Number) {
        this.ClientId = clientId;
        this.ArtifactName = artifactName;
        this.LineNumber = lineNumber;
        this.Attention = attention;
        this.Meditation = meditation;
    }




    




}






