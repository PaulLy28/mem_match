function MemoryMatch(col, images, back, base)
{
    this.GameEngine = null;
    this.CardClass = null;

    this.init(col, images, back, base);
}

MemoryMatch.prototype.init = function(col, images, back, base)
{
    this.GameEngine = new GameLogic(this);
    this.CardClass = Card;
    this.GameEngine.config(col, images, back, base);
};

//To create a game you need an image array, back image, and optional image url
var cardimages =  [ 'flower.jpg','toad.jpg','goomba.jpg','mario.jpg','luigi.jpg','yoshi.jpg'];
var cardback = 'back.jpg';
var baseUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/19554/card-';
var game = new MemoryMatch(5, cardimages, cardback, baseUrl);
