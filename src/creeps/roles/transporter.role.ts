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
        let targetContainer: StructureContainer | StructureSpawn | null = null;
        if (creep.memory.targetStorageId) {
            targetContainer = Game.getObjectById(creep.memory.targetStorageId);
        }
        if (targetContainer === null || targetContainer.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
            targetContainer = creep.findNearestContainerWithFreeCapacity();
            creep.memory.targetStorageId = targetContainer?.id;
        }
        if (targetContainer === null) {
            return;
        }

        creep.say("📡");
        if (creep.transfer(targetContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targetContainer);
        }
    }
}
