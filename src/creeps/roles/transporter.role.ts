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

        // Run creep behaviour
        const spawn = creep.findNearestSpawn();
        if (spawn === null) {
            return;
        }

        let targetContainer: StructureContainer | null = null;
        if (creep.memory.targetContainerId) {
            targetContainer = Game.getObjectById(creep.memory.targetContainerId);
        }
        if (targetContainer === null || targetContainer.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
            const containers: StructureContainer[] = creep.room.find(FIND_STRUCTURES, {
                filter: s => s.structureType === STRUCTURE_CONTAINER && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
            if (containers.length > 0) {
                targetContainer = containers[0];
            }
            creep.memory.targetContainerId = targetContainer?.id;
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
