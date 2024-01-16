import { BasesManager, CreepManager, MemoryManager } from "./managers";

// Include prototype extensions
import "./extensions";

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
    TODO add simple creep state machine
    TODO Add logic in upgrader code to create construction site for storage next to the controller
    TODO build fewer better creeps instead of multiple weak creeps
*/
