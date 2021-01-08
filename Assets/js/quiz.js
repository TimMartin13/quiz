var timer = document.querySelector("#timer");
var questions = document.querySelector("#questions");
var introParagraph = document.querySelector("#introParagraph");
var startQuiz = document.querySelector(".startBtn");
var options = document.querySelector("#choices");

var myQuiz = [
    {
        question: "How much wood can a woodchuck chuck if a woodchuck could chuck wood?",
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        answer: "1"
    },
    {
        question: "Question 2?",
        choices: ["Choice 2", "Choice 3", "Choice 4", "Choice 1"],
        answer: "2"
    },
    {
        question: "Question 3?",
        choices: ["Choice 3", "Choice 4", "Choice 2", "Choice 1"],
        answer: "3"
    },
    {
        question: "Question 4?",
        choices: ["Choice 4", "Choice 1", "Choice 2", "Choice 3"],
        answer: "4"
    }
];

var index = 0;
var timeLeft = 90;
var score = 0;
var stopTimer = false;

function init() {
    questions.textContent = "Coding Quiz Challenge";
    introParagraph.textContent = "Try to answer the following code-related questions within the time limit.  Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
}

function startTimer(event) {
    event.preventDefault();
    // Grab the frist question/choices
    cycleQuestions();
    // Remove the intro paragraph and start button
    introParagraph.textContent = "";
    startQuiz.setAttribute("style", "display: none;");

    // Start the timer
    var timeInterval = setInterval(function() {
        // Show the time remaining in the upper right corner
        timer.textContent = "Time Remaining: " + timeLeft;
        // If less than 10 seconds change text to red and weight to bold
        if (timeLeft < 10 && timeLeft > 0) {
            timer.setAttribute("style", "color: red; font-weight: bold;")
        }    
        else if (timeLeft === 0 || stopTimer) {
            clearInterval(timeInterval);
            if(!stopTimer) {
                clearOptions();
                gameOver();
            }    
        }
        timeLeft--;

    }, 1000);
} 

function clearOptions() {
    while (options.firstChild) {
        options.removeChild(options.firstChild);
    }
}

// Populate the Question and Answer options
function cycleQuestions() {
    // If not the first question
    if (index !== 0) {
        // Clear the options
        clearOptions();
    }
    // If game not over yet
    if (index <= myQuiz.length - 1) {     
        console.log(myQuiz[index].question);
        questions.textContent = myQuiz[index].question;
        
        for (var i = 0; i < myQuiz[index].choices.length; i++) {
            var newBtn = document.createElement("button");
            options.appendChild(newBtn);
            newBtn.textContent = myQuiz[index].choices[i];
            newBtn.setAttribute("class", "choice");
            newBtn.setAttribute("data-number", i + 1);
        }
    }
    else {
        gameOver(); 
    }  
}

function gameOver() {
    // Stop timer
    stopTimer = true;
    score += timeLeft;
    // All done text
    questions.textContent = "All Done!";
    questions.setAttribute("style", "text-align: left;")
    // Final score text with score
    var scoreDiv = document.createElement("div");
    scoreDiv.setAttribute("id", "score");
    questions.appendChild(scoreDiv);
    scoreDiv.textContent = "Final Score: " + score; 
    // Enter initials text
    var initialsDiv = document.createElement("div");
    initialsDiv.setAttribute("id", "initials");
    questions.appendChild(initialsDiv);
    initialsDiv.textContent = "Enter initials: "; 
    // Textbox to enter initials
    var newTextBox = document.createElement("input");
    newTextBox.setAttribute("id", "textBox");
    newTextBox.setAttribute("type", "text");
    questions.appendChild(newTextBox);
    // Submit button
    var newButton = document.createElement("button");
    newButton.setAttribute("id", "submit");
    newButton.setAttribute("type", "button");
    questions.appendChild(newButton);
    newButton.textContent = "Submit";
    
    // localStorage.setItem("record", record);

    // Text box 
        // Enter Initials - submit button
        // store initials and highscore in a local storage array
        // highscores()
}

function highscores() {
    // Go to highscores page
}
// Listen for answer clicks
options.addEventListener("click", function(event) {
    var element = event.target;
    console.log(event.target);

    if (element.matches(".choice")) {
        var state = element.getAttribute("data-number");
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "confirm");
        options.appendChild(newDiv);

        if (state == myQuiz[index].answer) {
          score += 5;
          newDiv.textContent = "Correct!";
          console.log(newDiv.textContent);
        }
        else {
          timeLeft -= 10;
          if (timeLeft < 0) {
              timeLeft = 0;
          }
          newDiv.textContent = "Wrong!";
          console.log(newDiv.textContent);
        }
        index++;
        setTimeout(cycleQuestions, 1000);
    }
});


// Initial state  
init();

// Start Quiz button
startQuiz.addEventListener("click", startTimer);



        // When gameOver
            // have user enter initials
            // add it to local storage
            // add score to local storage




    // highscores.html
    
    


