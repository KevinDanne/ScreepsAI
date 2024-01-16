import { HarvesterRole } from "./harvester.role";

/**
 * Role for upgrading the controller of the current room
 * If no construction sites are found it will call HarvesterRole.run
 */
export class UpgraderRole {
    /**
     * Main loop to manage state and creep behaviour
     */
    public static run(creep: Creep): void {
        if (creep.memory.needsResources && creep.store.getFreeCapacity() === 0) {
            creep.memory.needsResources = false;
        } else if (!creep.memory.needsResources && creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            creep.memory.needsResources = true;
        }

        if (creep.memory.needsResources) {
            UpgraderRole.getResources(creep);
        } else {
            UpgraderRole.upgradeController(creep);
        }
    }

    /**
     * Find container structure in range
     *
     * @param creep upgrader creep
     *
     * @returns container in range or null if not found
     */
    private static getContainerInRange(creep: Creep): StructureContainer | null {
        const containers: StructureContainer[] = creep.room.find(FIND_STRUCTURES, {
            filter: s =>
                s.structureType === STRUCTURE_CONTAINER &&
                s.pos.inRangeTo(creep, 3) &&
                s.store.getUsedCapacity(RESOURCE_ENERGY) > 0
        });
        if (containers.length === 0) {
            return null;
        }

        return containers[0];
    }

    /**
     * Find nearest spawn by path
     *
     * @param creep upgrader creep
     *
     * @returns nearest spawn or null if not found
     */
    private static getNearestSpawn(creep: Creep): StructureSpawn | null {
        const spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
        if (!spawn) {
            return null;
        }

        return spawn;
    }

    /**
     * Fills up resources for creep
     *
     * The source to withdraw is determined by the following order:
     *  - If targetContainerId is set in CreepMemory, use Game.getObjectById(targetContainerId)
     *  - Else if container is in range, use it
     *  - Else use nearest spawn
     *
     * @param creep upgrader creep
     */
    private static getResources(creep: Creep): void {
        if (!creep.room.controller) {
            HarvesterRole.run(creep);
            return;
        }

        let targetSource: StructureContainer | StructureSpawn | null = null;
        if (creep.memory.targetContainerId) {
            targetSource = Game.getObjectById(creep.memory.targetContainerId);
        }
        if (targetSource === null) {
            targetSource = this.getContainerInRange(creep);
            creep.memory.targetContainerId = targetSource?.id;
        }
        if (targetSource === null) {
            targetSource = this.getNearestSpawn(creep);
        }
        if (targetSource === null) return;

        creep.say("⚖️");
        if (creep.withdraw(targetSource, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targetSource);
        }
    }

    /**
     * Moves to controller and upgrade it
     *
     * @param creep upgrader creep
     */
    private static upgradeController(creep: Creep): void {
        if (!creep.room.controller) {
            HarvesterRole.run(creep);
            return;
        }

        creep.say("⚒️");
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
}
