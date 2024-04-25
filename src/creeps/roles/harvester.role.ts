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

                    harvester.harvestTargetSource();

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
}
