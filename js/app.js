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
        deckLi.setAttribute("class", "card");
        deckLi.setAttribute("id", i+1);
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

// reset openCard.length to 0
function removeOpenCards() {
    openCard = [];
    openCardId = [];
  }

function clickCard() {
    let cardDeck = document.querySelector('.deck');
    // https://stackoverflow.com/questions/17636043/cannot-add-click-events-to-list-items
    cardDeck.addEventListener("click",function(e) {
        
        if(e.target && e.target.nodeName == "LI") {
            e.target.className = 'card open show';
        }

        openCard.push(e.target.innerHTML);
        openCardId.push(e.target.id);
        console.log(openCard[openCard.length-1]);
        
        if (openCard.length === 2) {
            if (openCard[0] === openCard[1]) {
            // console.log(openCard[0]+"="+openCard[1]);
            document.getElementById(openCardId[0]).className = 'card match';
            document.getElementById(openCardId[1]).className = 'card match';
            // openCard[0][0].classList.add("match");
            // openCard[1][0].classList.add("match");
            // $(openCard[0]).off('click');
            // $(openCard[1]).off('click');
            matchPair += 1;
            // moves++;
            removeOpenCards();
            allMatch();
            } 
            else {
                document.getElementById(openCardId[0]).className = 'card';
                document.getElementById(openCardId[1]).className = 'card';
                removeOpenCards();
            // e.target.className = 'card';
            // openCard[0][0].classList.add("wrong");
            // openCard[1][0].classList.add("wrong");
            // set timeout to remove "show" and "open" class
            // setTimeout(removeClasses, 1100);
            // reset openCard.length to 0
            // setTimeout(removeOpenCards, 1100);
            // moves++;
            }
          }
    });
}

function allMatch() {
  
    if (matchPair === 8) {
        
        console.log("Cool!");
        let winner = document.getElementById("myPopup");
        winner.style.display = "block";

        document.querySelector('#play-again-btn').addEventListener("click",function() {
            location.reload()
        });

      // var modal = document.getElementById('win-popup');
      // var span = document.getElementsByClassName("close")[0];
  
      // $("#total-moves").text(moves);
      // $("#total-stars").text(starRating);
  
      // modal.style.display = "block";
  
    // when the user clicks on <span> (x), close the modal
      // span.onclick = function() {
        //   modal.style.display = "none";
      // }
  
     // $("#play-again-btn").on("click", function() {
        //  location.reload()
     // });
  
     // clearInterval(timer);  
  
   }
  }

// call functions
shuffleCard();
clickCard();