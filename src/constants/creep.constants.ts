import { CreepRole } from "../types";
import { CreepRoleDefinition } from "../types/creeps/creep-role-definition.type";
import { HarvesterRole } from "../creeps/roles/harvester.role";
import { UpgraderRole } from "../creeps/roles/upgrader.role";

export const CREEP_ROLE_DEFINITIONS: Map<CreepRole, CreepRoleDefinition> = new Map([
    [
        CreepRole.Harvester,
        {
            parts: [MOVE, MOVE, CARRY, WORK],
            behaviour: HarvesterRole
        }
    ],
    [
        CreepRole.Upgrader,
        {
            parts: [MOVE, MOVE, CARRY, WORK],
            behaviour: UpgraderRole
        }
    ]
]);
