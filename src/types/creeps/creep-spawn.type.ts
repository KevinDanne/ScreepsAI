import { CreepRole } from "./creep-role.type";

export type CreepSpawnDefinition = {
    role: CreepRole;
    parts: BodyPartConstant[];
};
