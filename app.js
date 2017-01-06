'use strict';

var game = {
  play: function(){
    this.controller.init();
  }
};

game.controller = {

  init: function() {
    game.view.init(this);
  },

  getGridInput: function() {
    return game.view.getGridInput();
  },

  cardClicked: function(e) {
    var $card = $(e.target); 
    game.card.toggleFlipped($card.attr('id'));
    game.view.flipCard($card);
  },

  setGrid: function(e){
    e.preventDefault();
    var cards;

    cards = game.card.newCards(Math.pow(game.controller.getGridInput(), 2));
    game.view.renderGrid(cards);
  }

};

game.view = {

  init: function(controller){
    this.grid = $("#grid");
    this._attachEventHandlers(controller);
  },

  getGridInput: function() {
    return $("#grid-size-input").val();
  },

  renderGrid: function(cards){
    var visualizedCards = cards.map(this._visualizeCard);
    this.appendCollection(this.grid, visualizedCards);
  },

  appendCollection: function($target, collection) {
    collection.forEach(function($el){
      $target.append($el);
    })
  },

  flipCard: function($card){
    var card = game.card.find($card.attr('id'));
    if (card.flipped) {
      var $front = $('<div class="front">').text(card.front);
      $card.html($front);
    } else {
      $card.html("");
    }
    $card.toggleClass("flipped");
  },

  _visualizeCard: function(card, index, cards) {
    var $container, $card, gridSize, containerSize;
    gridSize = Math.sqrt(cards.length);
    containerSize = game.view.grid.width() / gridSize;
    $container = $("<div>").addClass("card-container");
    $container.css({
      height: containerSize,
      width: containerSize
    });
    $card = $("<div>").addClass("card");
    $card.attr("id", card.id); // TODO
    $container.append($card);
    return $container;
  },

  _attachEventHandlers: function(controller){
    $("#grid-size-form").submit(controller.setGrid);
    this.grid.on("click", ".card", controller.cardClicked);
  }
}

game.card = {

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
      this._new(this.count, count);
      this._new(this.count, count);
    }
    return this.cardObjects();
  },

  toggleFlipped: function(id) {
    var card = this.find(id);
    card.flipped = !card.flipped;
  },

  find: function(id) {
    return this.cards[id];
  },

  _constructor: function Card(id, front) {
    this.id = id;
    this.front = front;
    this.flipped = false;
  },

  _new: function(id, front) {
    var card;
    card = new this._constructor(id, front);
    this.count++;
    this.cards[card.id] = card;
    return card;
  }

}

$(document).ready(function(){
  game.play();
});
