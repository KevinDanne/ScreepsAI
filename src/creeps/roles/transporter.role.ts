/**
 * Role for transporting resources from spawn to containers
 */
export class TransporterRole {
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

        if (creep.memory.needsResources) {
            creep.withdrawFromNearestSpawn();
            return;
        }

        TransporterRole.transferToContainerWithFreeCapacity(creep);
    }

    private static transferToContainerWithFreeCapacity(creep: Creep) {
        const targetContainer = creep.findNearestContainerWithFreeCapacity();
        if (targetContainer === null) {
            return;
        }

        creep.say("📡");
        if (creep.transfer(targetContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targetContainer);
        }
    }
}
