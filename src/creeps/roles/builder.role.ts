import { UpgraderRole } from "./upgrader.role";

/**
 * Role for building constructions
 * If no construction sites are found it will call UpgraderRole.run
 */
export class BuilderRole {
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
            BuilderRole.getResources(creep);
        } else {
            BuilderRole.build(creep);
        }
    }

    /**
     * Finds nearest construction site by path, move to it and build the construction
     *
     * @param creep builder creep
     */
    private static build(creep: Creep): void {
        creep.say("🏗️");
        const constructionSite = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
        if (!constructionSite) {
            UpgraderRole.run(creep);
            return;
        }

        if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
            creep.moveTo(constructionSite);
        }
    }

    /**
     * Finds nearest spawn by path, move to it and withdraw resources of it
     *
     * @param creep builder creep
     */
    private static getResources(creep: Creep): void {
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
