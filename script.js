// HTML elements
// const gameBoard = document.getElementById('game-board');
// const fullCard = document.querySelectorAll('.card');
const startButton = document.getElementById('start-button');
const cardFront = document.querySelectorAll('.card-front');
const cardBack = document.querySelectorAll('.card-back');
const restartGameButton = document.getElementById('restartGame');
const endGamePopUp = document.getElementById('popUp');
const music = document.getElementById("backgroundAudio");

// count the amount of matches
// let matches = 0;

// count the number of turns the user has used
let turns = 0;
//array to hold the value that we will be using to check if matched
let checkIfMatched = [];
// array to count how many successful matches
let successfulMatch = [];
// will hold the value of the cardFront for the selected cards
let card1;
let card2;
// a card lock so they cards dont reveal when 2 are being matched
let cardLock = false;
//lets us know if its first card or second card that is being clicked
let cardRevealClickIndex = 0;

//create card object
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

// call the start button
start();
//start button
function start(){
    startButton.addEventListener('click', () => {
        console.log('game started!');
        musicTime();
        shuffleCards(cards);
        // card reveal => check if ready for match => check if match
        startCardReveal();
    });
};

// reveal card when you click on the specific card
function startCardReveal(){
    cardBack.forEach(function(cardBack, i){
        // target the front side of the card that was clicked and display
        const cardFront = cardBack.previousElementSibling;
        // apply src & alt to the card front
        cardFront.src = cards[i].path;
        cardFront.alt = cards[i].alt;
        cardBack.addEventListener('click', (e) => {
        if(cardLock){
            return;
        }
        // target the card that was clicked and hide it
        e.currentTarget.style.display = 'none';
        // set card stylings (display front).
        cardFront.style.display = 'block';
        // keeps track if its card1 or card2 for matching
        if(cardRevealClickIndex === 0){
            card1 = cardFront;
            cardRevealClickIndex++;
            checkIfMatched.push(card1);
        } else {
            card2 = cardFront;
            checkIfMatched.push(card2);
            cardLock = true;
        }
        //confirms 2 cards have been clicked
        checkIfReadyForMatch(card1, card2);
        });
    });
};

// lets check and see if there is 2 items in the array to match
// if there is we will call the function to see if cards are a pair
function checkIfReadyForMatch(card1, card2){
    if(checkIfMatched.length === 2){
        confirmMatch(card1, card2);
    };
};

// check if the first card matches the second card
function confirmMatch(card1, card2){
    turns++;
    if(card1.src !== card2.src){
        setTimeout(function(){
        // set stylings for card1
            card1.style.display = 'none';
            card1.nextElementSibling.style.display = 'block';
            // set stylings for card2
            card2.style.display = 'none';
            card2.nextElementSibling.style.display = 'block';
            updateScore();
            cardLock = false;
        }, 750);
    } else {
        successfulMatch.push('match');
        updateScore();
        // matches++;
        cardLock = false;
    };
    // reset index to check if 2 cards have been clicked
    cardRevealClickIndex = 0; 
    // reset the array holding the cards
    checkIfMatched = [];
    // if the array has all matched cards call the next function
    if(successfulMatch.length === 6){
        allMatched()
    };
};

function updateScore() {
    const correctMatchesText = document.querySelector('#correct-matches');
    const turnsText = document.querySelector('#turns');

    correctMatchesText.textContent = `Matches: ${successfulMatch.length}`;
    turnsText.textContent = `Turns: ${turns}`;
};

function allMatched(){
    console.log('all matched!');
        // stop music
    let music = document.getElementById("backgroundAudio");
    music.volume = 0.05;
    endGame();
};

function endGame(){
    showPopup();
    // lower music volume
    let music = document.getElementById("backgroundAudio");
    music.volume = 0.05;
};

function showPopup() {
    const endGamePopUp = document.getElementById('popUp');
    endGamePopUp.style.display = 'block';
};

function gameReset(){
    //empty arrays and reset indices
    successfulMatch = [];
    checkIfMatched = [];
    cardRevealClickIndex = 0;
    // reset html turns && matches
    turns = 0;
    updateScore();

    //reset html
    cardBack.forEach( el => {
        el.style.display = 'block';
    });
    cardFront.forEach(el => {
        el.style.display = 'none';
    });

    endGamePopUp.style.display = 'none';
};

restartGameButton.addEventListener('click', () => {
    gameReset();
    start();
    musicTime();
});

//init music
function musicTime(){
        let music = document.getElementById("backgroundAudio");
        music.play();
        music.volume = 0.3
    if(successfulMatch.length === 6){
        setInterval(function(){
            music.volume--
        },100)
        music.volume = 0.25;
    };
};