import harvest from './helpers/harvest';

let mode = 'harvest';

function transfer(creep: Creep) {
  const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
      (structure.structureType === STRUCTURE_EXTENSION ||
        structure.structureType === STRUCTURE_SPAWN ||
        structure.structureType === STRUCTURE_TOWER) &&
      structure.energy < structure.energyCapacity,
  });
  if (target) {
    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
    }
  }
}

const roleHarvester = {
  run: (creep: Creep) => {
    if(mode === 'harvest') {
      if(creep.carry.energy < creep.carryCapacity) {
        harvest(creep);
      } else {
        mode = 'transfer';
      }
    } else if(mode === 'transfer') {
      if(creep.carry.energy > 0) {
        transfer(creep)
      } else {
        mode = 'harvest'
      }
    }
  },
};

export default roleHarvester;
