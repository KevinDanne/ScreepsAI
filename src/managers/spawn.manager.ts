import { CreepRole } from "../types";
import { Runnable } from "../interfaces";

export class SpawnManager implements Runnable {
    private _spawn: StructureSpawn;
    private _minHarvesterCreepCount = 3;
    private _minUpgraderCreepCount = 1;

    public constructor(spawn: StructureSpawn) {
        this._spawn = spawn;
    }

    public run(): void {
        const creeps = this._spawn.room.find(FIND_MY_CREEPS);
        const harvesterCreeps = creeps.filter(creep => creep.memory.role === CreepRole.Harvester);
        const upgraderCreeps = creeps.filter(creep => creep.memory.role === CreepRole.Upgrader);

        if (
            harvesterCreeps.length > this._minHarvesterCreepCount &&
            upgraderCreeps.length < this._minUpgraderCreepCount
        ) {
            // Spawn new upgrader creep
            this._spawn.spawnCreep([MOVE, MOVE, CARRY, WORK], Game.time.toString(), {
                memory: {
                    role: CreepRole.Upgrader
                }
            });
        } else {
            // Spawn new harvester creeps
            this._spawn.spawnCreep([MOVE, MOVE, CARRY, WORK], Game.time.toString(), {
                memory: {
                    role: CreepRole.Harvester
                }
            });
        }
    }
}
