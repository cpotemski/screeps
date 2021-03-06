import harvest from './helpers/harvest';

const roleBuilder = {
  run: (creep: Creep) => {
    if (creep.memory.building && creep.carry.energy === 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }

    if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if (creep.memory.building) {
      const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
    } else {
      if (creep.carry.energy < creep.carryCapacity) {
        harvest(creep)
      } else {
        const targets = creep.room.find(FIND_STRUCTURES, {
          filter: structure =>
            (structure.structureType === STRUCTURE_EXTENSION ||
              structure.structureType === STRUCTURE_SPAWN ||
              structure.structureType === STRUCTURE_TOWER) &&
            structure.energy < structure.energyCapacity,
        });
        if (targets.length > 0) {
          if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
          }
        }
      }
    }
  },
};

export default roleBuilder;
