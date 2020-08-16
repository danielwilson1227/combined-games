let easyBTN = document.querySelector('#easyBTN'),
	mediumBTN = document.querySelector('#mediumBTN'),
	hardBTN = document.querySelector('#hardBTN'),
	fullCont = document.querySelector('#full-container'),
	totalScoreDisp = document.querySelector('#total-score'),
	totalScoreDisp2 = document.querySelector('#total-Score'),
	triviaContainer = document.querySelector('.trivia-container'),
	resultsContainer = document.querySelector('#results-container'),
	questionsContainer = document.querySelector('#questions-container'),
	question = document.querySelector('#question'),
	answerChoice = document.querySelectorAll('.answerChoice'),
	progressContainer = document.querySelector('.progress-container'),
	questNum = document.querySelector('#questNum'),
	nextBTN = document.querySelector('#nextBTN'),
	triviaContent = document.querySelector('.trivia-content'),
	userChoice1 = document.querySelector('#userChoice1'),
	userChoice2 = document.querySelector('#userChoice2'),
	userChoice3 = document.querySelector('#userChoice3'),
	userChoice4 = document.querySelector('#userChoice4'),
	resultsText = document.querySelectorAll('.resultsText'),
	chooseDiffText = document.querySelector('#chooseDiffText'),
	difficultyBTNS = document.querySelector('#difficultyBTNS'),
	refreshBTN = document.querySelector('#refresh'),
	instructionsBTN = document.querySelector('#instructionsBTN'),
	instructionsContainer = document.querySelector('#instructions-container'),
	instructText = document.querySelector('#instructions-text'),
	span = document.getElementsByClassName('close')[0],
	pointDisplay = document.querySelector('#point-Display'),
	correctDisplay = document.querySelector('#correct-Display');
questionCat = '';
counter = 0;
totalScore = 0;
pointCount = 0;
correctCount = 0;
incorrectCounter = 0;
jokeText = '';
totalScoreDisp.innerText = `Total Score: ${totalScore} Points`;

async function getData (userChoice, userChoiceBTN){
	nextBTN.style.visibility = 'hidden';
	totalScoreDisp.style.visibility = 'hidden';
	totalScoreDisp2.innerText = `Total Score: ${totalScore} Points`;
	correctDisplay.innerText = `Answered Correctly: ${correctCount}`;
	nextBTN.innerHTML = `NEXT   <i class="fas fa-arrow-right"></i>`;
	let res;
	let data;
	if (questionCat == 'easy') {
		res = await fetch('JSON files/questions_easy.JSON');
		//fetch returns a promise, the 1rst promise returned we need to call res.json on it
		data = await res.json();
	}
	else if (questionCat == 'medium') {
		res = await fetch('JSON files/questions_medium.JSON');
		//fetch returns a promise, the 1rst promise returned we need to call res.json on it
		data = await res.json();
	}
	else if (questionCat == 'hard') {
		res = await fetch('JSON files/questions_hard.JSON');
		//fetch returns a promise, the 1rst promise returned we need to call res.json on it
		data = await res.json();
	}
	questNum.innerText = `Question #${data[counter].questionNum}`;
	question.innerText = `${data[counter].question}`;
	answerChoice[0].innerText = `${data[counter].choice1}`;
	answerChoice[1].innerText = `${data[counter].choice2}`;
	answerChoice[2].innerText = `${data[counter].choice3}`;
	answerChoice[3].innerText = `${data[counter].choice4}`;
	enableBTNS();
	let checkIcon = document.createElement('i');
	checkIcon.className = 'fas fa-check';
	let wrongIcon = document.createElement('i');
	wrongIcon.className = 'fas fa-times';
	if (userChoice) {
		if (userChoice === `${data[counter].answer}`) {
			document.getElementById(userChoiceBTN).style.backgroundColor = '#0c725a';
			correctCount++;
			correctDisplay.innerText = `Answered Correctly: ${correctCount}`;
			document.getElementById(userChoiceBTN).innerHTML = `<i class="fas fa-check"></i>   ${userChoice}`;
			disableBTNS();
			nextBTN.style.visibility = 'visible';
			if (questionCat == 'easy') {
				pointCount += 5;
				totalScore += 5;
			}
			else if (questionCat == 'medium') {
				pointCount += 10;
				totalScore += 10;
			}
			else if (questionCat == 'hard') {
				pointCount += 15;
				totalScore += 15;
			}

			pointDisplay.innerText = `Current Points: ${pointCount}`;
			totalScoreDisp2.innerText = `Total Score: ${totalScore} Points`;
		}
		else {
			for (let choice of answerChoice) {
				if (choice.innerText === `${data[counter].answer}`) {
					document.getElementById(choice.id).style.backgroundColor = '#0c725a';
					document.getElementById(choice.id).innerHTML = `<i class="fas fa-check"></i>   ${choice.innerText}`;
					document.getElementById(userChoiceBTN).style.backgroundColor = '#850707';
					document.getElementById(userChoiceBTN).innerHTML = `<i class="fas fa-times"></i>   ${userChoice}`;
					disableBTNS();
					nextBTN.style.visibility = 'visible';
					incorrectCounter += 1;
				}
			}
		}
	}
}

function disableBTNS (){
	for (let choice of answerChoice) {
		choice.disabled = true;
	}
}

function resetBTN (){
	for (let choice of answerChoice) {
		choice.style.backgroundColor = 'white';
	}
}

function enableBTNS (){
	for (let choice of answerChoice) {
		choice.disabled = false;
	}
}

easyBTN.addEventListener('click', function (){
	questionCat = 'easy';
	diffClicked();
	easyBTN.style.visibility = 'hidden';
	easyBTN.classList.remove('hover-On');
	finishedChecker();
	getData();
});

mediumBTN.addEventListener('click', function (){
	questionCat = 'medium';
	diffClicked();
	mediumBTN.style.visibility = 'hidden';
	mediumBTN.classList.remove('hover-On');
	finishedChecker();
	getData();
});

hardBTN.addEventListener('click', function (){
	questionCat = 'hard';
	diffClicked();
	hardBTN.style.visibility = 'hidden';
	hardBTN.classList.remove('hover-On');
	finishedChecker();
	getData();
});

function diffClicked (){
	correctCount = 0;
	pointDisplay.innerText = `Current Points: ${pointCount}`;
	questionsContainer.style.display = 'block';
	resetBTN();
}

function finishedChecker (){
	if (
		easyBTN.classList.contains('hover-On') === false &&
		mediumBTN.classList.contains('hover-On') === false &&
		hardBTN.classList.contains('hover-On') === false
	) {
		difficultyBTNS.style.display = 'none';
		chooseDiffText.innerText = 'Thanks For Playing!';
		refreshBTN.style.display = 'block';
		instructionsBTN.innerHTML = '<a class="switcher" href="index.html">Click Here to Play Hangman</a>';
		instructionsBTN.style.height = '4rem';
		instructionsBTN.removeEventListener('click', showInstructions);
	}
}
function loadOtherGame (){}
nextBTN.addEventListener('click', function (){
	if (counter < 9) {
		incrementProg();
		pointDisplay.innerText = `Current Points: ${pointCount}`;
		resetBTN();
		counter++;
		getData();
	}
	else if ((counter = 9)) {
		let percent = (10 - incorrectCounter) * 10;
		questionsContainer.style.display = 'none';
		resultsContainer.style.display = 'block';
		resultsText[0].innerText = `You have accumulated ${pointCount} points`;
		resultsText[1].innerText = `Your percentage for this quiz is ${percent}%`;
		joke(percent);
		totalScoreDisp.innerText = `Total Score: ${totalScore} Points`;
		let exitBTN = document.querySelector('#exit');
		exitBTN.addEventListener('click', clearAll);
	}
});

function joke (percent){
	if (percent < 55) {
		jokeText = `"Well, performance issues, it's not uncommon. One out of five...": Tony Stark`;
	}
	else if (percent >= 80 && percent <= 100) {
		jokeText = `"Genius, billionaire, playboy, philanthropist.": Tony Stark`;
	}
	else {
		jokeText = `"Dude you’re embarrassing me in front of the wizards.": Tony Stark`;
	}
	resultsText[2].innerText = jokeText;
}

function incrementProg (){
	let compStyle = getComputedStyle(progressContainer);
	let width = parseFloat(compStyle.getPropertyValue('--width')) || 0;
	progressContainer.style.setProperty('--width', width + 10);
}

function clearAll (){
	resultsContainer.style.display = 'none';
	counter = 0;
	pointCount = 0;
	correctCount = 0;
	incorrectCounter = 0;
	questionCat = '';
	progressContainer.style.setProperty('--width', 0);
	totalScoreDisp.style.visibility = 'visible';
}

getData();
let userChoice;
let userChoiceBTN;

triviaContent.addEventListener('click', getText);

function getText (e){
	if (e.target.className === 'answerChoice') {
		userChoice = e.target.innerText;
		userchoiceBTN = e.target.id;
		getData(userChoice, userchoiceBTN);
	}
}

instructionsBTN.addEventListener('click', showInstructions);
function showInstructions (){
	instructionsContainer.style.display = 'block';
	instructText.innerText =
		'There are 3 Marvel quizzes ranging from easy to hard. There are 10 questions per quiz. You cannot take the same quiz twice in a row. You will get 5 points for each correct easy question, 10 points for each correct medium question and 15 points for each correct hard question. The top of the page shows the total accumulation of points after each quiz is completed. See if you can score 100% on all the quizzes.';
}

span.onclick = function (){
	instructionsContainer.style.display = 'none';
};

window.onclick = function (event){
	if (event.target == instructionsContainer) {
		instructionsContainer.style.display = 'none';
	}
};
