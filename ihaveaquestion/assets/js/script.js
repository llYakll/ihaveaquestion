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
        question: "What is the difference between null and undefined?",
        options: ["null is an assignment value that represents no value or an empty value, while undefined is a variable that has been declared but not assigned a value.", "They are the same.", "They are spelled different.", "42"],
        answer: ""
    },

    {//2
        question: "What is the purpose of the “this” keyword in JavaScript?",
        options: ["It does stuff.", "It explains this.", "The this keyword refers to the object that is executing the current function or method. It allows access to object properties and methods within the context of that object.", "Chicken Wing"],
        answer: "null is an assignment value that represents no value or an empty value, while undefined is a variable that has been declared but not assigned a value."
    },
    
    {//3
        question: "What is the difference between == and === operators in JavaScript?",
        options: ["They are the same.", "The equality == operator is a comparison operator that compares two values and returns true if they are equal. The strict equality === operator is also a comparison operator, but it compares two values and returns true only if they are equal and of the same type.", "One is true, one is false.", "It's a boolean"],
        answer: "The equality == operator is a comparison operator that compares two values and returns true if they are equal. The strict equality === operator is also a comparison operator, but it compares two values and returns true only if they are equal and of the same type."
    },

    {//4
        question: "What is the difference between “var” and “let” keywords in JavaScript?",
        options: ["The var keyword declares a global variable, The let keyword declares a local variable.", "var is for variety, let is for permissions", "Cabbage can also be used", "Vegetable"],
        answer: "The var keyword declares a global variable, The let keyword declares a local variable."
    },
    {//5
        question: "How do you execute a function when a user clicks a button?",
        options: ["click = function", "executeFunctionOnClick()", "addEventListener('click', funtion)", "userClick()"],
        answer: "addEventListener('click', funtion)"
    },

    {//6
        question: "How Do You Add Comments to JavaScript Code?",
        options: ["<!-->", "//", "/**/", "--><--"],
        answer: "//"
    },
    
    {//7
        question: "What does NaN mean?",
        options: ["Next attribute Name", "Non affected Name", "Not a Number", "Next apple Nanny"],
        answer: "Not a Number"
    },

    {//8
        question: "What Are the Looping Structures in JavaScript?",
        options: ["For loops, Do-while loops, while loops", "Loop once cut twice.", "Passive Intermodulation", "Frequency Domain Reflectometry"],
        answer: "For loops, Do-while loops, while loops"
    },
    {//9
        question: "Is JavaScript Case-Sensitive?",
        options: ["Yes.", "No", "Under a for loop.", "only in a statement."],
        answer: "Yes."
    },

    {//10
        question: "In an array, the first item in the array is index number _?",
        options: ["1", "2", "3", "0"],
        answer: "0"
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