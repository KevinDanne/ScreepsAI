import { RunnableWithParam } from "../../interfaces";

export * from "./creep-role.type";
export * from "./creep-role-definition.type";
export * from "./creep-spawn-definition.type";

export type CreepBehaviour = RunnableWithParam<Creep>;
