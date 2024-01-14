import { Runnable } from "../interfaces";

export class MemoryManager implements Runnable {
    public run(): void {
        this.clearMemory();
    }

    private clearMemory() {
        for (const name in Memory.creeps) {
            if (!(name in Game.creeps)) {
                delete Memory.creeps[name];
            }
        }
    }
}
