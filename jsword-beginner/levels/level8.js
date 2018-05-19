class Player {

	constructor() {
		this.lastTurnHP = 20;
		this.hitBackWallOnce = false;
	}

  playTurn(warrior) {

  	const frontSpace = warrior.feel();
  	const backSpace = warrior.feel('backward');

  	const frontTarget = frontSpace.isUnit() ? frontSpace.getUnit() : null;
  	const backTarget = backSpace.isUnit() ? backSpace.getUnit() : null;

  	const target = frontTarget || backTarget;
  	const targetDirection = backTarget ? 'backward' : 'forward';

  	const unitsNearby = this.getUnitsNearby(warrior);

  	if (unitsNearby.length > 0 && unitsNearby[0].isHostile()) {

  		warrior.shoot();

  	} else if (target) {

  		if (this.shouldRescue(target)) {
  			warrior.rescue(targetDirection);
  		} else {
  			warrior.attack(targetDirection);
  		}

  	} else {

  		if (this.shouldRest(warrior)) {
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

  	if (warrior.feel('backward').isWall()) this.hitBackWallOnce = true;
  	this.lastTurnHP = warrior.health();
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
		return !target && this.isTakingDmg(warrior) && warrior.health() < 15;
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
