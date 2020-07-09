const header = document.querySelector('header');
const highScoresLink = document.querySelector('#high-scores-link');
const timeDisplay = document.querySelector('#time');


const intro = document.querySelector('#intro');
const startButton = document.querySelector('#start');


const quiz = document.querySelector('#quiz');
const questionContainer = document.querySelector('#question');
const optionA = document.querySelector('#a');
const optionB = document.querySelector('#b');
const optionC = document.querySelector('#c');
const optionD = document.querySelector('#d');
const result = document.querySelector('#result');

const scoreForm = document.querySelector('#score-form');
const finalScore = document.querySelector('#final-score');
const initialsInput = document.querySelector('#initials');
const submitButton = document.querySelector('#submit');

const scoreBoard = document.querySelector('#score-board');
const highScoresList = document.querySelector('#high-scores');
const playAgainButton = document.querySelector('#play-again');
const clearScoresButton = document.querySelector('#clear-scores');

// const yourScore = document.querySelector('#your-score');


const questions = [
    {
        question: 'What is the HTML tag under which one can write the JavaScript code?',
        a: '<javascript>',
        b: '<scripted>',
        c: '<script>',
        d: '<js>',
        answer: 'c'
    },
    {
        question: 'Which of the following is the correct syntax to display “Coding Rules!” in an alert box using JavaScript?',
        a: 'alertbox(“Coding Rules!”)',
        b: 'msg(“Coding Rules!”)',
        c: 'msgbox(“Coding Rules!”)',
        d: 'alert(“Coding Rules!”)',
        answer: 'd'
    },
    {
        question: 'What is the correct syntax for referring to an external script called “myjavascript.js”?',
        a: '<script src=”myscript.js”>',
        b: '<script href=”myscript.js”>',
        c: '<script ref=”myscript.js”>',
        d: '<script name=”myscript.js”>',
        answer: 'a'
    } /* ,
    {
        question: 'The external JavaScript file must contain <script> tag. True or False?',
        a: 'True',
        b: 'False',
        c: '',
        d: '',
        answer: 'b'
    },
    {
        question: 'What is the syntax for creating a function in JavaScript named as funkyFunc?',
        a: 'function = funkyFunc()',
        b: 'function funkyFunc()',
        c: 'function := funkyFunc()',
        d: 'function : funkyFunc()',
        answer: 'b'
    },
    {
        question: 'How is the function called in JavaScript?',
        a: 'call funkyFunc()',
        b: 'call function funkyFunc()',
        c: 'funkyFunc()',
        d: 'function funkyFunc()',
        answer: 'c'
    },
    {
        question: 'What is the JavaScript syntax for printing values in Console?',
        a: 'print(5)',
        b: 'console.log(5)',
        c: 'console.print(5)',
        d: 'print.console(5)',
        answer: 'b'
    },
    {
        question: 'What is the method in JavaScript used to remove the whitespace at the beginning and end of any string ?',
        a: 'strip()',
        b: 'trim()',
        c: 'stirpped()',
        d: 'trimmed()',
        answer: 'b'
    },
    {
        question: ' What is the function that can be used to check if the number is an integer or not?',
        a: 'Integer(value)',
        b: 'ifInteger(value)',
        c: 'isInteger(value)',
        d: 'ifinteger(value',
        answer: 'c'
    },
    {
        question: 'JavaScript is a ________ Side Scripting Language.',
        a: 'Server',
        b: 'ISP',
        c: 'Browser',
        d: 'None of the above',
        answer: 'c'
    } */
];


let secondsLeft = 30;
let qIndex = 0;
let highScoresArray = [];
let timerInterval;


function setTime() {
    timerInterval = setInterval(function() {
      secondsLeft--;
      timeDisplay.textContent = secondsLeft;

      if(secondsLeft <= 0) {
        secondsLeft = 0;
        timeDisplay.textContent = secondsLeft;
        gameOver();
      }
    }, 1000);
  }

init();

function renderHighScores() {
    highScoresList.innerHTML = '';
    highScoresArray.sort();
    highScoresArray.reverse();
    for (var i = 0; i < highScoresArray.length; i++) {
        let highScore = highScoresArray[i];
    
        let li = document.createElement("li");
        li.textContent = highScore;
    
        highScoresList.appendChild(li);
      }
}

function init() {
    timeDisplay.textContent = secondsLeft;
    let storedHighScores = JSON.parse(localStorage.getItem('high-scores'));
  
    if (storedHighScores !== null) {
      highScoresArray = storedHighScores;
    }
    renderHighScores();
}

function storeHighScores() {
    localStorage.setItem('high-scores', JSON.stringify(highScoresArray));
}  

function renderQuestion() {
    questionContainer.textContent = questions[qIndex].question;
    optionA.textContent = questions[qIndex].a;
    optionB.textContent = questions[qIndex].b;
    optionC.textContent = questions[qIndex].c;
    optionD.textContent = questions[qIndex].d;
}

function startQuiz() {
    qIndex = 0;
    secondsLeft = 30;
    intro.style.display = 'none';
    quiz.style.display = 'block';
    setTime();
    renderQuestion();
}

function rightOrWrong(event) {
    if (event.target.id === questions[qIndex].answer) {
        result.textContent = 'Correct!';
    } else {
        result.textContent = 'Wrong!';
        secondsLeft = secondsLeft - 5;
    }
    setTimeout(function() {
        result.textContent = '';
    }, 750);
}

function clickAnswer(event) {
    rightOrWrong(event);
    qIndex++;
    if (qIndex >= questions.length) {
        setTimeout(gameOver, 500);
    } else {
        setTimeout(renderQuestion, 500);
    }
}

function gameOver() {
    clearInterval(timerInterval);
    quiz.style.display = 'none';
    finalScore.textContent = `Your score is: ${secondsLeft}`;
    scoreForm.style.display = 'block';
 }

function submitScore (event) {
    event.preventDefault();
    let userInitials = initialsInput.value.trim();
    if (userInitials === "") {
        return;
      }
    initialsInput.value = '';
    let userScore = `${secondsLeft} - ${userInitials}`;
    highScoresArray.push(userScore);
    renderHighScores();
    storeHighScores();

    scoreForm.style.display = 'none';
    scoreBoard.style.display = 'block';
    header.style.display = 'none';
}

function playAgain() {
    qIndex = 0;
    secondsLeft = 30;
    timeDisplay.textContent = secondsLeft;
    scoreBoard.style.display = 'none';
    intro.style.display = 'block';
    header.style.display = 'block';
}

function clearScores() {
    highScoresList.innerHTML = '';
    highScoresArray = [];
    storeHighScores();
}

function seeHighScores() {
    intro.style.display = 'none';
    quiz.style.display = 'none';
    scoreForm.style.display = 'none';
    scoreBoard.style.display = 'block';
    header.style.display = 'none';
}

startButton.addEventListener('click', startQuiz);
optionA.addEventListener('click', clickAnswer);
optionB.addEventListener('click', clickAnswer);
optionC.addEventListener('click', clickAnswer);
optionD.addEventListener('click', clickAnswer);
submitButton.addEventListener('click', submitScore);
playAgainButton.addEventListener('click', playAgain);
clearScoresButton.addEventListener('click', clearScores);
highScoresLink.addEventListener('click', seeHighScores);
