import { Runnable } from "../interfaces";
import { SpawnManager } from "./spawn.manager";

export class BaseManager implements Runnable {
    private _room: Room;

    public constructor(room: Room) {
        this._room = room;
    }

    public run(): void {
        // TODO caching
        const spawns = this._room.find<StructureSpawn>(FIND_MY_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_SPAWN
        });
        for (const spawn of spawns) {
            new SpawnManager(spawn).run();
        }
    }
}
