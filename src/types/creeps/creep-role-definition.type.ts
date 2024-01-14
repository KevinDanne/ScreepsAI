import { CreepBehaviour } from "./index";

export type CreepRoleDefinition = {
    parts: BodyPartConstant[];
    behaviour: CreepBehaviour;
};
