function MemoryMatch(col, images, back, base)
{
    var matchScope = this;
    this.GameEngine = null;
    this.CardClass = null;

    this.init(col, images, back, base);

    $("#shuffler").on('click', function(){
        matchScope.GameEngine.shufflecards();
    })
    $("#stopShuffler").on('click', function(){
        matchScope.GameEngine.stopShuffle();
    })
    //$("#gamearea").on('mouseenter', function(){
    //    matchScope.GameEngine.shufflecards();
    //})
    //$("#gamearea").on('mouseleave', function(){
    //    matchScope.GameEngine.stopShuffle();
    //})

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
var game = new MemoryMatch(3, cardimages, cardback, baseUrl);
