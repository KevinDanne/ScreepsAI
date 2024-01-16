/**
 * Role for building constructions
 * If no construction sites are found it will repair structures
 */
export class BuilderRole {
    /**
     * Main loop to manage state and creep behaviour
     */
    public static run(creep: Creep): void {
        // Check if creep needs resources
        if (creep.memory.needsResources && creep.store.getFreeCapacity() === 0) {
            creep.memory.needsResources = false;
        } else if (!creep.memory.needsResources && creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            creep.memory.needsResources = true;
        }

        // Run creep behaviour
        if (creep.memory.needsResources) {
            creep.withdrawFromNearestStorage();
            return;
        }

        if (!creep.buildNearestConstruction()) {
            creep.repairNearestBuilding();
            return;
        }
    }
}
