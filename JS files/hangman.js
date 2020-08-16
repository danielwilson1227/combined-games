let form = document.getElementById('formID'),
	image = document.getElementById('hanger'),
	h3 = document.querySelector('.h3'),
	lastInput = document.querySelector('.search'),
	win = document.querySelector('.win'),
	instructionsBTN = document.getElementById('instructions-btn'),
	instructionsText = document.getElementById('instructions-text'),
	instructContainer = document.getElementById('instruct-container'),
	span = document.getElementsByClassName('close')[0],
	winnerImage = document.getElementById('winnerImage'),
	loserImage = document.getElementById('loserImage'),
	wordPlace = document.getElementById('wordPlacer'),
	Ptags = document.getElementsByTagName('p'),
	errorMessage = document.querySelector('#error');
var right = new Audio();
right.src = 'sounds/rightAnswer.mp3';
var wrong = new Audio();
wrong.src = 'sounds/wrongAnswer.mp3';
var winner = new Audio();
winner.src = 'sounds/win.mp3';
var lose = new Audio();
lose.src = 'sounds/lose.mp3';

instructionsBTN.addEventListener('click', loadInstructions);

let correctLetters = [];

function loadInstructions (){
	instructContainer.style.display = 'block';
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'text.txt', true);
	xhr.onload = function (){
		instructionsText.innerText = this.responseText;
	};
	xhr.send();
}

span.onclick = function (){
	instructContainer.style.display = 'none';
};

window.onclick = function (event){
	if (event.target == instructContainer) {
		instructContainer.style.display = 'none';
	}
};

form.addEventListener('submit', function (e){
	e.preventDefault();
});

let words = [
	'avatar',
	'rocky',
	'jaws',
	'shrek',
	'hook',
	'batman',
	'frozen',
	'wanted',
	'juno',
	'signs',
	'holes',
	'hitch',
	'grease',
	'scream',
	'mulan',
	'babe',
	'hulk',
	'tarzan',
	'frida',
	'bambi',
	'alien',
	'joker',
	'fargo',
	'moana',
	'shazam',
	'venom',
	'logan',
	'casper',
	'salt',
	'blade',
	'mowgli',
	'bolt'
];

let rand = Math.floor(Math.random() * 32) + 1;
let word = words[rand].toUpperCase();

function search (letter){
	if (event.key === 'Enter') {
		var input = letter.value.toUpperCase();
		lastInput.value = '';
	}
	checker(input);
}

function createP (word){
	for (let i = 0; i <= word.length - 1; i++) {
		var tag = document.createElement('p');
		var text = document.createTextNode(word[i]);
		tag.appendChild(text);
		var element = document.getElementById('div1');
		element.appendChild(tag);
	}
}

createP(word);

function addAttribute (word){
	for (let i = 0; i <= word.length - 1; i++) {
		Ptags[i].setAttribute('class', [ i ]);
		Ptags[i].setAttribute('style', 'background-color: palevioletred;');
	}
}
addAttribute(word);

function checker (input){
	if (input.length > 1) {
		error('TOO MANY LETTERS');
	}
	else if (/[a-z]/gi.test(input) === false) {
		error("THAT'S NOT A LETTER");
		return '';
	}
	else if (h3.innerText.includes(input) || correctLetters.includes(input)) {
		error('YOU ALREADY CHOSE THAT ONE');
		return '';
	}
	else if (!word.includes(input)) {
		wrong.play();
		wrongAnswer(input);
	}
	else if (word.includes(input)) {
		let arr = [];
		right.play();
		for (let i = 0; i <= word.length; i++) {
			if (word[i] == input) {
				arr.push(i);
			}
		}
		for (let indx of arr) {
			Ptags[indx].setAttribute('style', 'color: black;');
			correctLetters.push(Ptags[indx].innerText);
		}
		winChecker();
	}
}

function error (errorMsg){
	errorMessage.innerText = errorMsg;
	errorMessage.style.display = 'inline-block';
	setTimeout(clearError, 2000);
}

function clearError (){
	errorMessage.style.display = 'none';
}

function wrongAnswer (input){
	h3.innerText += `${input.toUpperCase()} -`;
	if (h3.innerText.match(/\w/gi).length === 7) {
		win.innerText = 'Last try!';
		win.style.display = 'block';
	}
	if (h3.innerText.match(/\w/gi).length === 8) {
		loseGame();
	}
	hang();
}

function loseGame (){
	clearInterval(myTimer);
	lose.play();
	if (window.innerWidth > 760) {
		loserImage.style.display = 'block';
	}

	win.style.color = 'royalblue';
	win.style.display = 'block';
	win.innerText = 'YOU LOST! TRY AGAIN!';
	showAnswer(word);
	image.src = `/images/8.JPG`;
	refresher();
	lastInput.disabled = 'true';
	loadGameBTN();
}

function loadGameBTN (){
	instructionsBTN.innerHTML = '<a class="switcher" href="trivia.html">Click Here to Play Trivia</a>';
	instructionsBTN.style.height = '3rem';
	instructionsBTN.style.padding = 0;
	instructionsBTN.removeEventListener('click', loadInstructions);

		window.innerWidth < 500 ? (instructionsBTN.style.height = '4rem') :
		(instructionsBTN.style.height = '3rem');
}

function winChecker (){
	let count = 0;
	for (let i = 0; i <= word.length - 1; i++) {
		if (Ptags[i].style.color === 'black') {
			count += 1;
		}
	}
	if (count === word.length) {
		clearInterval(myTimer);
		win.style.color = 'green';
		win.innerText = 'YOU WIN!';


			window.innerWidth > 760 ? (winnerImage.style.display = 'block') :
			(win.style.display = 'block');
		winner.play();
		refresher();
		lastInput.disabled = 'true';
		loadGameBTN();
	}
}

function hang (){
	let counter = h3.innerText.match(/\w/gi).length;
	for (let i = 0; i < counter; i++) {
		image.src = `/images/${i + 1}.JPG`;
	}
}

function refresher (){
	refresh.style.display = 'block';
}

function showAnswer (word){
	for (let i = 0; i <= word.length - 1; i++) {
		Ptags[i].setAttribute('style', 'color: black;');
	}
}

let startingMinutes = 2;
let time = startingMinutes * 60;

let countdownEl = document.getElementById('countdown');
myTimer = setInterval(updateCountdown, 1000);
function updateCountdown (){
	let minutes = Math.floor(time / 60);
	let seconds = time % 60;
	seconds =

			seconds < 10 ? '0' + seconds :
			seconds;
	countdownEl.innerHTML = `${minutes}:${seconds}`;


		time !== 0 ? time-- :
		time;
	if (countdownEl.innerHTML === '0:00') {
		loseGame();
	}
}
