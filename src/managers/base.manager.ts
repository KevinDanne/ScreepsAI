import { Runnable } from "../interfaces";
import { SpawnManager } from "./spawn.manager";

/**
 * Manager for managing a base
 * Creates one SpawnManager for every spawn
 */
export class BaseManager implements Runnable {
    private _room: Room;
    private _spawns: StructureSpawn[] = [];
    private _spawnsTTL = 25;

    public constructor(room: Room) {
        this._room = room;
    }

    /**
     * Main loop to manage state and base behaviour
     */
    public run(): void {
        if (Game.time % this._spawnsTTL === 0) {
            this.updateSpawns();
        }

        this.runSpawnManagers();
    }

    /**
     * Finds all spawn structures in _room and assigns result to _spawns
     */
    private updateSpawns(): void {
        this._spawns = this._room.find<StructureSpawn>(FIND_MY_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_SPAWN
        });
    }

    /**
     * Instantiates a new SpawnManager for every spawn and executes the run method
     */
    private runSpawnManagers(): void {
        // TODO save spawnmanager in class property
        for (const spawn of this._spawns) {
            new SpawnManager(spawn).run();
        }
    }
}
