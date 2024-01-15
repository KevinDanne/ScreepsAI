import { BaseManager } from "./base.manager";
import { Runnable } from "../interfaces";

/**
 * Manager for managing all bases
 * Creates one BaseManager for every room
 */
export class BasesManager implements Runnable {
    private _baseManagers: Map<string, BaseManager> = new Map<string, BaseManager>();
    private _baseManagersTTL = 25;

    /**
     * Main loop to manage state and bases
     */
    public run(): void {
        if (Game.time % this._baseManagersTTL === 0) {
            this.updateBaseManagers();
        }

        this.runBaseManagers();
    }

    /**
     * Update _baseManagers member by looping through every claimed spawn and creates a new BaseManager for every new unique room
     * If there is a SpawnManager for a room that is no longer claimed, it will be removed
     */
    private updateBaseManagers(): void {
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

    /**
     * Executes the run method on every BaseManager
     */
    private runBaseManagers(): void {
        this._baseManagers.forEach(baseManager => baseManager.run());
    }
}
