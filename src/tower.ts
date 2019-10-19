export default function() {
    const towers = Game.spawns.Spawn1.room.find<StructureTower>(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_TOWER }
            })
    towers.forEach((tower) => {
        var closestDamagedStructure = Game.spawns.Spawn1.room.find( FIND_STRUCTURES, { filter: ( f ) => {
            return ( f.hits < f.hitsMax )}}).sort( function( a, b ) {
                    return +a.hits - +b.hits })[ 0 ]
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    })
}