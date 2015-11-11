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

    loadAudio(['assets/audio/right-answer.ogg', 'assets/audio/wrong-answer.ogg'], function() {
      // TODO: do this automatically in loadAudio
      Crafty.audio.add("rightAnswer", "assets/audio/right-answer.ogg");
      Crafty.audio.add("wrongAnswer", "assets/audio/wrong-answer.ogg");

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

      Game.arabic = Crafty.e('Text2').move(Game.width / 4, Game.height / 5).fontSize(72);
      Game.translation = Crafty.e('Text2').move(Game.width / 4, Game.height / 3).fontSize(36);

      Game.masculineButton = Crafty.e('Text2, Actor').move(64, Game.height / 2).color('#8888ff').size(BUTTON_SIZE, BUTTON_SIZE).click(function() {
        Game.checkAndScoreCurrentWord("masculine");
      });
      Game.feminineButton = Crafty.e('Text2, Actor').move(Game.width - 64 - BUTTON_SIZE, Game.height / 2).color("#ffbbbb").size(BUTTON_SIZE, BUTTON_SIZE).click(function() {
        Game.checkAndScoreCurrentWord("feminine");
      });

      Game.scoreText = Crafty.e('Text2').text("Score: 0").fontSize(48);

      Game.showRandomWord();
    })
  },

  showRandomWord: function() {
    // Take a random word, removing it from the array
    Game.currentWord = Game.words.sample(1)[0];
    Game.words = Game.words.filter(function(w) {
      return w !== Game.currentWord;
    });

    Game.arabic.text(Game.currentWord.arabic);
    Game.translation.text(Game.currentWord.english);
  },

  checkAndScoreCurrentWord: function(selectedGender) {
    var correct = Game.currentWord.gender === selectedGender;

    if (correct) {
      Game.correctWords += 1;
      Crafty.audio.play("rightAnswer");
    } else {
      Crafty.audio.play("wrongAnswer");
    }

    Game.scoreText.text("Score: " + (Game.correctWords * 10));

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
  },

  isGameOver: function() {
    return Game.words.length === 0;
  }
};

window.addEventListener('load', Game.start);
