/**
 * Role for harvesting resources
 */
export class HarvesterRole {
    /**
     * Main loop to manage state and creep behaviour
     */
    public static run(creep: Creep): void {
        if (creep.store.getFreeCapacity() > 0) {
            HarvesterRole.harvest(creep);
            return;
        }

        creep.transferToNearestBuilding();
    }

    /**
     * Find nearest construction site by path, move to it and build the construction
     *
     * @param creep builder creep
     */
    private static harvest(creep: Creep): void {
        let targetSource: Source | null = null;
        if (creep.memory.targetSourceId) {
            targetSource = Game.getObjectById(creep.memory.targetSourceId);
        }
        if (targetSource === null) {
            targetSource = creep.findSourceToHarvest();
            creep.memory.targetSourceId = targetSource?.id;
        }
        if (targetSource === null) return;

        creep.say("⛏️");
        if (creep.harvest(targetSource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targetSource);
        }
    }
}
