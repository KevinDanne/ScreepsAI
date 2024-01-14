import { CreepRole } from "./types";

declare global {
    /*
        Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
        Interfaces matching on name from @types/creeps will be merged. This is how you can extend the 'built-in' interfaces from @types/creeps.
      */
    // interface Memory {}

    interface CreepMemory {
        role: CreepRole;
        upgrading: boolean;
    }
}
