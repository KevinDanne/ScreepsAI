import { CreepBehaviour, CreepRole } from "../types";
import { CREEP_ROLE_DEFINITIONS } from "../constants";
import { Runnable } from "../interfaces";

export class CreepManager implements Runnable {
    public run(): void {
        this.runCreepBehaviours();
    }

    private getCreepBehaviourByRole(role: CreepRole): CreepBehaviour | null {
        const creepRoleDefinition = CREEP_ROLE_DEFINITIONS.get(role);
        if (!creepRoleDefinition) return null;

        return creepRoleDefinition.behaviour;
    }

    private runCreepBehaviours() {
        for (const creepName in Game.creeps) {
            const creep = Game.creeps[creepName];

            this.getCreepBehaviourByRole(creep.memory.role)?.run(creep);
        }
    }
}
