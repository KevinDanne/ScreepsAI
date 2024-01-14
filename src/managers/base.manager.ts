import { Runnable } from "../interfaces";
import { SpawnManager } from "./spawn.manager";

export class BaseManager implements Runnable {
    private _room: Room;
    private _spawns: StructureSpawn[] = [];
    private _spawnsTTL = 25;

    public constructor(room: Room) {
        this._room = room;
    }

    public run(): void {
        if (Game.time % this._spawnsTTL === 0) {
            this._spawns = this._room.find<StructureSpawn>(FIND_MY_STRUCTURES, {
                filter: s => s.structureType === STRUCTURE_SPAWN
            });
        }
        for (const spawn of this._spawns) {
            new SpawnManager(spawn).run();
        }
    }
}
