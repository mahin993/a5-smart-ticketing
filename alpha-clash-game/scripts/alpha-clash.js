// function play(){
//   // step-1: hide the home screen. To hide the screen add the class hidden to the home section
//   const homeSection = document.getElementById('home-screen');
//   homeSection.classList.add("hidden");
//   console.log(homeSection); 

//   // show the playground
//   const playgroundSection = document.getElementById('playground-section');
//   playgroundSection.classList.remove("hidden");
//   console.log(playgroundSection.classList)
// }

function handleKeyboardKeyUpEvent(event){
  const playerPressed = event.key;
  // console.log('Player Pressed Key: ', playerPressed);

  //stop or quit the game if pressed 'Esc'
  if(playerPressed === 'Escape'){
    gameOver();
  }

  //key player is expected to press
  const currentAlphabetElement = document.getElementById('current-alphabet');
  const currentAlphabet = currentAlphabetElement.innerText;
  const expectedAlphabet = currentAlphabet.toLowerCase();
  // console.log('Player: ', playerPressed, 'Expected: ', expectedAlphabet)

  //check right or wrong key pressed
  if(playerPressed === expectedAlphabet){
    const currentScore = getTextElementValueById('current-score');
    const updatedScore = currentScore + 1;
    setTextElementValueById('current-score', updatedScore);
    //=============================================
    // // update the current score:
    // //1. step-1: get the current score
    // const currentScoreElement = document.getElementById('current-score');
    // const currentScoreText = currentScoreElement.innerText
    // const currentScore = parseInt(currentScoreText);
    // // console.log(currentScore);

    // step-2: increase the score by 1
    // const newScore = currentScore + 1;
    // console.log(newScore)
    // step-3: show the update score 
    // currentScoreElement.innerText = newScore;
    //===================================================
    

    //start a new round
    removeBackgroundColorById(expectedAlphabet);
    continueGame();
  }
  else{
    const currentLife = getTextElementValueById('current-life');
    const updatedLife = currentLife - 1;
    setTextElementValueById('current-life', updatedLife);
    //===================================================
    // // step-1: get the current life number
    // const currentLifeElement = document.getElementById('current-life');
    // const currentLifeText = currentLifeElement.innerText;
    // const currentLife = parseInt(currentLifeText);

    // step-2: decrease or reduce the life count
    // const newLife = currentLife - 1;

    // step-3: display the updated life count
    // currentLifeElement.innerText = newLife;
    //===================================================

    if(updatedLife === 0){
      gameOver();
    }


  }
  
}


//capture keyboard key press
document.addEventListener('keyup', handleKeyboardKeyUpEvent);

function continueGame(){
  // step-1: generate a random alphabet
  const alphabet = getRandomAlphabet();
  
  // set randomly generated alphabet to the screen(show it)
  const currentAlphabetElement = document.getElementById('current-alphabet');
  currentAlphabetElement.innerText = alphabet;

  // set background color
  setBackgroundColorById(alphabet);
}

function play(){
  //hide everything and show only the playground
  hideElementById('home-screen');
  hideElementById('final-score');
  showElementById('play-ground');

  //reset score and life
  setTextElementValueById('current-life', 5);
  setTextElementValueById('current-score', 0);
  continueGame();
}

function gameOver(){
  hideElementById('play-ground');
  showElementById('final-score');

  //update final score
  // step-1: get the last score
  const lastScore = getTextElementValueById('current-score');

  // step-2: set the last score
  setTextElementValueById('last-score', lastScore);

  // step-3: clear the last selected alphabet highlight
  const currentAlphabet = getElementTextById('current-alphabet');
  removeBackgroundColorById(currentAlphabet);

}