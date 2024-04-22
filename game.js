var userClickedPattern = [];
//3. At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];

//5. At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];

//7b Create a new variable called level and start at level 0.
var level = 0;

//7a. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var start = "false";
$(".restart").click(() => {
  if (start === "false") {
    $("h1").text(`Level ${level}`);
    $(".restart").text(`Restart`);
  }
  Restart();
  nextSequence();
  start = "true";
});

//1. Inside game.js create a new function called nextSequence()
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text(`Level ${level}`);
  //2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);

  //4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.

  //6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern. ///
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log("outside" + gamePattern);
  //f1. Use jQuery to select the button with the same id as the randomChosenColour
  //f2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  // var audio = new Audio(`sounds/${randomChosenColour}.mp3`);
  // audio.play();
  playsound(randomChosenColour);
}

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click((e) => {
  // console.log(e.target.id);
  var userChosenColour = e.target.id;
  //6. var userChosenColour = $(this).attr("id"); another option
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);
  console.log(`id: ${userChosenColour}`);
  console.log(userClickedPattern);
  console.log(userClickedPattern.length);
  checkAnswer(userClickedPattern.length - 1);
});

const Restart = () => {
  // $("h1").text(`Press Any Key to Start`);
  level = 0;
  gamePattern = [];
  start = "false";
  // userClickedPattern = [];
};

const GameOver = () => {
  $("body").attr("class", "game-over");
  setTimeout(() => {
    $("body").removeAttr("class");
  }, 200);
  $("h1").text(`Game Over, Press Any Key or reload page to Restart`);
};

// Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    console.log(gamePattern);
    console.log(userClickedPattern);
    console.log(currentLevel);
    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playsound("wrong");
    GameOver();
    Restart();
    // $("body").attr("width", "500");
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
