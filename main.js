
function MemoryMatch(){
    var gameScope = this;
    this.cardImageBaseUrl = "";
    this.cardBackUrl = "";
    this.title=  "MemMatch";
    this.cardSet = [];
    this.shuffleCount = 3;
    this.rows = 3;
    //current board layout with objects in position
    this.board = [];
    //current card Objects in game
    this.cardObjects = {};
    //run config with amount of columns
    this.config = function(cols, imageArray, imageBack, baseUrl){
        if(imageArray){
            this.cardSet = imageArray;
            this.cardBackUrl = imageBack;
        }
        else{
            alert('no images provided!');
            return
        }
        this.cardImageBaseUrl = baseUrl || "";
        gameScope.rows = this.colCheck(cols);
        gameScope.boardCreate(cols);
        this.boardAdjust();
    };
    //re align cards to match with board dimensions
    this.boardAdjust = function(){
        var width = Math.floor( 100/gameScope.board[0].length );
        var height = Math.floor(100/gameScope.board.length);
        var $grid = $(".gridSquare");
        console.log("width: " + width, "height: " + height, "rows: " + gameScope.rows);
        $grid.width((width -1) + "%").height( (height - 1) + "%");
        if($grid.width() > $grid.height() ){
            $(".card").width($grid.height() + "px");
            $(".front, .back").height($grid.height() + "px");
        }
        else{
            $(".card").width($grid.width() + "px");
            $(".front, .back").height($grid.height() + "px");
        }
    };

    this.boardCreate = function(r){
        var imgArr = [];
        var colSize = this.colCheck(r);
        console.log(colSize);
        var row = [];
        var rowNum = 0;
        var colNum = 0;
        gameScope.cardObjects = {};
        // copy the cards into the array twice (we need one of each to match)
        imgArr = imgArr.concat(this.cardSet).concat(this.cardSet);
        // here we shuffle the cards a few times to randomize them each time
        for (var i = 0; i < this.shuffleCount; i++) {
            imgArr = this.shuffle(imgArr);
        }
        //loops through the randomized array and puts them in the board array
        // also adds each card to an card object holder
        for(var j = 0; j < imgArr.length; j++){
            var gridSquare = $("<div>", {
                class: "gridSquare",
                id: rowNum + "" + colNum
            });
            //create a new card object with array position img and index
            gameScope.cardObjects[j] = new Card(j, imgArr[j], rowNum, colNum, this.cardImageBaseUrl, this.cardBackUrl);
            //append a grid div to game area
            $("#gamearea").append(gridSquare);
            //tell the card object to append itself;
            gameScope.cardObjects[j].appendCards();
            //push the card object to a row array;
            row.push(this.cardObjects[j]);
            //checks current row is full and creates a new one
            if((j + 1) % colSize == 0){
                gameScope.board.push(row);
                row = [];
                rowNum += 1;
                colNum = 0;
            }
            //keeps adding to array
            else{
                colNum += 1;
            }
        }
        console.log(gameScope.board, gameScope.cardObjects);
    };
    //shuffle an array
    this.shuffle = function(arr) {
        var currNum = arr.length,
            temp, ranNum;
        // While there remain elements to shuffle
        while (currNum) {
            // pick a remaining element
            ranNum = Math.floor(Math.random() * currNum);
            currNum -= 1;
            // and swap it with the current element
            temp = arr[currNum];
            arr[currNum] = arr[ranNum];
            arr[ranNum] = temp;
        }
        return arr;
    };
    //checks if columns will be equal otherwise counts down until 1 vertical column
    this.colCheck = function(num){
        for(var i = num; i > 1 ; i -= 1){
            if((gameScope.cardSet.length * 2) % i == 0){
                return i;
            }
        }
        return 1;
    };

    this.reset = function(){
        gameScope.boardCreate();
    };

    this.Board = function(){

    };

//card logic
    // this.setCards = function(){
    // this.card_clicked = null;
    // var clicked = this.card_clicked;
    this.first_card_clicked = null;
    var first = this.first_card_clicked;
    this.second_card_clicked = null;
    var second = this.second_card_clicked;

    this.firstCardClickedSet = function(id){

        if (first === null){
            first = this.cardObjects[id];
            first.flipBack();
        }
        else if (second !== null || first.id == id){
            return;
        }
        else {
            this.secondCardClickedSet(id);
        }
    };

    this.secondCardClickedSet = function(id){
        second = this.cardObjects[id];
        second.flipBack();

        setTimeout(function(){
            if (first.imgsrc === second.imgsrc) {
                // toggle function
                first.card.hide();
                second.card.hide();
            }
            else {
                first.flipBack();
                second.flipBack();
                first = null;
                second = null;
            }
        }, 1500);

    };
    //close the setCards function

    this.compareCards = function(){
        if (first === second){
            //increase match counter
            pairs_matched++;
            //remove from dom

            //increase attempts
            attempts++;
            //accuracy calculation
        }
        else {
            //flip both cards back
            cardScope.flipBack();
            //increase attemtps
            attempts++;
            //accuracy calculation
        }
    };

    this.flipTopCard = function(id){
        var r = gameScope.cardObjects[id].rowNum;
        var c = gameScope.cardObjects[id].colNum;
        if( typeof gameScope.board[r - 1][c] !== "undefined"){
            gameScope.board[r - 1][c].flipBack();
            setTimeout(function(){
                gameScope.board[r - 1][c].flipBack();
            }, 500);
        }

    }

}//close the memory match function

//generate front and back cards
function Card(id, img, row, col, base, back){
    var cardScope = this;
    var baseUrl = base ;
    this.id = id;
    this.imgsrc = img;
    this.colNum = col;
    this.rowNum = row;
    this.card = $("<div>", {
        id: id,
        class: "card"
    });

    this.frontCard = $("<div>", {
        html: "<img src='" + base + img + "'>",
        class: "front"
    });

    this.backCard = $("<div>",{
        html: "<img src='" + base + back + "'>",
        class: "back"
        //css: {"background": 'url(' + baseUrl + 'card-' + img + '.jpg) no-repeat'}
    });

//method to append cards
    this.appendCards = function(){
        $(this.card).append(cardScope.frontCard, cardScope.backCard);
        $("#" + this.rowNum + this.colNum).append(cardScope.card);
    };

    //hide toggles between cards and remove cards if match
    this.flipBack = function(){
        $(cardScope.backCard).toggle();
    };

    this.testCard = function(){

        console.log(cardScope.imgsrc, cardScope.rowNum, cardScope.colNum, "YO DEAD");
    }
}
//To create a game you need an image array, back image, and optional image url
var cardimages =  [ 'flower.jpg','toad.jpg','goomba.jpg','mario.jpg','luigi.jpg','yoshi.jpg'];
var cardback = 'back.jpg';
var baseUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/19554/card-';
var game = new MemoryMatch();
game.config(5, cardimages, cardback, baseUrl);


$("#gamearea").on('click','.card',function(){
    // console.log($.grep(game.board, function(e){ return e[0] == "luigi"; }));
    //game.flipTopCard(this.id);
    game.firstCardClickedSet(this.id);
});

//$("#gamearea").on("click", '.front', function(){
//    console.log("front clicked");
//});

$( window ).resize(function() {
    game.boardAdjust();
});

//edit for later