import { HarvesterRole } from "./harvester.role";

export class UpgraderRole {
    public static run(creep: Creep): void {
        if (!creep.room.controller) {
            HarvesterRole.run(creep);
            return;
        }

        if (creep.memory.upgrading && creep.store.getCapacity(RESOURCE_ENERGY) === 0) {
            creep.memory.upgrading = false;
        } else if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
            creep.memory.upgrading = true;
        }

        const spawns = creep.room.find(FIND_MY_STRUCTURES, { filter: s => s.structureType === STRUCTURE_SPAWN });
        if (spawns.length === 0) {
            return;
        }
        if (creep.memory.upgrading) {
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
