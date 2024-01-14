import { CREEP_ROLE_DEFINITIONS } from "../constants";
import { CreepRole } from "../types";
import { Runnable } from "../interfaces";

export class SpawnManager implements Runnable {
    private _spawn: StructureSpawn;
    private _minHarvesterCreepCount = 3;
    private _maxHarvesterCreepCount = 10;
    private _minUpgraderCreepCount = 1;

    public constructor(spawn: StructureSpawn) {
        this._spawn = spawn;
    }

    public run(): void {
        const creeps = this._spawn.room.find(FIND_MY_CREEPS);
        const harvesterCreeps = creeps.filter(creep => creep.memory.role === CreepRole.Harvester);
        const upgraderCreeps = creeps.filter(creep => creep.memory.role === CreepRole.Upgrader);

        // Spawn new upgrader creep
        if (
            harvesterCreeps.length > this._minHarvesterCreepCount &&
            upgraderCreeps.length < this._minUpgraderCreepCount
        ) {
            const harvesterRoleDefinition = CREEP_ROLE_DEFINITIONS.get(CreepRole.Harvester);
            if (!harvesterRoleDefinition) return;

            this._spawn.spawnCreep(harvesterRoleDefinition.parts, Game.time.toString(), {
                memory: {
                    role: CreepRole.Upgrader
                }
            });
        }
        // Spawn new harvester creeps
        else if (harvesterCreeps.length < this._maxHarvesterCreepCount) {
            const upgraderRoleDefinition = CREEP_ROLE_DEFINITIONS.get(CreepRole.Upgrader);
            if (!upgraderRoleDefinition) return;

            this._spawn.spawnCreep(upgraderRoleDefinition.parts, Game.time.toString(), {
                memory: {
                    role: CreepRole.Harvester
                }
            });
        }
    }
}
