import { CreepRole } from "./types";

declare global {
    /*
        Interfaces matching on name from @types/creeps will be merged. This is how you can extend the 'built-in' interfaces from @types/creeps.
      */
    interface Creep {
        /**
         * Finds nearest construction site by path, move to it and build it
         *
         * @returns boolean if construction site exists and can be build
         */
        buildNearestConstruction: () => boolean;

        /**
         * Find container structure in range with energy resources
         *
         * @returns container in range or null if not found
         */
        findContainerInRangeWithResources: () => StructureContainer | null;

        /**
         * Find nearest spawn
         *
         * @returns nearest spawn or null if not found
         */
        findNearestSpawn: () => StructureSpawn | null;

        /**
         * Find the source with the fewest creeps in range
         *
         * @returns source to harvest or null if not found
         */
        findSourceToHarvest: () => Source | null;

        /**
         * Finds nearest spawn by path, move to it and transfer resources to it
         *
         * @returns boolean if spawn is found
         */
        transferToNearestSpawn: () => boolean;

        /**
         * Moves to room controller and upgrade it
         *
         * @returns boolean if controller is found
         */
        upgradeCurrentRoomController: () => boolean;

        /**
         * Fills up resources for creep
         *
         * The source to withdraw is determined by the following order:
         *  - If targetContainerId is set in CreepMemory, use Game.getObjectById(targetContainerId)
         *  - Else if container is in range, use it
         *  - Else use nearest spawn
         *
         *  @returns boolean if storage is found
         */
        withdrawFromNearestStorage: () => boolean;
    }

    // interface Memory {}

    interface CreepMemory {
        role: CreepRole;
        targetSourceId?: Id<Source>;
        targetContainerId?: Id<StructureContainer>;
        needsResources?: boolean;
    }
}
