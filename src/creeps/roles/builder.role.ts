import { BuilderStates } from "../../enums/creeps/states/builder-states.enum";
import { runStates } from "../../utils/state-machine.util";

/**
 * Role for building constructions
 * If no construction sites are found it will repair structures
 */
export class BuilderRole {
    /**
     * Main loop to manage state and creep behaviour
     */
    public static run(creep: Creep): void {
        runStates(
            {
                [BuilderStates.Withdraw]: (data: any, builder: Creep): BuilderStates => {
                    if (builder.store.getFreeCapacity() === 0) {
                        return BuilderStates.Build;
                    }
                    builder.withdrawFromNearestBuilding();
                    return BuilderStates.Withdraw;
                },
                [BuilderStates.Build]: (data: any, builder: Creep): BuilderStates => {
                    if (builder.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
                        return BuilderStates.Withdraw;
                    }

                    const hasConstructionSite = builder.buildNearestConstruction();
                    if (!hasConstructionSite) {
                        return BuilderStates.Repair;
                    }

                    return BuilderStates.Build;
                },
                [BuilderStates.Repair]: (data: any, builder: Creep): BuilderStates => {
                    builder.repairNearestBuilding();
                    return BuilderStates.Build;
                }
            },
            null,
            creep
        );
    }
}
