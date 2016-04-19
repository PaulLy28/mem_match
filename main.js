
function GameLogic(gameManager){
    var gameScope = gameManager;
    var logicScope = this;
    var gameArea = $("#gamearea");
    //var iso = gameArea.data('isotope');
    logicScope.cardImageBaseUrl = "";
    logicScope.cardBackUrl = "";
    logicScope.title =  "MemMatch";
    logicScope.cardSet = [];
    logicScope.shuffleCount = 3;
    logicScope.shufflers = [];
    //current board layout with objects in position
    logicScope.board = [];
    //current card Objects in game
    logicScope.cardObjects = {};

    gameArea.imagesLoaded( function() {
        console.log("images loaded!");
        gameArea.isotope({
            itemSelector: '.gridSquare',
            masonry: {
                columnWidth: 100
            }
        }).isotope('shuffle');
        setTimeout(function(){
            gameArea.isotope('shuffle');
        }, 800)
    });

    logicScope.shufflecards = function(){
        var yo = setInterval(function(){
            gameArea.isotope('shuffle');
        }, 200);
        logicScope.shufflers.push(yo);
    };
    logicScope.stopShuffle = function(){
        for(var i = 0; i < logicScope.shufflers.length; i++){
            clearInterval(logicScope.shufflers[i]);
        }
    };

    logicScope.config = function(cols, imageArray, imageBack, baseUrl){
        if(imageArray){
            logicScope.cardSet = imageArray;
            logicScope.cardBackUrl = imageBack;
        }
        else{
            alert('no images provided!');
            return
        }
        logicScope.cardImageBaseUrl = baseUrl || "";

        logicScope.boardCreate(cols);
        //this.boardAdjust();
    };
    //re align cards to match with board dimensions
    logicScope.boardAdjust = function(){
        var width = Math.floor( 100/logicScope.board[0].length );
        var height = Math.floor(100/logicScope.board.length);
        var $grid = $(".gridSquare");
        console.log("width: " + width, "height: " + height);
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

    logicScope.boardCreate = function(r){
        var imgArr = [];
        var colSize = logicScope.colCheck(r);
        console.log(colSize);
        var row = [];
        var rowNum = 0;
        var colNum = 0;
        logicScope.cardObjects = {};
        // copy the cards into the array twice (we need one of each to match)
        imgArr = imgArr.concat(this.cardSet).concat(this.cardSet);
        // here we shuffle the cards a few times to randomize them each time
        for (var i = 0; i < logicScope.shuffleCount; i++) {
            imgArr = logicScope.shuffle(imgArr);
        }
        //loops through the randomized array and puts them in the board array
        // also adds each card to an card object holder
        for(var j = 0; j < imgArr.length; j++){
            var gridSquare = $("<div>", {
                class: "gridSquare " + imgArr[j],
                id: rowNum + "" + colNum
            });
            //create a new card object with array position img and index
            logicScope.cardObjects[j] = new gameScope.CardClass(j, imgArr[j], rowNum, colNum, logicScope.cardImageBaseUrl, logicScope.cardBackUrl, gameScope);
            //append a grid div to game area
            gameArea.append(gridSquare);
            //tell the card object to append itself;
            logicScope.cardObjects[j].appendCards();
            //push the card object to a row array;
            row.push(this.cardObjects[j]);
            //checks current row is full and creates a new one
            if((j + 1) % colSize == 0){
                logicScope.board.push(row);
                row = [];
                rowNum += 1;
                colNum = 0;
            }
            //keeps adding to array
            else{
                colNum += 1;
            }
        }
        console.log(logicScope.board, logicScope.cardObjects);
    };
    //shuffle an array
    logicScope.shuffle = function(arr) {
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
    logicScope.colCheck = function(num){
        for(var i = num; i > 1 ; i -= 1){
            if((logicScope.cardSet.length * 2) % i == 0){
                return i;
            }
        }
        return 1;
    };

    logicScope.reset = function(){
        logicScope.boardCreate();
    };

    logicScope.Board = function(){

    };

//card logic
    // this.setCards = function(){
    // this.card_clicked = null;
    // var clicked = this.card_clicked;
    logicScope.first_card_clicked = null;
    var first = this.first_card_clicked;
    logicScope.second_card_clicked = null;
    var second = this.second_card_clicked;

    logicScope.cardClicked = function(card){

        if (first === null){
            first = card;
            first.flipBack();
        }
        else if (second !== null || first == card){
            return;
        }
        else {
            logicScope.secondCardClickedSet(card);
        }
    };

    logicScope.secondCardClickedSet = function(card){
        second = card;
        second.flipBack();

        setTimeout(function(){
            if (first.imgsrc === second.imgsrc) {
                // toggle function
                first.card.addClass("matched").hide();
                second.card.addClass("matched").hide();
                gameArea.isotope('shuffle');
                if($(".matched").length == logicScope.cardSet.length * 2) console.log("you win");
            }
            else {
                first.flipBack();
                second.flipBack();
            }
            first = null;
            second = null;
        }, 800);

    };


    this.flipTopCard = function(id){
        var r = logicScope.cardObjects[id].rowNum;
        var c = logicScope.cardObjects[id].colNum;

        if(typeof logicScope.board[r - 1] !== "undefined" && typeof logicScope.board[r - 1][c] !== "undefined"){
            logicScope.board[r - 1][c].flipBack();
            setTimeout(function(){
                logicScope.board[r - 1][c].flipBack();
            }, 500);
        }

    }


    //$( window ).resize(function() {
    //    logicScope.boardAdjust();
    //});

}//close the memory match function