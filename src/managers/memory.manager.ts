import { Runnable } from "../interfaces";

/**
 * Manager for cleaning up unused memory
 */
export class MemoryManager implements Runnable {
    /**
     * Main loop to manage state and memory
     */
    public run(): void {
        this.clearMemory();
    }

    /**
     * Clear unused memory
     */
    private clearMemory(): void {
        for (const name in Memory.creeps) {
            if (!(name in Game.creeps)) {
                delete Memory.creeps[name];
            }
        }
    }
}
