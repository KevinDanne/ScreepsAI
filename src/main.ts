import { BasesManager, CreepManager } from "./managers";
import { MemoryManager } from "./managers/memory.manager";

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
    extend logic in upgrader to use resources from spawn if container is empty [DONE]
    TODO move static helper methods to prototype [WIP]
    TODO Add logic in upgrader code to create construction site for storage next to the controller [IN PROGRESS]
    TODO build fewer better creeps instead of multiple weak creeps
*/
