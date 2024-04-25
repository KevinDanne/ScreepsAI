import { runStates } from "../../utils/state-machine.util";
import { TransporterStates } from "../../enums/creeps/states/transporter-states.enum";

/**
 * Role for transporting resources from spawn to containers
 */
export class TransporterRole {
    /**
     * Main loop to manage state and creep behaviour
     */
    public static run(creep: Creep): void {
        runStates(
            {
                [TransporterStates.Withdraw]: (data: any, transporter: Creep): TransporterStates => {
                    if (transporter.store.getFreeCapacity() === 0) {
                        return TransporterStates.Transport;
                    }
                    transporter.withdrawFromNearestSpawn();
                    return TransporterStates.Withdraw;
                },
                [TransporterStates.Transport]: (data: any, transporter: Creep): TransporterStates => {
                    if (transporter.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
                        return TransporterStates.Withdraw;
                    }
                    transporter.transferToNearestContainer();
                    return TransporterStates.Transport;
                }
            },
            null,
            creep
        );
    }
}
