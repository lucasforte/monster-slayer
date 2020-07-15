new Vue({
  el: '#app',
  data: {
    isGameRunning: false,
    playerStatus: {
      hp: 100
    },
    monsterStatus: {
      hp: 100
    },
    turns: []
  },
  methods: {
    gameStart: function() {
      this.isGameRunning = true;
      this.playerStatus.hp = 100;
      this.monsterStatus.hp = 100;
      this.turns = []
    },
    gameEnd: function() {
      this.isGameRunning = false;
    },
    rollDice: function(min, max, role, action) {
      var roll = Math.ceil((Math.random() * (max - min) + min));
      this.turns.unshift({
        role: role,
        message: `${role} ${action}s for ${roll}`
      })
      return roll;
    },
    monsterAttacks: function() {
      this.playerStatus.hp -= this.rollDice(1, 20, 'Monster', 'attack');
      this.checkBattleEnd()
    },
    checkBattleEnd:  function() {
      if(this.playerStatus.hp <= 0) {
        if(confirm('You lost :(  New game?')) {
          this.gameStart();
        } else {
          this.isGameRunning = false;
        }
        return true;
      } else if(this.monsterStatus.hp <= 0) {
        if(confirm('You won :) New game?')) {
          this.gameStart();
        } else {
          this.isGameRunning = false;
        }
        return true;
      } else {
        return false;
      }
    },
    attackRoll: function() {
      this.monsterStatus.hp -= this.rollDice(1, 20, 'Player', 'attack');
      if(this.checkBattleEnd()) { return; }

      this.monsterAttacks();
    },
    specialAttackRoll: function() {
      this.monsterStatus.hp -= this.rollDice(15, 30, 'Player', 'critical attack');
      if(this.checkBattleEnd()) { return; }
    
      this.monsterAttacks();
    },
    healRoll: function() {
      var heal = this.rollDice(5, 10, 'Player', 'heal')

      if((this.playerStatus.hp += heal) <= 100) {
        this.playerStatus.hp += heal;
      }else if((this.playerStatus.hp += heal) >= 100) {
        this.playerStatus.hp = 100
      }
      this.monsterAttacks()
    },
  }
})