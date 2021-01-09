// Id for the table
var titleHighscores = document.querySelector("#highscores");
// Id for the clear button
var clearBtn = document.querySelector("#clear");

// Function to populate the highscores table
function highscores() {
    // Grab the scores from local storage
    var topScores = JSON.parse(localStorage.getItem("topScores"));
    // If there are scores
    if (topScores !== null) {
        // Loop through all of them
        for (var i = 0; i < topScores.length; i++) {
            // Create a new table row
            var tableRow = document.createElement("tr");
            // Create new data for those rows
            var initialDiv = document.createElement("td");
            var scoreDiv = document.createElement("td");
            // Set the class name for each row
            tableRow.setAttribute("class", "hs-table-row");
            // Append row to table
            titleHighscores.appendChild(tableRow);
            // Append data to row
            tableRow.appendChild(initialDiv);
            tableRow.appendChild(scoreDiv);
            // Put initials and scores in the table
            initialDiv.textContent = topScores[i].initials;
            scoreDiv.textContent = topScores[i].score;
            // Alternate grey/white backgrounds for the table
            if (i % 2 == 0) {
                tableRow.setAttribute("style", "background-color: grey;");
            } 
            else {
                tableRow.setAttribute("style", "background-color: white;");
            }
        }
    }
}
// clear the local storage button
clearBtn.addEventListener("click", function(event) {
    // Get all of the td elements
    var tableData = document.querySelectorAll("td");
    //  Cycle through them and remove the tags and data
    for (var i = 0; i < tableData.length; i++) {
        tableData[i].innerHTML = "";
    }
    // clear the local storage
    localStorage.clear();
    
 });

// Run the highscores function
highscores();