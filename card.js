//generate front and back cards
function Card(id, img, row, col, base, back, gameScope){
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
    this.frontCard.hide();
//method to append cards
    this.appendCards = function(){
        $(this.card).append(cardScope.frontCard, cardScope.backCard);
        $("#" + this.rowNum + this.colNum).append(cardScope.card);
    };

    //hide toggles between cards and remove cards if match
    this.flipBack = function(){
        $(cardScope.backCard).toggle();
        $(cardScope.frontCard).toggle();
    };

    this.testCard = function(){

        console.log(cardScope.imgsrc, cardScope.rowNum, cardScope.colNum, "YO DEAD");
    };

    cardScope.card.on('click', function(e) {
        e.preventDefault();
        console.log(cardScope.imgsrc);
        gameScope.GameEngine.cardClicked(cardScope);
    });
}