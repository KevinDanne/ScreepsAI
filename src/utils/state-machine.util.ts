import { CreepStateHandler } from "../types/creeps/creep-state.type";

/**
 * State machine for tracking and running states
 *
 * @param stateHandlers state handlers
 * @param data persistent data between states
 * @param creep creep
 */
export function runStates(stateHandlers: Record<string, CreepStateHandler>, data: any, creep: Creep): void {
    if (creep.memory.state === undefined) {
        creep.memory.state = Object.keys(stateHandlers)[0];
    }

    if (!(creep.memory.state in stateHandlers)) {
        const state = creep.memory.state;
        delete creep.memory.state;
        console.error(`Creep ${creep.name} has invalid state "${state}"`);
        return;
    }

    const stateHandler = stateHandlers[creep.memory.state];
    creep.memory.state = stateHandler(data, creep);
}
