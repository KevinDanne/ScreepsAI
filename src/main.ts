import "./extensions";
import { BasesManager, CreepManager, MemoryManager } from "./managers";

// Instantiate managers
const basesManager = new BasesManager();
const creepManager = new CreepManager();
const memoryManager = new MemoryManager();

/**
 * SCREEPS game loop
 * Runs all managers
 */
export function loop(): void {
    basesManager.run();
    creepManager.run();
    memoryManager.run();
}

/*
KNOWN BUGS:
    -

TODOS:
    move common state machines to seperate file
    Add logic in upgrader code to create construction site for storage next to the controller
    extend spawner logic to build fewer better creeps instead of multiple weak creeps
*/
