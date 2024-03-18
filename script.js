


// HTML elements
// const gameBoard = document.getElementById('game-board');
const fullCard = document.querySelectorAll('.card');
const startButton = document.getElementById('start-button');
const cardFront = document.querySelectorAll('.card-front');
const cardBack = document.querySelectorAll('.card-back');

// console.log(cardFront);


class Card {
    constructor(path, alt, number) {
        this.path = path;
        this.alt = alt;
        this.number = number;
    }
};

const cards = [ 
    new Card(`./sprites/Sprite-0001-green-export.png`, 'green goomb', 0),
    new Card(`./sprites/Sprite-0001-green-export.png`, 'green goomb', 0),

    new Card(`./sprites/Sprite-0001-lightorange-export.png`, 'light orange goomb', 1),
    new Card(`./sprites/Sprite-0001-lightorange-export.png`, 'light orange goomb', 1),

    new Card(`./sprites/Sprite-0001-lightpink-export.png`, 'light pink goomb', 2),
    new Card(`./sprites/Sprite-0001-lightpink-export.png`, 'light pink goomb', 2), 

    new Card(`./sprites/Sprite-0001-purple-export.png`, `purple goomb` ,3),
    new Card(`./sprites/Sprite-0001-purple-export.png`, `purple goomb`, 3),

    new Card(`./sprites/Sprite-0001-red-export.png`, `red goomb`, 4),
    new Card(`./sprites/Sprite-0001-red-export.png`, `red goomb`, 4),

    new Card(`./sprites/Sprite-0001-lightblue-export.png`,`lightblue goomb`, 5),
    new Card(`./sprites/Sprite-0001-lightblue-export.png`,`lightblue goomb`, 5)
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
// const shuffledCards = shuffleCards(cards);
// console.log(shuffledCards);

    // init game
startButton.addEventListener('click', () => {
    console.log('game started!');
    shuffleCards(cards);
    // console.log(cards);
    // card reveal
    startCardReveal();
});


//array to hold the value that we will be using to check if matched
let isMatched = [];
//stores index so we can access the card number in other functions
let cardIndex1;
let cardIndex2;

//lets us know if its first card or second card that is being clicked
let cardRevealClickIndex = 0;

// reveal card when you click on the specific card
//event listener applied forEach() to all cards when game is started
function startCardReveal(){
    cardBack.forEach(function(cardBack, i){
        cardBack.addEventListener('click', (e) => {
            // target the card that was clicked and hide
            e.currentTarget.style.display = 'none';
            
            // target the front side of the card that was clicked and display
            const cardFront = e.currentTarget.previousElementSibling;
            
            // set card stylings (hide back, display front). Then apply src & alt to the front
            cardFront.style.display = 'block';
            updateSrc = cardFront.src = cards[i].path;
            cardFront.alt = cards[i].alt;
            
            // push the updated source into an array so later we can check if its a match
            isMatched.push(updateSrc);
            
            // this writes the index number to either cardIndex1 or cardIndex2 so that we can target the specific card in another function
            if(cardRevealClickIndex === 0){
                cardIndex1 = cards[i].number;
                console.log('first card: ' + cardRevealClickIndex)
                cardRevealClickIndex++;
            } else {
                cardIndex2 = cards[i].number;
                console.log('second card: ' + cardRevealClickIndex)
                // cardRevealClickIndex = 0;
            }
            checkIfReadyForMatch(cardIndex1, cardIndex2);
        });
    });
};

// lets check and see if there is 2 items in the array to match
// if there is we will call the function to see if cards are a pair
function checkIfReadyForMatch(cardIndex1, cardIndex2){
    if(isMatched.length === 2){
        confirmMatch(cardIndex1, cardIndex2);
    };
};

// check if the first card matches the second card
// if not reset styles && erase array contents
function confirmMatch(cardIndex1, cardIndex2){
    console.log('confirm match:', cardIndex1, 'and', cardIndex2);
    if(cardIndex1 !== cardIndex2){

        // set stylings for card1 
        console.log(cardBack[cardIndex1])
        console.log(cardBack[cardIndex1].src)
        cardFront[cardIndex1].style.display = 'none';
        cardBack[cardIndex1].style.display = 'block';
        console.log(cardBack[cardIndex1].style.display);

        // set stylings for card2
        cardFront[cardIndex2].style.display = 'none';
        cardBack[cardIndex2].style.display = 'block';
    } else {
        console.log(cards[cardIndex1]);
        isMatched.length = 0;
        console.log(isMatched);
    };
    cardRevealClickIndex = 0; 
    isMatched = [];
};
