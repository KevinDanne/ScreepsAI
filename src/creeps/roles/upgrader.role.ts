import { UpgraderStates } from "../../enums/creeps/states/upgrader-states.enum";
import { runStates } from "../../utils/state-machine.util";

/**
 * Role for upgrading the controller of the current room
 * If no controllers are found it will act as harvester
 */
export class UpgraderRole {
    /**
     * Main loop to manage state and creep behaviour
     */
    public static run(creep: Creep): void {
        runStates(
            {
                [UpgraderStates.Withdraw]: (data: any, upgrader: Creep): UpgraderStates => {
                    if (creep.store.getFreeCapacity() === 0) {
                        return UpgraderStates.Upgrade;
                    }
                    upgrader.withdrawFromNearestBuilding();
                    return UpgraderStates.Withdraw;
                },
                [UpgraderStates.Upgrade]: (data: any, upgrader: Creep): UpgraderStates => {
                    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
                        return UpgraderStates.Withdraw;
                    }
                    upgrader.upgradeCurrentRoomController();
                    return UpgraderStates.Upgrade;
                }
            },
            null,
            creep
        );
    }
}
