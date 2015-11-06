Game = {
 start: function() {
   Crafty.init(960, 540);
   Crafty.background("#ddd");
   Crafty.e('Actor').size(64, 64).color('red').controllable(150);

   var masc = 0;
   var fem = 0;

   for (var i = 0; i < window.isms.length; i++) {
     var ism = window.isms[i];
     if (ism.number == "single") {
       if (ism.gender == "masculine") {
         masc += 1;
       } else {
         fem += 1;
       }
     }
   }

   console.log("Singulars: " + masc + " masculine, " + fem + " feminine.");
 }
}

window.addEventListener('load', Game.start);
