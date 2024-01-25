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
         * Find nearest container structure
         *
         * @returns nearest container or null if not found
         */
        findNearestContainer: () => StructureContainer | null;

        /**
         * Find nearest container structure with energy resources
         *
         * @returns nearest container or null if not found
         */
        findNearestContainerWithResources: () => StructureContainer | null;

        /**
         * Find nearest container structure with free capacity
         *
         * @returns nearest container or null if not found
         */
        findNearestContainerWithFreeCapacity: () => StructureContainer | null;

        /**
         * Find nearest spawn
         *
         * @returns nearest spawn or null if not found
         */
        findNearestSpawn: () => StructureSpawn | null;

        /**
         * Find nearest spawn with energy resources
         *
         * @returns nearest spawn or null if not found
         */
        findNearestSpawnWithResources: () => StructureSpawn | null;

        /**
         * Find nearest spawn with free capacity
         *
         * @returns nearest spawn or null if not found
         */
        findNearestSpawnWithFreeCapacity: () => StructureSpawn | null;

        /**
         * Find nearest storage building
         *
         * @returns nearest storage building or null if not found
         */
        findNearestStorageBuilding: () => StructureSpawn | StructureContainer | null;

        /**
         * Find nearest storage building with energy resources
         *
         * @returns nearest storage building or null if not found
         */
        findNearestStorageBuildingWithResources: () => StructureSpawn | StructureContainer | null;

        /**
         * Find nearest storage building with free capacity
         *
         * @returns nearest storage building or null if not found
         */
        findNearestStorageBuildingWithFreeCapacity: () => StructureSpawn | StructureContainer | null;

        /**
         * Find the source with the fewest creeps in range
         *
         * @returns source to harvest or null if not found
         */
        findSourceToHarvest: () => Source | null;

        /**
         * Finds nearest damaged building by path, move to it and repair it
         *
         * @returns boolean if damaged building exists and can be repaired
         */
        repairNearestBuilding: () => boolean;

        /**
         * Finds nearest storage by path, move to it and transfer resources to it
         *
         * @returns boolean if storage is found
         */
        transferToNearestBuilding: () => boolean;

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
        withdrawFromNearestBuilding: () => boolean;

        /**
         * Finds nearest spawn by path, move to it and withdraw resources from it
         *
         * @returns boolean if spawn is found
         */
        withdrawFromNearestSpawn: () => boolean;
    }

    // interface Memory {}

    interface CreepMemory {
        role: CreepRole;
        targetSourceId?: Id<Source>;
        targetStorageId?: Id<StructureContainer> | Id<StructureSpawn>;
        needsResources?: boolean;
    }
}
