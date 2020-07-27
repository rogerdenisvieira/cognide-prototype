
export interface IConfig {

    ThinkGear: ThinkGearConfig;
}

export interface ThinkGearConfig {
    Port: number;
    Host: string;
    AppName: string;
    Format: string;
    AppKey: string;
}