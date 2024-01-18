import { CreepRole, CreepRoleDefinition, CreepSpawnDefinition } from "../types";
import { BuilderRole } from "../creeps/roles/builder.role";

import { HarvesterRole } from "../creeps/roles/harvester.role";
import { TransporterRole } from "../creeps/roles/transporter.role";
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
    ],
    [
        CreepRole.Transporter,
        {
            parts: [MOVE, CARRY],
            behaviour: TransporterRole
        }
    ]
]);

export const CREEP_SPAWN_DEFINITIONS: Map<CreepRole, CreepSpawnDefinition> = new Map([
    [
        CreepRole.Harvester,
        {
            min: 2,
            max: 4
        }
    ],
    [
        CreepRole.Upgrader,
        {
            min: 1,
            max: 2
        }
    ],
    [
        CreepRole.Builder,
        {
            min: 1,
            max: 2
        }
    ],
    [
        CreepRole.Transporter,
        {
            min: 1,
            max: 2
        }
    ]
]);
