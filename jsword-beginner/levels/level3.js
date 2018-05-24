class Player {

  playTurn(warrior) {
    if (warrior.feel().isUnit()) {
      warrior.attack();
    } else {
      if (warrior.health() < 8 && this.getUnitsNearby(warrior).length > 0) {
        warrior.rest();
      } else {
        warrior.walk();
      }
    }
  }

  getUnitsNearby(warrior) {
    const spaces = warrior.look();
    let units = [];
    spaces.forEach( space => {
      if (space.isUnit()) units.push(space.getUnit());
    });
    return units;
  }

}

/*
  Warrior Score: 48
  Time Bonus: 12
  Clear Bonus: 12
  Level Grade: S
  Total Score: 72
*/