class Player {

  constructor() {
    this.lastTurnHP = 20;
  }

  playTurn(warrior) {
    if (warrior.feel().isUnit()) {

      warrior.attack();

    } else {

      if (this.shouldRest(warrior)) {
        warrior.rest();
      } else {
        warrior.walk();
      }

    }

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

  shouldRest(warrior) {
    return !this.isTakingDmg(warrior) && this.getUnitsNearby(warrior).length > 0 && warrior.health() < 12;
  }

  isTakingDmg(warrior) {
    return this.lastTurnHP > warrior.health();
  }

}

/*
  Warrior Score: 55
  Time Bonus: 20
  Clear Bonus: 15
  Level Grade: S
  Total Score: 90
*/