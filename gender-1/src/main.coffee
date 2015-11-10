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
  start: ->
    Crafty.init 960, 540
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
    words.shuffle

    Crafty.e('Actor').text(word.arabic for word in words)

window.addEventListener 'load', Game.start
