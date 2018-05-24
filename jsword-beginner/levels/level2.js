class Player {

  playTurn(warrior) {
    if (warrior.feel().isUnit()) {
      warrior.attack();
    } else {
      warrior.walk();
    }
  }

}

/*
  Warrior Score: 12
  Time Bonus: 10
  Clear Bonus: 4
  Level Grade: S
  Total Score: 26
*/