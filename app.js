
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

  cardClicked: function(e) {
    $card = $(e.target);
    game.card.toggleFlipped($card.id);
  },

  setGrid: function(e){
    e.preventDefault();
    var cards;

    cards = game.card.newCards(Math.pow(game.controller.getGridInput(), 2));

console.log(cards);

    game.view.renderGrid(cards);
  }

};

game.view = {

  init: function(){
    this.grid = $("#grid");
    this._attachEventHandlers();
  },

  getGridInput: function() {
    return $("#grid-size-input").val();
  },

  renderGrid: function(cards){
    visualizedCards = cards.map(this._visualizeCard);
    this.appendCollection(this.grid, visualizedCards);
  },

  appendCollection: function($target, collection) {
    collection.forEach(function($el){
      $target.append($el);
    })
  },

  _visualizeCard: function(card, index, cards) {
    var $container, $card, gridSize, containerSize;
    gridSize = Math.sqrt(cards);
    containerSize = game.view.grid.width() / gridSize;
    $container = $("<div>").addClass("card-container");
    $container.css({
      height: containerSize,
      width: containerSize
    });
    $card = $("<div>").addClass("card");
    $card.addId(card.id);
    $container.append($card);
    return $container;
  },

  _attachEventHandlers: function(){
    $("#grid-size-form").submit(game.controller.setGrid);
    this.grid.on("click", "card", game.controller.cardClicked);
  }
}

game.card = {

  back: "http://tinyurl.com/hk5d763",

  count: 0,

  cards: {},

  cardObjects: function() {
    var ids = Object.keys(this.cards);
    var cardObjects = new Array(ids.length);
    ids.forEach(function(id, index){
      cardObjects[index] = game.card.cards[id];
    });
    return cardObjects;
  },

  newCards: function(number) {
    for(var count = 0; count < number / 2; count++) {
      this._new(this.count, count, this.back);
      this._new(this.count, count, this.back);
    }
    return this.cardObjects();
  },

  toggleFlipped: function(id) {
    var card = cards[id];
    card.flipped = !card.flipped;
  },

  _constructor: function Card(id, front, back) {
    this.id = id;
    this.front = front;
    this.back = back;
    this.flipped = false;
  },

  _new: function(id, front, back) {
    var card;
    card = new this._constructor(id, front, back);
    this.count++;
    this.cards[card.id] = card;
    return card;
  }

}

$(document).ready(function(){
  game.play();
});
