Game = {
 start: function() {
   Crafty.init(960, 540);
   Crafty.background("#ddd");
   Crafty.e('Actor').size(64, 64).color('red').controllable(150);
 }
}

window.addEventListener('load', Game.start);
