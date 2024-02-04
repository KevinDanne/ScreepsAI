import { CREEP_ROLE_DEFINITIONS, CREEP_SPAWN_DEFINITIONS } from "../constants";
import { Runnable } from "../interfaces";

/**
 * Spawns new creeps based on CREEP_SPAWN_DEFINITIONS and CREEP_ROLE_DEFINITIONS
 */
export class SpawnManager implements Runnable {
    private _spawn: StructureSpawn;

    public constructor(spawn: StructureSpawn) {
        this._spawn = spawn;
    }

    /**
     * Main loop to manage state and spawns
     */
    public run(): void {
        this.spawnNewCreeps();
    }

    /**
     * Spawns new creeps based on CREEP_SPAWN_DEFINITIONS
     */
    private spawnNewCreeps(): void {
        const creeps = this._spawn.room.find(FIND_MY_CREEPS);

        // Check if all minimums are satisfied
        let allMinimumsSatisfied = true;
        for (const [creepRole, spawnDefinition] of CREEP_SPAWN_DEFINITIONS) {
            if (creeps.filter(c => c.memory.role === creepRole).length < spawnDefinition.min) {
                allMinimumsSatisfied = false;
                break;
            }
        }

        // Spawn new creeps
        for (const [creepRole, spawnDefinition] of CREEP_SPAWN_DEFINITIONS) {
            const creepCountForRole = creeps.filter(c => c.memory.role === creepRole).length;

            if (
                creepCountForRole < spawnDefinition.min ||
                (allMinimumsSatisfied && creepCountForRole < spawnDefinition.max)
            ) {
                const roleDefinition = CREEP_ROLE_DEFINITIONS.get(creepRole);
                if (roleDefinition === undefined) return;

                console.log(`[${this._spawn.name}]: spawning creep with role "${creepRole}"`);
                const result = this._spawn.spawnCreep(roleDefinition.parts, Game.time.toString(), {
                    memory: {
                        role: creepRole
                    }
                });
                console.log(`[${this._spawn.name}]: spawn result: "${result}"`);
                return;
            }
        }
    }
}
