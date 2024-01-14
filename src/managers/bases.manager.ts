import { BaseManager } from "./base.manager";
import { Runnable } from "../interfaces";

export class BasesManager implements Runnable {
    private _baseManagers: Map<string, BaseManager> = new Map<string, BaseManager>();
    private _baseManagersTTL = 25;

    public run(): void {
        if (Game.time % this._baseManagersTTL === 0) {
            this.updateBaseManagers();
        }

        this.runBaseManagers();
    }

    private updateBaseManagers() {
        this._baseManagers.forEach((baseManager, roomName) => {
            if (!Object.values(Game.spawns).find(spawn => spawn.room.name === roomName)) {
                this._baseManagers.delete(roomName);
            }
        });
        Object.values(Game.spawns).forEach(spawn => {
            if (!this._baseManagers.has(spawn.room.name)) {
                this._baseManagers.set(spawn.room.name, new BaseManager(spawn.room));
            }
        });
    }

    private runBaseManagers() {
        this._baseManagers.forEach(baseManager => baseManager.run());
    }
}
