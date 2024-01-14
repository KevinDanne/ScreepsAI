import { HarvesterRole } from "./harvester.role";

export class UpgraderRole {
    public static run(creep: Creep): void {
        if (!creep.room.controller) {
            HarvesterRole.run(creep);
            return;
        }

        // TODO get resources from spawn (NO HARVESTING!!!)
        const spawns = creep.room.find(FIND_MY_STRUCTURES, { filter: s => s.structureType === STRUCTURE_SPAWN });
        if (spawns.length === 0) {
            return;
        }
        if (creep.store.getCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
                creep.say("Moving");
            } else {
                creep.say("Upgrading");
            }
        } else {
            if (creep.withdraw(spawns[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(spawns[0]);
            }
        }
    }
}
