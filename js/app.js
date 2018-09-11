/* For completing this challenge project I used the following
 * resources.
 * 1. The webinar youtube video from Udacity content 
 * expert Mike Wales.
 * https://www.youtube.com/watch?time_continue=3680&v=_rUH-sEs68Y
 * 2. The following blogpost series from FEND student
 * leader Matthew Cranford.
 * https://matthewcranford.com/memory-game-walkthrough-part-1-setup/
 * I thank both of you for your help!
 */ 

/*
 * Create a list that holds all of your cards
 */
var cards = document.querySelectorAll('.card');
console.log(cards);

/* Let's define a variable for counting moves.
 * We are gonna count the flipping of two cards as one move.
 */
let moves = 0;

// Function to count the moves
function addMove() {
	moves++;
	const movesText = document.querySelector('.moves');
	movesText.innerHTML = moves;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

// The deck variable holds all the card elements
let deck = document.querySelector('.deck');

// The array which holds the flipped cards																																																											
let toggledCards = [];

// Setting up the event listener
deck.addEventListener('click', event => {
	const clickTarget = event.target;
	if (isClickValid(clickTarget
		)) {
		if (clockOff) {
			startClock();
			clockOff = false;
		}
		toggleCard(clickTarget);
		addToggleCard(clickTarget);
		if (toggledCards.length === 2) {
			checkForMatch();
			addMove();
			checkScore();
		}
		if (cardsMatched === 8) {
			stopClock();
			clockOff = true;
		}
	}
});

// Function that validates the user clicks and other conditions
function isClickValid(clickTarget) {
	return (
		clickTarget.classList.contains('card') && 
		toggledCards.length < 2 &&
		!toggledCards.includes(clickTarget) &&
		!clickTarget.classList.contains('match')
		);
}

// Function that flips the cards
function toggleCard(card) {
	card.classList.toggle('open');
	card.classList.toggle('show');
}


// Function that adds the flipped cards into an array
function addToggleCard(clickTarget) {
	toggledCards.push(clickTarget);
	console.log(toggledCards);
}

let cardsMatched = 0;
const TOTAL_PAIRS = 8;

// Function that checks if the flipped cards are a match
function checkForMatch() {
	if (
		toggledCards[0].firstElementChild.className === 
		toggledCards[1].firstElementChild.className
		) {
		toggledCards[0].classList.toggle('match');
		toggledCards[1].classList.toggle('match');
		toggledCards = [];
		cardsMatched++;
		if (cardsMatched === TOTAL_PAIRS) {
			gameOver();
			cardsMatched = 0;
		}		
		console.log(cardsMatched);						
	} else {
		setTimeout(() => {
			toggleCard(toggledCards[0]);
			toggleCard(toggledCards[1]);
			toggledCards = [];
		}, 1000);
	}
}	


// Function that shuffles the cards 
function shuffleDeck() {
	const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
	const shuffledCards = shuffle(cardsToShuffle);
	for (card of shuffledCards) {
		deck.appendChild(card);
	}
}
shuffleDeck();


// Function that checks the score of the player
function checkScore() {
	if (moves === 6 || moves === 12
		) { removeStar();

	}
}

function removeStar() {
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		if (star.style.display !== 'none') {
			star.style.display = 'none';
			break;
		}
	}
}

function startClock() {
		clockId = setInterval(() => {
		time++;
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		const clock = document.querySelector('.clock');
		if (seconds < 10) {
		clock.innerHTML = `${minutes}:0${seconds}`;			
		} else {
			clock.innerHTML = `${minutes}:${seconds}`;
		}
	}, 1000);
}

function displayTime() {
	const clock = document.querySelector('.clock');
	console.log(clock);
	clock.innerHTML = time;
}

let clockId;
let clockOff = true;
let time = 0;
let minutes = 0;
let seconds = 0;

function stopClock() {
	clearInterval(clockId);
}

function getStars() {
	stars = document.querySelectorAll('.stars li');
	starCount = 0;
	for (star of stars) {
		if (star.style.display !== 'none') {
			starCount++;
		}
	}
	console.log(starCount);
	return starCount;
}

// Function to hide and show the modal
function toggleModal() {
	const modal = document.querySelector('.modal_background');
	modal.classList.toggle('hide');
}

function writeModalStats() {
	const timeStat = document.querySelector('.modal_time');
	const clockTime = document.querySelector('.clock').innerHTML;
	const movesStat = document.querySelector('.modal_moves');
	const starsStat = document.querySelector('.modal_stars');
	const stars = getStars();

	timeStat.innerHTML = `Time = ${clockTime}`;
	movesStat.innerHTML = `Moves = ${moves}`;
	starsStat.innerHTML = `Stars = ${stars}`;
}


document.querySelector('.modal_cancel').addEventListener('click', () => {
	toggleModal();
})


document.querySelector('.modal_replay').addEventListener('click', replayGame);


function resetCards() {
	const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
	const shuffledCards = shuffle(cardsToShuffle);
	for (card of shuffledCards) {
		card.classList.remove('open');
		card.classList.remove('show');
		card.classList.remove('match');
		deck.appendChild(card);
	}

}

function resetGame() {
	resetClockAndTime();
	resetMoves();
	resetStars();
	resetCards();
	cardsMatched === 0;
}

function resetClockAndTime() {
	stopClock();
	clockOff = true;
	time = 0;
	displayTime();
}

function resetMoves() {
	moves = 0;
	document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
	stars = 0;
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		star.style.display = 'inline';
	}
}

function replayGame() {
	resetGame();
	toggleModal();
}

document.querySelector('.restart').addEventListener('click', resetGame);


function gameOver() {
	stopClock();
	writeModalStats();
	toggleModal();
}
