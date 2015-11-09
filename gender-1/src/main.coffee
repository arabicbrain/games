Crafty.init 960, 540
Crafty.background 'red'
###
Game =
  start: ->
    Crafty.init 960, 540
    Crafty.background '#ddd'
    masc = 0
    fem = 0
    i = 0
    while i < window.isms.length
      ism = window.isms[i]
      if ism.number == 'single'
        if ism.gender == 'masculine'
          masc += 1
        else
          fem += 1
      i++
    Crafty.e('Actor').text 'Singulars: ' + masc + ' masculine, ' + fem + ' feminine.'

window.addEventListener 'load', Game.start
###
