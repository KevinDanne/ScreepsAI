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
                    if (creep.store.getFreeCapacity() === 0) {
                        return TransporterStates.Transport;
                    }
                    transporter.withdrawFromNearestSpawn();
                    return TransporterStates.Withdraw;
                },
                [TransporterStates.Transport]: (data: any, transporter: Creep): TransporterStates => {
                    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
                        return TransporterStates.Withdraw;
                    }
                    TransporterRole.transferToContainerWithFreeCapacity(transporter);
                    return TransporterStates.Transport;
                }
            },
            null,
            creep
        );
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
