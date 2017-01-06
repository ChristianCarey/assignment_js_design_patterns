var game = {
  play: function(){
    this.view.init();
  }
};

game.model = {
  cards: ["img1", "img2"]
}

game.view = {
  init: function(){
    this.grid = $("#grid");
    // setting listeners
    $("#grid-size-form").submit(function(){
      var gridSize = $("#grid-size-input").val();
      view.setGrid(gridSize);
    });
  },

  setGrid: function(gridSize){
    // set up grid
      // appending "cards" to #grid
    var $card = $("<div>").addClass("card-container").html("<div class=\"card\">");
    $card.height(this.grid.height() / gridSize);
    $card.width(this.grid.width() / gridSize);
    for(var i = 0; i < gridSize * gridSize; i++){
      this.grid.append($card); // .clone()?
    }
  }
}

$(document).ready(function(){
  game.play();
});