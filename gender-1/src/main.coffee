### Extension methods ###
Array::shuffle ?= ->
  if @length > 1 then for i in [@length-1..1]
    j = Math.floor Math.random() * (i + 1)
    [@[i], @[j]] = [@[j], @[i]]
  this

Array::sample ?= (n) ->
  return this.shuffle()[0...n]

### End utils ###

Game =
  width: 540,
  height: 960,

  start: ->
    Crafty.init Game.width, Game.height
    Crafty.background '#ddd'
    masc = 0
    fem = 0
    i = 0
    data = { masculine: [], feminine: [] }

    while i < window.isms.length
      ism = window.isms[i]
      data.masculine.push(ism) if ism.number == 'single' && ism.gender == 'masculine'
      data.feminine.push(ism) if ism.number == 'single' && ism.gender == 'feminine'
      i++

    words = data.feminine.sample(5)
    words.push word for word in data.masculine.sample(5)
    Game.words = words.shuffle()
    Game.correctWords = 0

    button_size = 128
    Game.arabic = Crafty.e('Actor').move(Game.width / 4, Game.height / 5).fontSize(72)
    Game.translation = Crafty.e('Actor').move(Game.width / 4, Game.height / 3).fontSize(36)

    Game.masculineButton = Crafty.e('Actor')
      .move(64, Game.height / 2)
      .color('#8888ff').size(button_size, button_size)
      .click(() -> return Game.checkAndScoreCurrentWord("masculine"))

    Game.feminineButton = Crafty.e('Actor')
      .move(Game.width - 64 - button_size, Game.height / 2)
      .color("#ffbbbb").size(button_size, button_size)
      .click(() -> return Game.checkAndScoreCurrentWord("feminine"))

    Game.showRandomWord()

  showRandomWord: ->
    Game.currentWord = Game.words.sample(1)[0]
    Game.words = Game.words.filter (w) -> w isnt Game.currentWord # remove "word" from Game.words
    Game.arabic.text(Game.currentWord.arabic)
    Game.arabic.size(Game.width / 2, 72)

    Game.translation.text(Game.currentWord.english)
    Game.translation.size(Game.width / 2, 72)

  checkAndScoreCurrentWord: (selectedGender) ->
    correct = Game.currentWord.gender is selectedGender
    Game.correctWords += 1 if correct
    if Game.isGameOver()
      Game.showGameOver()
    else
      Game.showRandomWord()

  showGameOver: ->
    Game.arabic.destroy()
    Game.translation.destroy()
    Game.masculineButton.destroy()
    Game.feminineButton.destroy()
    Crafty.e('Actor').text("Score: #{Game.correctWords * 10}").fontSize(72);

  isGameOver: ->
    return Game.words.length == 0

window.addEventListener 'load', Game.start
