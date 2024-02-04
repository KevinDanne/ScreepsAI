export type CreepState = {
    state: string;
    data: any;
};

export type CreepStateHandler = (data: any, creep: Creep) => string;
