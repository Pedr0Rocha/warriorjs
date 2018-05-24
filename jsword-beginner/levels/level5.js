class Player {

  constructor() {
    this.lastTurnHP = 20;
  }

  playTurn(warrior) {
    if (warrior.feel().isUnit()) {

      const target = warrior.feel().getUnit();

      if (target.isHostile()) {
        warrior.attack();
      } else {
        warrior.rescue();
      }

    } else {

      if (this.shouldRest(warrior)) {
        warrior.rest();
      } else {
        warrior.walk();
      }

    }

    this.lastTurnHP = warrior.health();
  }

  getHostileUnitsNearby(warrior) {
    const spaces = warrior.look();
    let hostileUnits = [];
    spaces.forEach( space => {
      if (space.isUnit() && space.getUnit().isHostile()) hostileUnits.push(space.getUnit());
    });
    return hostileUnits;
  }

  shouldRest(warrior) {
    return !this.isTakingDmg(warrior) && this.getHostileUnitsNearby(warrior).length > 0 && warrior.health() < 13;
  }

  isTakingDmg(warrior) {
    return this.lastTurnHP > warrior.health();
  }

}

/*
  Warrior Score: 78
  Time Bonus: 25
  Clear Bonus: 21
  Level Grade: S
  Total Score: 124
*/