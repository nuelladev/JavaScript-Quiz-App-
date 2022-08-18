//this section signifies a class quiz
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

// this Section signifies a question Class
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

// the idea is to display the question
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

// GUESS ANSWER
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};

// SHOW QUIZ PROGRESS
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML =
        `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};

// SHOW SCORES
function showScores() {
    let quizEndHTML =
        `
    <h1>Quiz Completed</h1>
    <h2 id='score'> Your Score: ${(quiz.score)*10} / ${(quiz.questions.length)*10}</h2>
    <div class="quiz-repeat">
        <a href="index.html">Take Quiz Again</a>
    </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};

// create questions here
let questions = [
    new Question(
        "JavaScript is the same as Java?", ["True", "False", "Unsure", "Partially True"], "False"
    ),
    new Question(
        " Javascript is an _______ language?", ["Object-oriented", "Procedural", "Object-based", "None of the above"], "Object-oriented"
    ),
    new Question(
        "Which of the following keywords is used to define a variable in Javascript?", ["Let", "Var", "Both A and B", "None of the above"], "Both A and B"
    ),
    new Question(
        "Which of the following methods is used to access HTML elements using Javascript?", ["getElementById()", "getElementByClassName()", "Both A and B", "None of the above"], "Both A and B"
    ),
    new Question(
        "Upon encountering empty statements, what does the Javascript Interpreter do?", ["Ignores the statements", "Throws an Error", "Gives a Warning", "None of the above"], "Ignores the statements"
    ),
    new Question(
        "Which is javaScript library?", ["React", "Laravel", "Python", "Sass"], "React"
    ),
    new Question(
        "Which of the following methods can be used to display data in some form using Javascript?", ["document.write()", "console.log()", "window.write()", "All of the above"], "All of the above"
    ), 
    new Question(
        "How can a datatype be declared to be a constant type?", ["var","let","const","constant"], "const"
    ),
    new Question(
        "What keyword is used to check whether a given property is valid or not?", ["in", "as in","exists", "lies"], "in"
    ), 
    new Question(
        "When an operator\’\s value is NULL, the typeof returned by the unary operator is:", ["boolean", "undefined", "object","integer"], "object"
    )
   
];


let quiz = new Quiz(questions);

// display questions
displayQuestion();


// Add A CountDown for the Quiz
let time = 15;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);
}

startCountdown();