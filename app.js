
var game = {
  play: function(){
    this.controller.init();
  }
};

game.controller = {

  init: function() {
    game.view.init();
  },

  getGridInput: function() {
    return game.view.getGridInput();
  },

  setGrid: function(e){
    e.preventDefault();
    var cards;

    cards = game.card.newCards(Math.pow(game.controller.getGridInput(), 2));
    game.view.renderGrid(cards);
  }

};

game.view = {

  init: function(){
    this.grid = $("#grid");
    $("#grid-size-form").submit(game.controller.setGrid);
  },

  getGridInput: function() {
    return $("#grid-size-input").val();
  },

  renderGrid: function(cards){
    visualizedCards = cards.map(this._visualizeCard);
    this.appendCollection(this.grid, visualizedCards);
  },

  appendCollection: function(target, collection) {
    // TODO
  },

  _visualizeCard: function(card, index, cards) {
    var $container, $card, gridSize;
    gridSize = Math.sqrt(cards.length);
    $container = $("<div>").addClass("card-container");
    $container.height(game.view.grid.height() / gridSize);
    $container.width(game.view.grid.width() / gridSize);
    $card = $("<div>").addClass("card");
    $container.append($card);
    return $container;
  }
}

game.card = {

  back: "http://tinyurl.com/hk5d763",

  count: 0,

  cards: [],

  _constructor: function Card(id, front, back) {
    this.id = id;
    this.front = front;
    this.back = back;
    this.flipped = false;
  },

  _new: function(id, front, back) {
    var card;
    this._constructor(id, front, back);
    this.count++;
    this.cards.push(card)
    return card;
  },

  newCards: function(number) {
    for(var count = 0; count < number / 2; count++) {
      this._new(this.count, count, this.back);
      this._new(this.count, count, this.back);
    }
    return this.cards;
  }

}

$(document).ready(function(){
  game.play();
});
