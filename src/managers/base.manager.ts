import { Runnable } from "../interfaces";
import { SpawnManager } from "./spawn.manager";

/**
 * Manager for managing a base
 * Creates one SpawnManager for every spawn
 */
export class BaseManager implements Runnable {
    private _room: Room;
    private _spawnManagers = new Map<Id<StructureSpawn>, SpawnManager>();
    private _spawnManagersTTL = 25;

    public constructor(room: Room) {
        this._room = room;
    }

    /**
     * Main loop to manage state and base behaviour
     */
    public run(): void {
        if (Game.time % this._spawnManagersTTL === 0) {
            this.updateSpawnManagers();
        }

        this.runSpawnManagers();
    }

    /**
     * Update _spawnManagers member by looping through every spawn in _room and creates a new SpawnManager
     * If there is a SpawnManager for a spawn that is no longer claimed, it will be removed
     */
    private updateSpawnManagers(): void {
        const spawns = this._room.find<StructureSpawn>(FIND_MY_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_SPAWN
        });

        this._spawnManagers.forEach((spawnManager, spawnId) => {
            if (!spawns.find(spawn => spawn.id === spawnId)) {
                this._spawnManagers.delete(spawnId);
            }
        });
        spawns.forEach(spawn => {
            if (!this._spawnManagers.has(spawn.id)) {
                this._spawnManagers.set(spawn.id, new SpawnManager(spawn));
            }
        });
    }

    /**
     * Executes the run method on every SpawnManager
     */
    private runSpawnManagers(): void {
        this._spawnManagers.forEach(spawnManager => spawnManager.run());
    }
}
