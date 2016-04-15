
function MemoryMatch(cardset) {
    var gameScope = this;

    this.title = "MemMAtch";
    this.cardSet = cardset;
    this.shuffleCount = 3;
    this.board = [];
    this.cardObjects = {};

    this.config = function () {
        gameScope.boardCreate();
    };

    this.boardCreate = function () {
        var imgArr = [];
        var rowSize = this.rowCheck(2);
        console.log(rowSize);
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
        for (var j = 0; j < imgArr.length; j++) {
            //checks if row is full
            if ((j + 1) % rowSize == 0) {
                gameScope.cardObjects[j] = new Card(j, imgArr[j], rowNum, colNum);
                gameScope.cardObjects[j].appendCards();
                row.push(gameScope.cardObjects[j]);
                gameScope.board.push(row);
                row = [];
                rowNum += 1;
                colNum = 0;
            }
            else {
                gameScope.cardObjects[j] = new Card(j, imgArr[j], rowNum, colNum);
                gameScope.cardObjects[j].appendCards();
                row.push(this.cardObjects[j]);
                colNum += 1;
            }
        }
        console.log(gameScope.board, gameScope.cardObjects);
    };
    //shuffle an array
    this.shuffle = function (arr) {
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
    //checks if rows will be equal otherwise counts down until 1 row
    this.rowCheck = function (num) {
        for (var i = num; i > 1; i -= 1) {
            if ((gameScope.cardSet.length * 2) % i == 0) {
                return i;
            }
        }
        return 1;
    };

    this.reset = function () {
        gameScope.boardCreate();
    };

    this.Board = function () {

    };

//card logic
    // this.setCards = function(){
    // this.card_clicked = null;
    // var clicked = this.card_clicked;
    this.first_card_clicked = null;
    var first = this.first_card_clicked;
    this.second_card_clicked = null;
    var second = this.second_card_clicked;

    this.firstCardClickedSet = function (id) {
        if (first === null) {
            first = this.cardObjects[id];
            first.flipBack();
        }
        else {
            this.secondCardClickedSet(id);
        }
    };

    this.secondCardClickedSet = function (id) {
        second = this.cardObjects[id];
        second.flipBack();
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
    };
    //};  //close the setCards function

    this.compareCards = function () {
        if (first === second) {
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
        //}

    }
}//close the memory match function
//generate front and back cards
function Card(id, img, row, col){
    var cardScope = this;
    var baseUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/19554/';
    this.id = id;
    this.imgsrc = img;
    this.colNum = col;
    this.rowNum = row;
    this.card = $("<div>", {
        id: id,
        class: "card",
        text: "hello"
    });

    this.frontCard = $("<div>", {
        html: "<img src='" + baseUrl + 'card-' + img + ".jpg'>",
        class: "front"
    });

    this.backCard = $("<div>",{
        html: "<img src='" + baseUrl + 'card-back.jpg' + "'>",
        class: "back"
    });

//method to append cards
    this.appendCards = function(){
        $(this.card).append(cardScope.frontCard, cardScope.backCard);
        $("#gamearea").append(cardScope.card);
    };

    //hide toggles between cards and remove cards if match
    this.flipBack = function(){
        $(cardScope.backCard).toggle();
    };

    this.testCard = function(){
        console.log(cardScope.imgsrc, cardScope.rowNum, cardScope.colNum, "YO DEAD");
    }
}

var cardimages =  [ 'flower','toad','goomba','mario','luigi'];
var game = new MemoryMatch(cardimages);
game.boardCreate();



$("#gamearea").on('click','.card',function(){
   // console.log($.grep(game.board, function(e){ return e[0] == "luigi"; }));
  //  game.cardObjects[this.id].flipBack();
    game.firstCardClickedSet(this.id);
});

$("#gamearea").on("click", '.front', function(){
    console.log("front clicked");
});

//edit for later