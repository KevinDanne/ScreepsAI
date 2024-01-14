export class HarvesterRole {
    public static run(creep: Creep): void {
        if (creep.store.getFreeCapacity() > 0) {
            let targetSource = creep.memory.targetSourceId ? Game.getObjectById(creep.memory.targetSourceId) : null;

            if (targetSource === null) {
                const sources = creep.room.find(FIND_SOURCES);
                if (sources.length === 0) {
                    return;
                }

                let sourceWithFewestCreepsCount: number | undefined;
                for (const source of sources) {
                    const creepsInRange = source.pos.findInRange(FIND_MY_CREEPS, 3, {
                        filter: c => c.id !== creep.id
                    });
                    if (
                        sourceWithFewestCreepsCount === undefined ||
                        creepsInRange.length < sourceWithFewestCreepsCount
                    ) {
                        targetSource = source;
                        sourceWithFewestCreepsCount = creepsInRange.length;
                    }
                }
                if (targetSource === undefined || targetSource === null) {
                    return;
                }
                creep.memory.targetSourceId = targetSource.id;
            }

            if (creep.harvest(targetSource) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targetSource);
                creep.say("Moving");
            } else {
                creep.say("Harvesting");
            }
        } else {
            const spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS, {
                filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
            if (!spawn) {
                return;
            }

            if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
                creep.say("Moving");
            } else {
                creep.say("Transferring");
            }
        }
    }
}
