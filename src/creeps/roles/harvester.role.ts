export class HarvesterRole {
    public static run(creep: Creep): void {
        if (creep.store.getFreeCapacity() > 0) {
            HarvesterRole.harvest(creep);
        } else {
            HarvesterRole.transferToSpawn(creep);
        }
    }

    private static harvest(creep: Creep) {
        const targetSource = creep.memory.targetSourceId
            ? Game.getObjectById(creep.memory.targetSourceId)
            : this.getSourceToHarvest(creep);

        if (targetSource === null) {
            return;
        }

        creep.memory.targetSourceId = targetSource.id;

        creep.say("⛏️");
        if (creep.harvest(targetSource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targetSource);
        }
    }

    private static getSourceToHarvest(creep: Creep): Source | null {
        const sources = creep.room.find(FIND_SOURCES);
        if (sources.length === 0) {
            return null;
        }

        let fewestCreepInRangeCount: number | undefined;
        let targetSource: Source | null = null;
        for (const source of sources) {
            const creepsInRange = source.pos.findInRange(FIND_MY_CREEPS, 3, {
                filter: c => c.id !== creep.id
            });
            if (fewestCreepInRangeCount === undefined || creepsInRange.length < fewestCreepInRangeCount) {
                targetSource = source;
                fewestCreepInRangeCount = creepsInRange.length;
            }
        }
        if (targetSource === undefined || targetSource === null) {
            return null;
        }

        return targetSource;
    }

    private static transferToSpawn(creep: Creep) {
        const spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS, {
            filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });
        if (!spawn) {
            return;
        }

        creep.say("\uD83C\uDFE6");
        if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn);
        }
    }
}