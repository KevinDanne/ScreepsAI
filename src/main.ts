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
