// HTML elements
// const gameBoard = document.getElementById('game-board');
const fullCard = document.querySelectorAll('.card');
const startButton = document.getElementById('start-button');
const cardFront = document.querySelectorAll('.card-front');
const cardBack = document.querySelectorAll('.card-back');

class Card {
    constructor(path, alt, number) {
        this.path = path;
        this.alt = alt;
        this.number = number;
    }
};

const cards = [ 
    new Card(`./sprites/Sprite-0001-green-export.png`, 'green goomb', 1),
    new Card(`./sprites/Sprite-0001-green-export.png`, 'green goomb', 1),

    new Card(`./sprites/Sprite-0001-lightorange-export.png`, 'light orange goomb', 2),
    new Card(`./sprites/Sprite-0001-lightorange-export.png`, 'light orange goomb', 2),

    new Card(`./sprites/Sprite-0001-lightpink-export.png`, 'light pink goomb', 3),
    new Card(`./sprites/Sprite-0001-lightpink-export.png`, 'light pink goomb', 3), 

    new Card(`./sprites/Sprite-0001-purple-export.png`, `purple goomb` ,4),
    new Card(`./sprites/Sprite-0001-purple-export.png`, `purple goomb`, 4),

    new Card(`./sprites/Sprite-0001-red-export.png`, `red goomb`, 5),
    new Card(`./sprites/Sprite-0001-red-export.png`, `red goomb`, 5),

    new Card(`./sprites/Sprite-0001-lightblue-export.png`,`lightblue goomb`, 6),
    new Card(`./sprites/Sprite-0001-lightblue-export.png`,`lightblue goomb`, 6)
];

    // shuffle cards
function shuffleCards(cards){
    let j, x, i;
    for (i = cards.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = cards[i];
        cards[i] = cards[j];
        cards[j] = x;
    }
    return cards;
};
// console.log(shuffledCards);

// idk how im gonna lay this out tbh
//but for now heres the start butotn
startButton.addEventListener('click', () => {
    console.log('game started!');
    shuffleCards(cards);
    // console.log(cards);

    // card reveal
    startCardReveal();
});

//array to hold the value that we will be using to check if matched
let isMatched = [];
//stores index so we can access the card number in other functions THIS IS CHANGED NOW 
let card1;
let card2;

//lets us know if its first card or second card that is being clicked
let cardRevealClickIndex = 0;

// reveal card when you click on the specific card
//event listener applied forEach() to all cards when game is started
function startCardReveal(){
    cardBack.forEach(function(cardBack, i){
            // target the front side of the card that was clicked and display
            const cardFront = cardBack.previousElementSibling;
            // set card stylings (hide back, display front). Then apply src & alt to the front
            cardFront.src = cards[i].path;
            cardFront.alt = cards[i].alt;

        cardBack.addEventListener('click', (e) => {
            // target the card that was clicked and hide
            e.currentTarget.style.display = 'none';
            
            // set card stylings (hide back, display front). Then apply src & alt to the front
            cardFront.style.display = 'block';
            
            // this writes the index number to either cardIndex1 or cardIndex2 so that we can target the specific card in another function
            if(cardRevealClickIndex === 0){
                card1 = cardFront;
                cardRevealClickIndex++;
                isMatched.push(card1);
            } else {
                card2 = cardFront;
                // cardRevealClickIndex = 0;
                isMatched.push(card2);
            }
            checkIfReadyForMatch(card1, card2);
        });
    });
};

// lets check and see if there is 2 items in the array to match
// if there is we will call the function to see if cards are a pair
function checkIfReadyForMatch(card1, card2){
    if(isMatched.length === 2){
        confirmMatch(card1, card2);
    };
};

// check if the first card matches the second card
// if not reset styles && erase array contents
function confirmMatch(card1, card2){
    if(card1.src !== card2.src){
        // set stylings for card1
        card1.style.display = 'none';
        card1.nextElementSibling.style.display = 'block';
        // set stylings for card2
        card2.style.display = 'none';
        card2.nextElementSibling.style.display = 'block';
    } else {
        isMatched.length = 0;
        // console.log(isMatched);
    };
    cardRevealClickIndex = 0; 
    isMatched = [];
};
