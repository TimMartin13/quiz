var timer = document.querySelector("#timer");
var questions = document.querySelector("#questions");
var introParagraph = document.querySelector("#introParagraph");
var startQuiz = document.querySelector(".startBtn");
var options = document.querySelector("#choices");

var newTextBox = document.createElement("input");
var submitButton = document.createElement("button");

// To keep track of which question/answer
var index = 0;

var timeLeft = 90;
var score = 0;
// Local storage array
var storedScores = [];

// Flag set if all questions answered before timer runs out
var stopTimer = false;
// Initial state of page
function init() {
    // Title
    questions.textContent = "Know your scientists!";
    // Introduction paragraph
    introParagraph.textContent = "Try to answer the following code-related questions within the time limit.  Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
}
// Timer function
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
        // Game over if timer runs out or all questions are answered
        else if (timeLeft === 0 || stopTimer) {
            // Stop the timer
            clearInterval(timeInterval);
            // If game stopped because the user answered all of the questions
            if(!stopTimer) {
                // Clear the questions/answers
                clearOptions();
                // Run gameover function
                gameOver();
            }    
        }
        timeLeft--;

    }, 1000);
} 
// Function to remove answers to prepare for the next question
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
    if (index <= myQuiz.length - 1 && timeLeft > 0) {
        // Ask the next question     
        questions.textContent = myQuiz[index].question;
        // Populate the question/answer choices
        for (var i = 0; i < myQuiz[index].choices.length; i++) {
            // Create a new button for each answer
            var newBtn = document.createElement("button");
            // Append it to the div
            options.appendChild(newBtn);
            // Populate the text
            newBtn.textContent = myQuiz[index].choices[i];
            // Add a class and data-number to get the answer
            newBtn.setAttribute("class", "choice");
            newBtn.setAttribute("data-number", i + 1);
        }
    }
    else {
        gameOver(); 
    }  
}

// Game over function
function gameOver() {
    // Stop timer
    stopTimer = true;
    // Add time left to score
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

    // Textbox to enter initials (Global so the submit button listener can access it)
    // var newTextBox = document.createElement("input");
    newTextBox.setAttribute("id", "textBox");
    newTextBox.setAttribute("type", "text");
    questions.appendChild(newTextBox);
    // Submit button (Global so the submit button listener can access it)
    // var submitButton = document.createElement("button");
    submitButton.setAttribute("id", "submit");
    submitButton.setAttribute("type", "button");
    questions.appendChild(submitButton);
    submitButton.textContent = "Submit";
}

// Function to submit the users initials and score
submitButton.addEventListener("click", function(event) {
    // Get the initials from the user
    var topScores = JSON.parse(localStorage.getItem("topScores"));
    var initials = document.querySelector("#textBox").value.trim();
    
    // Put current information into an object
    var highscore = {
        initials: initials,
        score: score
    };
    // If there are previous topScores
    if (topScores !== null) {
        // Push highscore to the back
        topScores.push(highscore);
        // Put the entire thing into a new array
        storedScores = topScores;
        // Sort the array (high score to low score)
        storedScores.sort(function(a, b){
            return b.score - a.score;
        });
    }
    // First run with no topScores
    else {
        // Put the object directly into the array
        storedScores.push(highscore);
    }
    // Store the array locally
    localStorage.setItem("topScores", JSON.stringify(storedScores));
    // Go to the highscores page
    location.href = "./highscores.html"
 });


// Listen for answer clicks
options.addEventListener("click", function(event) {
    var element = event.target;
    // Ensure that the user clicked on a choice
    if (element.matches(".choice")) {
        // Get the button the user clicked
        var state = element.getAttribute("data-number");
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "confirm");
        options.appendChild(newDiv);
        // If the button matches the answer
        if (state == myQuiz[index].answer) {
            // Add five to score
            score += 5;
            // Display correct text at the bottom of the div
            newDiv.textContent = "Correct!";
        }
        else {
            // Wrong answers have a time penalty
            timeLeft -= 10;
            if (timeLeft < 0) {
                timeLeft = 0;
            }
            // Display wrong text at the bottom of the div
            newDiv.textContent = "Wrong!";
        }
        // If there is time left, got to next question
        if (timeLeft > 0) {
            index++;
            // stall a second to show correct/wrong text
            setTimeout(cycleQuestions, 1000);
        }
        
    }
});


// Initial state  
init();

// Start Quiz button
startQuiz.addEventListener("click", startTimer);
    
    


