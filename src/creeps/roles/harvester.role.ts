import { HarvesterStates } from "../../enums/creeps/states/harvester-states.enum";
import { runStates } from "../../utils/state-machine.util";

/**
 * Role for harvesting resources
 */
export class HarvesterRole {
    /**
     * Main loop to manage state and creep behaviour
     */
    public static run(creep: Creep): void {
        runStates(
            {
                [HarvesterStates.Harvest]: (data: any, harvester: Creep): HarvesterStates => {
                    if (harvester.store.getFreeCapacity() === 0) {
                        return HarvesterStates.TransferToNearestBuilding;
                    }

                    HarvesterRole.harvest(harvester);

                    return HarvesterStates.Harvest;
                },
                [HarvesterStates.TransferToNearestBuilding]: (data: any, harvester: Creep): HarvesterStates => {
                    if (harvester.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
                        return HarvesterStates.Harvest;
                    }

                    harvester.transferToNearestBuilding();
                    return HarvesterStates.TransferToNearestBuilding;
                }
            },
            null,
            creep
        );
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
