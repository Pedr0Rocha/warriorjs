class Player {

	constructor() {
		this.lastTurnHP = 20;
	}

  playTurn(warrior) {

  	const frontSpace = warrior.feel();
  	const backSpace = warrior.feel('backward');

  	const frontTarget = frontSpace.isUnit() ? frontSpace.getUnit() : null;
  	const backTarget = backSpace.isUnit() ? backSpace.getUnit() : null;

  	const target = frontTarget || backTarget;
  	const targetDirection = backTarget ? 'backward' : 'forward';

  	const unitsNearby = this.getUnitsNearby(warrior);

  	if (this.shouldUseBow(warrior, unitsNearby)) {

  		warrior.shoot();

  	} else if (target) {

  		if (this.shouldRescue(target)) {
  			warrior.rescue(targetDirection);
  		} else {
  			warrior.attack(targetDirection);
  		}

  	} else {

  		if (this.shouldRest(warrior)) {
        warrior.think("Good time to rest..");
  			warrior.rest();
  		} else {

		  		if (this.shouldBackupAndRest(warrior)) {
		  			if (!warrior.feel('backward').isWall()) {
		  				warrior.walk('backward');
		  			} else {
              warrior.rest();
		  			}
		  		} else {
		  			if (warrior.feel().isWall()) {
		  				warrior.pivot();
		  			} else {
		  				warrior.walk();
		  			}
	  			}

  		}

  	}

  	this.lastTurnHP = warrior.health();
  }

  shouldUseBow(warrior, units) {
    return units.length > 0 && units[0].isHostile() && !this.isTakingDmg(warrior);
  }

  getUnitsNearby(warrior) {
  	const spaces = warrior.look();
  	let units = [];
  	spaces.forEach( space => {
  		if (space.isUnit()) units.push(space.getUnit());
  	});
  	return units;
  }

  shouldBackupAndRest(warrior, target) {
		return !target && this.isTakingDmg(warrior) && warrior.health() < 10;
  }

  isTakingDmg(warrior) {
  	return this.lastTurnHP > warrior.health();
  }

  shouldRest(warrior) {
  	return !this.isTakingDmg(warrior) && !warrior.feel().isStairs() && warrior.health() < 20;
  }

  shouldRescue(unit) {
  	return unit.isFriendly() && unit.isBound();
  }


}
