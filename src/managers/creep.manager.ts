import { CreepBehaviour, CreepRole } from "../types";
import { CREEP_ROLE_DEFINITIONS } from "../constants";
import { Runnable } from "../interfaces";

/**
 * Manager for running the behaviour specified in CREEP_ROLE_DEFINITIONS for every creep
 */
export class CreepManager implements Runnable {
    /**
     * Main loop to manage state and creeps
     */
    public run(): void {
        this.runCreepBehaviours();
    }

    /**
     * Returns CreepBehaviour based on CREEP_ROLE_DEFINITIONS
     *
     * @param role creep role
     *
     * @returns creep behaviour or null if not found
     */
    private getCreepBehaviourByRole(role: CreepRole): CreepBehaviour | null {
        const creepRoleDefinition = CREEP_ROLE_DEFINITIONS.get(role);
        if (!creepRoleDefinition) return null;

        return creepRoleDefinition.behaviour;
    }

    /**
     * Execute creep behaviour on every creep
     */
    private runCreepBehaviours(): void {
        for (const creepName in Game.creeps) {
            const creep = Game.creeps[creepName];

            this.getCreepBehaviourByRole(creep.memory.role)?.run(creep);
        }
    }
}
