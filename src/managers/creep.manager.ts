import { CreepBehaviour, CreepRole } from "../types";
import { ROLE_TO_CREEP_BEHAVIOUR } from "../constants";
import { Runnable } from "../interfaces";

export class CreepManager implements Runnable {
    public run(): void {
        this.runCreepBehaviours();
    }

    private getCreepBehaviourByRole(role: CreepRole): CreepBehaviour {
        return ROLE_TO_CREEP_BEHAVIOUR[role];
    }

    private runCreepBehaviours() {
        for (const creepName in Game.creeps) {
            const creep = Game.creeps[creepName];
            this.getCreepBehaviourByRole(creep.memory.role)?.run(creep);
        }
    }
}
