export default function (creep: Creep) {
    const source = creep.pos.findClosestByPath(FIND_SOURCES);
    if(source) {
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
}