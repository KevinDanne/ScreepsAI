import { RunnableWithParam } from "../../interfaces";

export * from "../../enums/creeps/creep-role.enum";
export * from "./creep-role-definition.type";
export * from "./creep-spawn-definition.type";

export type CreepBehaviour = RunnableWithParam<Creep>;
