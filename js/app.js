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

// shuffle the list of cards
function shuffleCard() {
    let cardList = shuffle(cards);
    let cardDeck = document.querySelector('.deck');
    cardDeck.innerHTML = '';
    /*
    cardList.forEach(function(card) {
      let deckLi = document.createElement('li');
      deckLi.className = 'card';
      deckLi.innerHTML = '<i class="fa ' + card + '"></i>';
      cardDeck.appendChild(deckLi);
    })
    */
   for (let i = 0; i < cardList.length; i++) {
    let deckLi = document.createElement('li');
    deckLi.className = 'card';
    deckLi.setAttribute("id", i);
    deckLi.innerHTML = '<i class="fa ' + cardList[i] + '"></i>';
    cardDeck.appendChild(deckLi);
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


function clickCard() {
    let cardDeck = document.querySelector('.deck');
    // https://stackoverflow.com/questions/17636043/cannot-add-click-events-to-list-items
    cardDeck.addEventListener("click",function(e) {
        if(e.target && e.target.nodeName == "LI") {
            e.target.className = 'card open show';
        }
    });
}

// call functions
shuffleCard();
clickCard();