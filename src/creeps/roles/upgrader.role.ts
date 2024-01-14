import { HarvesterRole } from "./harvester.role";

export class UpgraderRole {
    public static run(creep: Creep): void {
        if (creep.memory.upgrading && creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            creep.memory.upgrading = false;
        } else if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
            creep.memory.upgrading = true;
        }

        if (creep.memory.upgrading) {
            UpgraderRole.upgradeController(creep);
        } else {
            UpgraderRole.getResources(creep);
        }
    }

    private static upgradeController(creep: Creep) {
        if (!creep.room.controller) {
            HarvesterRole.run(creep);
            return;
        }

        creep.say("⚒️");
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }

    private static getResources(creep: Creep) {
        const spawns = creep.room.find(FIND_MY_STRUCTURES, { filter: s => s.structureType === STRUCTURE_SPAWN });
        if (spawns.length === 0) {
            return;
        }

        creep.say("⚖️");
        if (creep.withdraw(spawns[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(spawns[0]);
        }
    }
}
