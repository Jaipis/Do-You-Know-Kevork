const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('answer'));
const QuesNum = document.getElementById('question-num');
const ScoreNum = document.getElementById('score-num');
const DifficultyText = document.getElementById('difficulty'); // Get the difficulty text element

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];

let MAX_QUESTIONS = 0;

fetch("../questions/kevo.json")
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        MAX_QUESTIONS = questions.length;
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

// CONSTANTS
const CORRECT_BONUS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

const QuesImage = document.getElementById('img-ques');

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("FinalScore", score);
        // go to the end page
        return window.location.assign('../html/end.html');
    }
    questionCounter++;
    QuesNum.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;
    DifficultyText.innerText = currentQuestion.category; // Display difficulty
    RestartTimer();

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        const choiceText = currentQuestion['choice' + number];

        // Check if the choice exists and is not undefined
        if (choiceText) {
            choice.innerText = choiceText;
            choice.parentElement.style.display = 'flex'; // Show the choice if it has a value
        } else {
            choice.parentElement.style.display = 'none'; // Hide the entire choice div if it's undefined
        }
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
    if (currentQuestion.imageUrl) {
        QuesImage.src = currentQuestion.imageUrl;
        QuesImage.style.display = 'block';
    } else {
        QuesImage.style.display = 'none';
    }
};

// Timer  
const Time = document.getElementById('span-time');
const TimeLine = document.getElementById('progress');

let Count = 20;
let IntervalId;

StartTimer = () => {
    if (Count > 0) {
        Count--;
        Time.innerText = Count;

        const Percentage = (Count / 15) * 100;
        TimeLine.style.width = Percentage + "%";
    } else if (Count === 0) {
        getNewQuestion();
    }
};

RestartTimer = () => {
    clearInterval(IntervalId);
    Count = 15;
    Time.innerText = Count;
    TimeLine.style.width = '100%';
    IntervalId = setInterval(StartTimer, 1000);
};

IntervalId = setInterval(StartTimer, 1000);

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const CorrectAnswer = currentQuestion.answer;

        // Highlight the correct choice
        const correctChoice = choices.find(choice => choice.dataset['number'] == CorrectAnswer);
        correctChoice.parentElement.classList.add("correct");

        const ClassToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        selectedChoice.parentElement.classList.add(ClassToApply);

        if (selectedAnswer == CorrectAnswer) {
            Correct.play();
            clearInterval(IntervalId);
        } else {
            Wrong.play();
            clearInterval(IntervalId);
        }

        if (ClassToApply === 'correct') {
            // Adjust score based on question category
            let scoreIncrement = 0;
            switch (currentQuestion.category) {
                case 'Basic':
                    scoreIncrement = 5;
                    break;
                case 'Intermediate':
                    scoreIncrement = 10;
                    break;
                case 'Nsiya':
                    scoreIncrement = 20;
                    break;
                default:
                    scoreIncrement = CORRECT_BONUS; // Use default bonus if category doesn't match
            }

            incrementScore(scoreIncrement); // Use calculated score increment
        }

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(ClassToApply);
            correctChoice.parentElement.classList.remove("correct");

            getNewQuestion();
        }, 1000);
    });
});

// Sounds
const Correct = new Audio();
const Wrong = new Audio();

Correct.src = '../sounds/Correct.mp3';
Wrong.src = '../sounds/wrong.mp3';

incrementScore = num => {
    score += num;
    ScoreNum.innerText = score;
    localStorage.setItem('Max-questions', MAX_QUESTIONS);
}

// Exit Button
const ExitBtn = document.getElementById('exit-btn');
ExitBtn.addEventListener('click', Exit = () => {
    window.location.assign('../html/chapitres.html');
});
