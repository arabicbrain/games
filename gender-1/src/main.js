/*** Extension methods ***/
// Don't override existing methods
if (Array.prototype.shuffle == null) {
  Array.prototype.shuffle = function() {
    var i, j, k, ref, ref1;
    if (this.length > 1) {
      // Fisher-Yates shuffling
      for (i = k = ref = this.length - 1; ref <= 1 ? k <= 1 : k >= 1; i = ref <= 1 ? ++k : --k) {
        j = Math.floor(Math.random() * (i + 1));
        ref1 = [this[j], this[i]], this[i] = ref1[0], this[j] = ref1[1];
      }
    }
    return this;
  };
}

if (Array.prototype.sample == null) {
  Array.prototype.sample = function(n) {
    return this.shuffle().slice(0, n);
  };
}

/*** End utils ***/

var Game = {
  width: 540,
  height: 960,

  start: function() {
    Crafty.init(Game.width, Game.height);
    Crafty.background('#ddd');

    var masc = 0;
    var fem = 0;

    var data = {
      masculine: [],
      feminine: []
    };

    for (var i = 0; i < window.isms.length; i++) {
      ism = window.isms[i];
      if (ism.number === 'single' && ism.gender === 'masculine') {
        data.masculine.push(ism);
      }
      if (ism.number === 'single' && ism.gender === 'feminine') {
        data.feminine.push(ism);
      }
    }

    var words = data.feminine.sample(5);
    var masculineWords = data.masculine.sample(5);
    for (var i = 0; i < masculineWords.length; i++) {
      word = masculineWords[i];
      words.push(word);
    }

    Game.words = words.shuffle();
    Game.correctWords = 0;
    var BUTTON_SIZE = 128;

    Game.arabic = Crafty.e('Actor').move(Game.width / 4, Game.height / 5).fontSize(72);
    Game.translation = Crafty.e('Actor').move(Game.width / 4, Game.height / 3).fontSize(36);

    Game.masculineButton = Crafty.e('Actor').move(64, Game.height / 2).color('#8888ff').size(BUTTON_SIZE, BUTTON_SIZE).click(function() {
      Game.checkAndScoreCurrentWord("masculine");
    });
    Game.feminineButton = Crafty.e('Actor').move(Game.width - 64 - BUTTON_SIZE, Game.height / 2).color("#ffbbbb").size(BUTTON_SIZE, BUTTON_SIZE).click(function() {
      Game.checkAndScoreCurrentWord("feminine");
    });

    Game.showRandomWord();
  },

  showRandomWord: function() {
    // Take a random word, removing it from the array
    Game.currentWord = Game.words.sample(1)[0];
    Game.words = Game.words.filter(function(w) {
      return w !== Game.currentWord;
    });

    Game.arabic.text(Game.currentWord.arabic).size(Game.width / 2, 72);
    Game.translation.text(Game.currentWord.english).size(Game.width / 2, 72);
  },

  checkAndScoreCurrentWord: function(selectedGender) {
    var correct = Game.currentWord.gender === selectedGender;
    if (correct) {
      Game.correctWords += 1;
    }
    if (Game.isGameOver()) {
      Game.showGameOver();
    } else {
      Game.showRandomWord();
    }
  },

  showGameOver: function() {
    Game.arabic.destroy();
    Game.translation.destroy();
    Game.masculineButton.destroy();
    Game.feminineButton.destroy();
    Crafty.e('Actor').text("Score: " + (Game.correctWords * 10)).fontSize(72);
  },

  isGameOver: function() {
    return Game.words.length === 0;
  }
};

window.addEventListener('load', Game.start);
