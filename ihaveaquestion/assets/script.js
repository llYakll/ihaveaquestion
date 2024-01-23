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
const myDoc= document;
const startButton = myDoc.getElementById('start-btn')
const questionContainerElement = myDoc.getElementById('question-container');
let shuffleQuestion, currentQuestionIndex;
const questionElement = myDoc.getElementById('question')
const answersElement = myDoc.getElementById('answer-btns')
const submitButton = myDoc.getElementById('submit-btn')



startButton.addEventListener('click', startGame)//Listened for user clicking on Start
submitButton.addEventListener('click',() => {
    currentQuestionIndex++
    setQuestion()
})

//Start the game
function startGame(){

    //adds the "hide" class to "start-btn" id.
    startButton.classList.add('hide')
    //this randomizes questions
    shuffleQuestion = questions.sort(() => Math.random() - .5 )
    currentQuestionIndex = 0
    // removes the "hide" class from "question-container" id.
    questionContainerElement.classList.remove('hide')
    setQuestion()//?

} 
function setQuestion(){
    resetState()
    showQuestion(shuffleQuestion[currentQuestionIndex
    
    ])
}

 function showQuestion(question){
    questionElement.innerText = question.question
    question.answer.forEach(answer =>{
        const button = myDoc.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answersElement.appendChild(button)
    })
 }
//removes buttons and text predefined in HTML
 function resetState() {
    submitButton.classList.add('hide') //states to hide
    while (answersElement.firstChild) {
        answersElement.removeChild
        (answersElement.firstChild)
    }
 }


 function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct

    setStatusClass(myDoc.body, correct)
    Array.from(answersElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestion.length > currentQuestionIndex + 1){
        submitButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
 }

 function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}


    function clearStatusClass(element) {
        element.classList.remove('correct')
        element.classList.remove('wrong')
    }
    


const questions = [
    {
        question: "What are arrays used for?",
        answer: [
            {text: 'Arrays store multiple values into a single variable', correct:true},
            {text: 'Arrays steal yo girl', correct:false},
            {text: 'Arrays shoot heatseeking killer alligators out of a cannon', correct:false},
            {text: 'Arrays are not in JavaScript', correct:false}
        ] 
    
    },
    {
        question: "What is a better practice for calling on the document?",
        answer: [
            {text: 'Store the document as a variable and call it using myDoc', correct:true},
            {text: 'Do the Hokey pokey', correct:false},
            {text: 'Turn Yourself Around', correct:false},
            {text: 'That is what it is all about', correct:false}
        ] 
    
    },
    {
        question: "What are the different data types in JavaScript?",
        answer: [
            {text: 'Number, String, Boolean, Null, Undefined, Symbol, Array, and Object', correct:true},
            {text: 'something', correct:false},
            {text: 'something else', correct:false},
            {text: 'something else entirely', correct:false}
        ] 
    
    },
    {
        question: "What is the purpose of the “this” keyword in JavaScript?",
        answer: [
            {text: 'The this keyword refers to the object that is executing the current function or method. It allows access to object properties and methods within the context of that object.', correct:true},
            {text: 'something', correct:false},
            {text: 'something else', correct:false},
            {text: 'something else entirely', correct:false}
        ] 
    
    },
    {
        question: "What is the difference between == and === operators in JavaScript?",
        answer: [
            {text: 'The equality == operator is a comparison operator that compares two values and returns true if they are equal. The strict equality === operator is also a comparison operator, but it compares two values and returns true only if they are equal and of the same type.', correct:true},
            {text: 'something', correct:false},
            {text: 'something else', correct:false},
            {text: 'something else entirely', correct:false}
        ] 
    
    },
    {
        question: "What is the difference between “var” and “let” keywords in JavaScript?",
        answer: [
            {text: 'The var and let keywords are both used to declare variables in JavaScript. However, there are some key differences between the two keywords.', correct:true},
            {text: 'something', correct:false},
            {text: 'something else', correct:false},
            {text: 'something else entirely', correct:false}
        ] 
    
    }
];
