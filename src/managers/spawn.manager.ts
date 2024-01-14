import { CreepRole } from "../types";
import { Runnable } from "../interfaces";

export class SpawnManager implements Runnable {
    private _spawn: StructureSpawn;
    private _minUpgraderCreepCount = 1;

    public constructor(spawn: StructureSpawn) {
        this._spawn = spawn;
    }

    public run(): void {
        const upgraderCreeps = this._spawn.room.find(FIND_MY_CREEPS, {
            filter: creep => creep.memory.role === CreepRole.Upgrader
        });
        // FIXME spawn harvester before upgrader!!
        if (upgraderCreeps.length < this._minUpgraderCreepCount) {
            // Spawn new upgrader creep
            this._spawn.spawnCreep([MOVE, MOVE, CARRY, WORK], Game.time.toString(), {
                memory: {
                    role: CreepRole.Upgrader,
                    upgrading: false
                }
            });
        } else {
            // Spawn new harvester creeps
            this._spawn.spawnCreep([MOVE, MOVE, CARRY, WORK], Game.time.toString(), {
                memory: {
                    role: CreepRole.Harvester,
                    upgrading: false
                }
            });
        }
    }
}
