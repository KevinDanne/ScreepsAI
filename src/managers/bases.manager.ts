import { BaseManager } from "./base.manager";
import { Runnable } from "../interfaces";

export class BasesManager implements Runnable {
    public run(): void {
        // TODO caching
        const bases: string[] = [];
        Object.values(Game.spawns).forEach(spawn => {
            if (!bases.includes(spawn.room.name)) {
                bases.push(spawn.room.name);
                new BaseManager(spawn.room).run();
            }
        });
    }
}
