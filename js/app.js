// variables
let cards = [
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor", 
    "fa-bolt", 
    "fa-cube", 
    "fa-leaf", 
    "fa-bicycle", 
    "fa-bomb",
    "fa-diamond", 
    "fa-paper-plane-o", 
    "fa-anchor", 
    "fa-bolt", 
    "fa-cube", 
    "fa-leaf", 
    "fa-bicycle", 
    "fa-bomb"
];
let openCard = [];
let openCardId = [];
let matchPair = 0;
let moves = 0;
let starRating = "3";
let timer;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// shuffles the cards randomly
function shuffleCard() {
    let cardList = shuffle(cards);
    let cardDeck = document.querySelector('.deck');
    cardDeck.innerHTML = '';

    for (let i = 0; i < cardList.length; i++) {
        let deckLi = document.createElement('li');
        deckLi.setAttribute("class", "card");
        deckLi.setAttribute("id", i+1);
        deckLi.innerHTML = '<i class="fa ' + cardList[i] + '"></i>';
        cardDeck.appendChild(deckLi);
      }
}

// reset openCard.length to 0
function removeOpenCards() {
    openCard = [];
    openCardId = [];
  }

// open close card
function clickCard() {
    let cardDeck = document.querySelector('.deck');
    cardDeck.addEventListener("click", function(e) {
        
        // partly from https://stackoverflow.com/questions/17636043/cannot-add-click-events-to-list-items
        if(e.target && e.target.nodeName == "LI") {
            e.target.className = 'card open show';
        }

        openCard.push(e.target.innerHTML);
        openCardId.push(e.target.id);
        // console.log(openCard[openCard.length-1]);
        
        if (openCard.length === 2) {
            if (openCard[0] === openCard[1]) {
                document.getElementById(openCardId[0]).className = 'card match';
                document.getElementById(openCardId[1]).className = 'card match';
                matchPair += 1;
                removeOpenCards();
                allMatch();
                moves++
            } else {
                document.getElementById(openCardId[0]).className = 'card';
                document.getElementById(openCardId[1]).className = 'card';
                removeOpenCards();
                moves++
            }
        }
        counterMoves();
    })
}

// popup filling
function allMatch() {
    if (matchPair === 8) {
        //console.log("Cool!");
        let winner = document.getElementById("myPopup");
        winner.style.display = "block";
        
        // partly from https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript
        document.querySelector('#play-again-btn').addEventListener("click",function() {
            location.reload()
        });
        
        document.querySelector('#total-moves').textContent = moves;
        document.querySelector('#total-stars').textContent = starRating;

        clearInterval(timer);
    }
}

// starting timer ++
function counterTime() {
    let clicks = 0;
    document.querySelector('.card').addEventListener("click",function() {
        clicks += 1;
        if (clicks === 1) {
            let sec = 0;
            function time ( val ) { return val > 9 ? val : "0" + val; }
            timer = setInterval( function(){
                document.querySelector('.seconds').innerHTML = time(++sec % 60);
                document.querySelector('.minutes').innerHTML = time(parseInt(sec / 60, 10));
                document.querySelector('.popup-seconds').innerHTML = time(++sec % 60);
                document.querySelector('.popup-minutes').innerHTML = time(parseInt(sec / 60, 10));
            }, 1000);
        }
    })
}

// counting the moves
function counterMoves() {
    let list = document.querySelector(".stars");
    document.querySelector('.moves').textContent = moves;
    if (moves > 0 && moves <= 16) {
        starRating = starRating;
    } else if (moves > 16 && moves <= 24) {
        list.innerHTML= '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>'
        starRating = "2";
    } else if (moves > 24) {
        list.innerHTML= '<li><i class="fa fa-star"></i></li>'
        starRating = "1";
    }
}

// restarting the game
function restartGame() {
    document.querySelector('#restart').addEventListener("click",function() {
        location.reload()
    });
}

// call functions
shuffleCard();
clickCard();
counterTime()
restartGame()