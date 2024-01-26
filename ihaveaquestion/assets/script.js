//GIVEN I am taking a code quiz
//WHEN I click the start button
//THEN a timer starts and I am presented with a question
//WHEN I answer a question
//THEN I am presented with another question
//WHEN I answer a question incorrectly
//THEN time is subtracted from the clock
//WHEN all questions are answered or the timer reaches 0
//THEN the game is over
//WHEN the game is over
//THEN I can save my initials and score


//GLOBAL VARIABLES
// Document object
var myDoc = document, 
// Index of the current question in the quiz
    currentQuestionIndex = 0, 
// User's score
    score = 0,
// Interval ID for the timer
    timerInterval,
// Time left in seconds
    timeLeft = 60,
    questions = [// These are our questions arranged as objects in an array.
    {//1
        question: "1",
        options: ["1", "8", "9", "5"],
        answer: "1"
    },

    {//2
        question: "2",
        options: ["1", "3", "2", "4"],
        answer: "2"
    },
    
    {//3
        question: "3",
        options: ["6", "3", "5", "7"],
        answer: "3"
    },

    {//4
        question: "4",
        options: ["7", "5", "6", "4"],
        answer: "4"
    },
    {//5
        question: "5",
        options: ["7", "8", "5", "9"],
        answer: "5"
    },

    {//6
        question: "6",
        options: ["1", "6", "2", "3"],
        answer: "6"
    },
    
    {//7
        question: "7",
        options: ["1", "2", "7", "3"],
        answer: "7"
    },

    {//8
        question: "8",
        options: ["8", "1", "2", "3"],
        answer: "8"
    },
    {//9
        question: "9",
        options: ["9", "1", "2", "3"],
        answer: "9"
    },

    {//10
        question: "10",
        options: ["1", "2", "3", "10"],
        answer: "10"
    },
];
// Event listener for the "Start" button
myDoc.getElementById("start-btn").addEventListener("click", function startButtonClick() {
    // Hide the start button
    myDoc.getElementById("start-btn").classList.add("hide");

    // Call the startQuiz function
    startQuiz();
});
// Event listener for the "Submit" button
myDoc.getElementById("submit-btn").addEventListener("click",function submitButtonClick() {
    checkAnswer();
});
// Event listener for the "Save" button
myDoc.getElementById("save-btn").addEventListener("click", saveScore);

// Event listener for the "Restart Quiz" button
myDoc.getElementById("restart-btn").addEventListener("click", function restartButtonClick() {
    // Reset variables and display the start button
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;

    // Show the start button
    myDoc.getElementById("start-btn").classList.remove("hide");

    // Hide the "Restart Quiz" button
    myDoc.getElementById("restart-btn").classList.add("hide");

    myDoc.getElementById("game-over-container").classList.add("hide");

    myDoc.getElementById("timer").classList.remove("hide");

    myDoc.getElementById("start-btn").classList.add("hide");

    // Call the startQuiz function
    startQuiz();
});


// FUNCTIONS

// Function to start the quiz
function startQuiz() {
    // Hide and show relevant elements
    myDoc.getElementById("quiz-header").classList.add("hide");
    myDoc.getElementById("quiz-container").classList.remove("hide");
    myDoc.getElementById("question-container").classList.remove("hide");
    myDoc.getElementById("submit-btn").classList.remove("hide");
   // Load the first question and start the timer
    loadQuestion();
    startTimer();
}
// Function to load a question onto the page
function loadQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    // Display the question text
    myDoc.getElementById("question").innerText = currentQuestion.question;
    // Clear existing answer buttons
    var answerBtns = myDoc.getElementById("answer-btns");
    answerBtns.innerHTML = "";
    // Create buttons for each answer option 
    currentQuestion.options.forEach(function createOptionButton(option, index) {
        var btn = myDoc.createElement("button");
        btn.innerText = option;
        btn.classList.add("btn");
        // Add an event listener to check the answer when a button is clicked
        btn.addEventListener("click", function optionButtonClick() {
            checkAnswer(option);
        });
        // Append the button to the answer buttons container
        answerBtns.appendChild(btn);
    });
}
// Function to check the user's answer
function checkAnswer(userAnswer) {
    var currentQuestion = questions[currentQuestionIndex];
    // Update score and time based on the user's answer
    if (userAnswer === currentQuestion.answer) {
        score += 10;
    } else {
        timeLeft -= 10;
    }
    // Move to the next question or end the quiz if all questions are answered
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}
// Function to start the timer
function startTimer() {
    timerInterval = setInterval(function updateTimer() {
        // Update the timer text with a label
        myDoc.getElementById("timer").innerText = "Time Left: " + timeLeft + " seconds";

        timeLeft--;

        // End the quiz if time runs out
        if (timeLeft < 0) {
            endQuiz();
        }
    }, 1000); // Update every 1000 milliseconds (1 second)
}
// Function to end the quiz
function endQuiz() {
    clearInterval(timerInterval);
 // Hide question container and submit button, show game over container
    myDoc.getElementById("question-container").classList.add("hide");
    myDoc.getElementById("submit-btn").classList.add("hide");
    myDoc.getElementById("game-over-container").classList.remove("hide");
    myDoc.getElementById("timer").classList.add("hide");
// Display the final score
    myDoc.getElementById("final-score").innerText = score;
    myDoc.getElementById("restart-btn").classList.remove("hide");
    
}



// Function to save the user's score
function saveScore() {
    var initials = myDoc.getElementById("initials").value.trim();

    if (initials !== "") {
        // Store the user's initials and score in local storage
        localStorage.setItem("userScore", JSON.stringify({ initials: initials, score: score }));
        alert("Score saved! Initials: " + initials + ", Score: " + score);
    } else {
        alert("Please enter initials to save your score.");
    }
}