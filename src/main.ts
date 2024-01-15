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
    console.log(`Current game tick is ${Game.time}`);

    basesManager.run();
    creepManager.run();
    memoryManager.run();
}

/*
    TODO Add logic in upgrader code to create construction site for storage next to the controller [IN PROGRESS]
    TODO build fewer better creeps instead of multiple weak creeps
*/
