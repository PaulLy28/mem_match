
function MemoryMatch(cardset){
    this.title=  "MemMAtch";
    this.cardSet = cardset;
    var baseUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/19554/';
    this.shuffleCount = 3;
    this.board = [];
    this.cardObjects = {};

    this.talk = function(){
        console.log("talk");
    }

    this.boardCreate = function(){
        var imgArr = [];
        var rowSize = 3;
        var row = [];
        // copy the cards into the array twice (we need one of each to match)
        imgArr = imgArr.concat(this.cardSet).concat(this.cardSet);
        // here we shuffle the cards a few times to randomize them each time
        for (var i = 0; i < this.shuffleCount; i++) {
            imgArr = this.shuffle(imgArr);
        }
        for(var j = 0; j < imgArr.length; j++){
            if((j + 1) % rowSize != 0){
                row.push(imgArr[j]);
                this.cardObjects[j] = new Card(j, imgArr[j]);
                this.cardObjects[j].appendCards();
            }
            else{
                row.push(imgArr[j]);
                this.cardObjects[j] = new Card(j, imgArr[j]);
                this.board.push(row);
                this.cardObjects[j].appendCards();
                row = [];
            }
        }
        console.log(this.board, this.cardObjects);
    }
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


    this.reset = function(){
        this.boardCreate();
    }

    this.Board = function(){

    }

//generate front and back cards
    function Card(id, img){
        this.id = id;
        this.card = $("<div>", {
            id: id,
            class: "card",
            text: "hello"
        });
        this.frontCard = $("<div>", {
            id: "frontOfCard",
            img: baseUrl + img,
            class: "front"

        });

        this.backCard = $("<div>",{
            id: "backOfCard",
            img: baseUrl + "images/" + img,
            class: "back"
        });

//method to append cards
        this.appendCards = function(){
            $(this.card).append(this.frontCard, this.backCard);
            $("#gamearea").append(this.card);
        }

        //hide toggles between cards and remove cards if match
        this.toggleCards = function(){
            $("cardClicked").toggleClass("");
        }

        this.testCard = function(){
            console.log(this.id);
        }

    }
}
var cardimages =  [ 'flower','toad','goomba','mario'];
var game = new MemoryMatch(cardimages);
game.boardCreate();

$("#gamearea").on('click','#front',function(){
    console.log(this.id);
})

//edit for later
