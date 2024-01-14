import { BasesManager, CreepManager } from "./managers";
import { MemoryManager } from "./managers/memory.manager";

const basesManager = new BasesManager();
const creepManager = new CreepManager();
const memoryManager = new MemoryManager();

export function loop(): void {
    console.log(`Current game tick is ${Game.time}`);

    basesManager.run();
    creepManager.run();
    memoryManager.run();
}

/*
    TODO add spawn definitions
    TODO add logic for balancing spawning roles
    TODO create builder role
    TODO Add logic in upgrader code to create construction site for storage next to the controller
    TODO update upgrader code to withdraw resources from storage
*/
