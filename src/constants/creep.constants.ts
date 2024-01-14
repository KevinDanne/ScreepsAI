import { CreepBehaviour, CreepRole } from "../types";
import { HarvesterRole } from "../creeps/roles/harvester.role";
import { UpgraderRole } from "../creeps/roles/upgrader.role";

export const ROLE_TO_CREEP_BEHAVIOUR: Record<CreepRole, CreepBehaviour> = {
    [CreepRole.Harvester]: HarvesterRole,
    [CreepRole.Upgrader]: UpgraderRole
};
