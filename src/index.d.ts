import { CreepRole } from "./types";

declare global {
    /*
        Interfaces matching on name from @types/creeps will be merged. This is how you can extend the 'built-in' interfaces from @types/creeps.
      */
    // interface Memory {}

    interface CreepMemory {
        role: CreepRole;
        targetSourceId?: Id<Source>;
        targetContainerId?: Id<StructureContainer>;
        needsResources?: boolean;
    }
}
