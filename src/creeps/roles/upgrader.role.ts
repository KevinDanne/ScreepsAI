import { HarvesterRole } from "./harvester.role";

/**
 * Role for upgrading the controller of the current room
 * If no controllers are found it will act as harvester
 */
export class UpgraderRole {
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
            creep.withdrawFromNearestBuilding();
            return;
        }

        if (!creep.upgradeCurrentRoomController()) {
            HarvesterRole.run(creep);
            return;
        }
    }
}
