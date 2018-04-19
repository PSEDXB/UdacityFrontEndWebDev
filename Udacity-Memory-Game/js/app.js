
// TODO: Responsiveness, creativity :)

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Makes number of images equal to number of cards and shuffles the deck.
let imgClass = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-bolt", "fa-cube"];
imgClass = imgClass.concat(imgClass);
shuffle(imgClass);

// Adds image class names to cards.
let cardFaces = [...document.querySelectorAll('.card > .fa')];
for (i = 0; i < cardFaces.length; i++) {
	let shuffledClass = imgClass[i];
	let face = cardFaces[i];
	face.classList.add(shuffledClass);
}
 
// Provides functionality for reload buttons.
const reloadButton = document.querySelectorAll('.fa-repeat');
for (button of reloadButton) {
	button.addEventListener('click', function() {
		location.reload();
	})
}

// Provides timer functionality.
const timer = document.querySelector('.timer');
let time = 0;
function insertTimer() {
	time = time + 1;
	timer.innerHTML = `Time: ${time} seconds`;
}
insertTimer = setInterval(insertTimer, 1000);

// Increments moves.
const movesLoc = document.querySelector('.moves');
function ticker() {
	movesLoc.innerHTML = parseInt(movesLoc.innerHTML, 10) + 1;
}

// Decrements stars.
let stars = document.querySelectorAll('.fa-star');
function starDec() {
	if (movesLoc.innerHTML == 16) {
		stars[2].remove();
	} else if (movesLoc.innerHTML == 30) {
		stars[1].remove();
	} else if (movesLoc.innerHTML == 40) {
		stars[0].remove();
	} else {
		return stars;
	}
}

//Provides victory modal, and clears interval.
const modal = document.querySelector('.modal');
function victory() {
	modal.classList.toggle("show-modal");
	clearInterval(insertTimer);
}

// To be called within victoryText
function toggleVisibility(el) {
	el.style.visibility = "visible";
}

// Provides content for victory modal.
function victoryText() {
	const modalText = document.querySelector('.modal-content h1');
	const modalList= document.querySelector('.modal-content ul');
	const playAgain = document.querySelector('.repeat-text');
	stars = document.querySelectorAll('.fa-star');

	for (star of stars) {
		modalList.appendChild(star);
}
	modalText.innerHTML = "Congrats, you win!\n \n Time: " + time + "s";
	setTimeout(toggleVisibility, 1500, playAgain);
}

// Determines whether cards match, invokes ticker function above, and provides condition for victory.
function compareCards(card1, card2) {
	const matchedImages = document.getElementsByClassName("match");
	ticker();
	starDec();
	if (card1.innerHTML === card2.innerHTML) {
		card1.classList.add("match");
		card2.classList.add("match");
		card1.classList.remove("open");
		card2.classList.remove("open");

		if (matchedImages[15] !== undefined) {
			victory();
			victoryText();
		}

	} else {
		card1.classList.remove("open", "show");
		card2.classList.remove("open", "show");
	}
}

// Adds click event listener and calls compareCards.
const openImages = document.getElementsByClassName("open");
const cards = document.querySelectorAll('.card');
for (card of cards) { 
	card.addEventListener('click', function open(evt) {
		if (openImages[1] === undefined) {
			evt.target.classList.add("open", "show"); 
			if (openImages[1] !== undefined) {
				setTimeout(compareCards, 500, openImages[0], openImages[1]);
			}
		} 
	})
};