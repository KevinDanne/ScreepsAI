Creep.prototype.buildNearestConstruction = function (): boolean {
    const constructionSite = this.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
    if (constructionSite === null) {
        return false;
    }

    this.say("🏗️");
    if (this.build(constructionSite) === ERR_NOT_IN_RANGE) {
        this.moveTo(constructionSite);
    }

    return true;
};

Creep.prototype.findContainerInRangeWithResources = function (): StructureContainer | null {
    const containers: StructureContainer[] = this.room.find(FIND_STRUCTURES, {
        filter: s =>
            s.structureType === STRUCTURE_CONTAINER &&
            s.pos.inRangeTo(this, 3) &&
            s.store.getUsedCapacity(RESOURCE_ENERGY) > 0
    });
    if (containers.length === 0) {
        return null;
    }

    return containers[0];
};

Creep.prototype.findNearestSpawn = function (): StructureSpawn | null {
    return this.pos.findClosestByPath(FIND_MY_SPAWNS);
};

Creep.prototype.findSourceToHarvest = function (): Source | null {
    const sources = this.room.find(FIND_SOURCES);
    if (sources.length === 0) {
        return null;
    }

    let fewestCreepInRangeCount: number | undefined;
    let targetSource: Source | null = null;
    for (const source of sources) {
        const creepsInRange = source.pos.findInRange(FIND_MY_CREEPS, 3, {
            filter: c => c.id !== this.id
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
};

Creep.prototype.repairNearestBuilding = function (): boolean {
    const damagedBuilding = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: s => s.hits < s.hitsMax
    });
    if (damagedBuilding === null) {
        return false;
    }

    this.say("️🛠️");

    if (this.repair(damagedBuilding) === ERR_NOT_IN_RANGE) {
        this.moveTo(damagedBuilding);
    }

    return true;
};

Creep.prototype.transferToNearestSpawn = function (): boolean {
    const spawn = this.findNearestSpawn();
    if (spawn === null) {
        return false;
    }

    this.say("\uD83C\uDFE6");
    if (this.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        this.moveTo(spawn);
    }

    return true;
};

Creep.prototype.upgradeCurrentRoomController = function (): boolean {
    if (this.room.controller === undefined) {
        return false;
    }

    this.say("⚒️");
    if (this.upgradeController(this.room.controller) === ERR_NOT_IN_RANGE) {
        this.moveTo(this.room.controller);
    }

    return true;
};

Creep.prototype.withdrawFromNearestStorage = function (): boolean {
    let targetSource: StructureContainer | StructureSpawn | null = null;
    if (this.memory.targetContainerId) {
        targetSource = Game.getObjectById(this.memory.targetContainerId);
    }
    if (targetSource === null || targetSource.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
        targetSource = this.findContainerInRangeWithResources();
        this.memory.targetContainerId = targetSource?.id;
    }
    if (targetSource === null) {
        targetSource = this.findNearestSpawn();
    }
    if (targetSource === null) {
        return false;
    }

    this.say("⚖️");
    if (this.withdraw(targetSource, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        this.moveTo(targetSource);
    }

    return true;
};
