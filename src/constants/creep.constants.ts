import { BuilderRole } from "../creeps/roles/builder.role";
import { CreepRole, CreepRoleDefinition, CreepSpawnDefinition } from "../types";

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
    ],
    [
        CreepRole.Builder,
        {
            parts: [MOVE, MOVE, CARRY, WORK],
            behaviour: BuilderRole
        }
    ]
]);

export const CREEP_SPAWN_DEFINITIONS: Map<CreepRole, CreepSpawnDefinition> = new Map([
    [
        CreepRole.Harvester,
        {
            min: 4,
            max: 10
        }
    ],
    [
        CreepRole.Upgrader,
        {
            min: 1,
            max: 5
        }
    ],
    [
        CreepRole.Builder,
        {
            min: 1,
            max: 3
        }
    ]
]);
