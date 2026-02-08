                // REFERENCING THE ELEMENTS

// MAIN GAME CONTAINER 
const container = document.getElementById('container');
// PLAYER CAR
const plyrOne = document.getElementById('plyr-1');
// CPU CARS CONTAINER
const cpuCarsContainer = document.getElementById('cpu-cars-container');

// HI SCORE COUNTER
const hiScore = document.querySelector('.hi-score-number');
// SCORE COUNTER
const score = document.querySelector('.score-number');
// LEVEL COUNTER
const level = document.querySelector('.level-number');

// EXPLOSSION CRASH ANIMATION
const crashAnimation = document.getElementById('crash');
// SIDELINES ANIMATION
const sidelineLeft = document.querySelector('.left');
const sidelineRight = document.querySelector('.right');
// SIDELINES STOPED
const sidelineStopL = document.querySelector('.L');
const sidelineStopR = document.querySelector('.R');

// START GAME
const startGame = document.getElementById('start-game');
// GAME OVER
const gameOver = document.getElementById('game-over');

// SAVED HI-SCORE
hiScore.innerText = +localStorage.getItem('super-street-racer-hi-score');


                // FUNCTIONS TO MOVE PLAYER ONE


// Hide player car
plyrOne.style.display = 'none';

// RANDOM TOP position
let rndmNumber = Math.floor(Math.random() * 10)

let rndmTopPstnArray = [];
for (let i = 180; i < 480; i += 30) {
     rndmTopPstnArray.push(i);
}
let rndmTopPstn = rndmTopPstnArray[rndmNumber];


// RANDOM LEFT position
let rndmNmbr = Math.floor(Math.random() * 4)

let rndmLeftPstnArray = [];
for (let i = 30; i < 450; i += 120) {
     rndmLeftPstnArray.push(i);
}
let rndmLeftPstn = rndmLeftPstnArray[rndmNmbr];


let T = rndmTopPstn;
let L = rndmLeftPstn;


// Crash Animation position
crashAnimation.style.top = +T + 'px';
crashAnimation.style.left = +L + 'px';
// Player position
plyrOne.style.top = +T + 'px';
plyrOne.style.left = +L + 'px';

function moveR() { // RIGHT
  if (L < 380) {
      L += 120
      plyrOne.style.left = +L + 'px';
      crashAnimation.style.left = +L + 'px';
  }
}

function moveL() { // LEFT
   if (L > 30) {
      L -= 120
      plyrOne.style.left = +L + 'px';
      crashAnimation.style.left = +L + 'px';
   }
}

function moveU() { // UP
   if (T > 0) {
      T -= 30
      plyrOne.style.top = +T + 'px';
      crashAnimation.style.top = +T + 'px';
   }
}

function moveD() { // DOWN
   if (T < 480) {
      T += 30
      plyrOne.style.top = +T + 'px';
      crashAnimation.style.top = +T + 'px';
   }
}

                // L TO R EVENT LISTENERS

// PLAYER JOYSTICK CONTROL BUTTONS
let plyrMove = (e) => {
    if (e.keyCode === 68) { // RIGHT - D
        moveR();
    } else if (e.keyCode === 65) { // LEFT - A
        moveL();
    } else if (e.keyCode === 87) { // UP - W
        moveU();
    } else if (e.keyCode === 83) { // DOWN - S
        moveD();
    }
   
}
window.addEventListener('keydown', plyrMove)

// PLAYER START GAME BUTTON
let startGameBttn = (e) => {
    if (e.key === 'Enter') {
       // Starts the timer that controls the speed of the cars
       speedUp();
       // Starts the cpu cars
       startsGameTimerCountdown(speed);
       // Deactivate buttons
       window.removeEventListener('keyup', startGameBttn)
       // Show sidelines
       sidelineLeft.style.display = 'unset';
       sidelineRight.style.display = 'unset';
       // Hides Start Game
       startGame.style.display = 'none';
    } 
   
}
window.addEventListener('keyup', startGameBttn)

// PLAYER RESET GAME BUTTON
let resetGameBttn = (e) => {
    if (e.key === 'Enter') {
       window.location.reload();
       // Deactivate buttons
       window.removeEventListener('keyup', resetGameBttn);
    } 
   
}



                   // CPU SINGLE CAR

// Global Initial CPU animation speed
let speed = 100;

// Creates ONE cpu car
function cpuCarCreator() {
   // Create the new car
   let cpuCar = document.createElement('div'); // Create element DIV
   cpuCar.classList.add('cpu-car'); // Add class
   cpuCar.innerText = 10; // Adds the number to the car
   cpuCarsContainer.appendChild(cpuCar); // Add it to the container DIV
   
   // Car top position
   let Top = -120;
   
   // Random number
   function rndmNum() {
    return Math.floor(Math.random() * 4);
   }
   
   // RANDOMIZE CAR LEFT POSITION
   let rndmPstnArray = [];
   for (let i = 30; i < 450; i += 120) {
        rndmPstnArray.push(i);
   }
   
   let rndmPstn = rndmPstnArray[rndmNum()];   
   // Cpu car position
   cpuCar.style.top = Top + 'px';
   cpuCar.style.left = rndmPstn + 'px';

   
               // ANIMATION
   speed;
   var id='';
   animateCar()
   function animateCar() {
    
       id = setInterval(frame, speed);

      function frame() {
        if (Top < 550) {
            Top += 30
            cpuCar.style.top = +Top + 'px';
        } else {
            clearInterval(id);
            // Reset the car position
            Top = -120;
            // Remove the car
            cpuCar.remove();
        }
         collision(id)
         ptsCounter()
      }
   }
}


            // CPU TWO CARS


function cpuCarCreatorTwo() {
   // Create a new car
   let cpuCar = document.createElement('div'); // Create element DIV
   cpuCar.classList.add('cpu-car'); // Add class
   cpuCar.innerText = 20; // Adds the number to the car
   cpuCarsContainer.appendChild(cpuCar); // Add it to the container DIV

   // Create new car two
   let cpuCarTwo = document.createElement('div'); // Create element DIV
   cpuCarTwo.classList.add('cpu-car'); // Add class
   cpuCarTwo.innerText = 30; // Adds the number to the car
   cpuCarsContainer.appendChild(cpuCarTwo); // Add it to the container DIV
   
   // RANDOMIZE CAR LEFT POSITIONS
   let rndmNum = Math.floor(Math.random() * 6)

   if (rndmNum <= 0) {
      cpuCar.style.left = 30 + 'px';
      cpuCarTwo.style.left = 150 + 'px';
   } else if (rndmNum <= 1) {
      cpuCar.style.left = 150 + 'px';
      cpuCarTwo.style.left = 270 + 'px';
   } else if (rndmNum <= 2) {
      cpuCar.style.left = 270 + 'px';
      cpuCarTwo.style.left = 390 + 'px';
   } else if (rndmNum <= 3) {
      cpuCar.style.left = 30 + 'px';
      cpuCarTwo.style.left = 270 + 'px';
   } else if (rndmNum <= 4) {
      cpuCar.style.left = 150 + 'px';
      cpuCarTwo.style.left = 390 + 'px';
   } else if (rndmNum <= 5) {
      cpuCar.style.left = 30 + 'px';
      cpuCarTwo.style.left = 390 + 'px';
   }

               // ANIMATION

   // Car top position
   let Top = -120;
   
   cpuCar.style.top = Top + 'px';
   cpuCarTwo.style.top = Top + 'px';
   
   
   speed;
   var id='';
   animateCar()
   function animateCar() {
    
       id = setInterval(frame, speed);

      function frame() {
        if (Top < 550) {
            Top += 30
            cpuCar.style.top = +Top + 'px';
            cpuCarTwo.style.top = +Top + 'px';
        } else {
            clearInterval(id);
            // Reset the car position
            Top = -120;
            // Remove the car
            cpuCar.remove();
            cpuCarTwo.remove();
        }
         collision(id)
         ptsCounter()
      }
   }
}


                // CPU THREE CARS


function cpuCarCreatorThree() {
   // Create a new car
   let cpuCar = document.createElement('div'); // Create element DIV
   cpuCar.classList.add('cpu-car'); // Add class
   cpuCar.innerText = 40; // Adds the number to the car
   cpuCarsContainer.append(cpuCar); // Add it to the container DIV

   // Create a new car two
   let cpuCarTwo = document.createElement('div'); // Create element DIV
   cpuCarTwo.classList.add('cpu-car'); // Add class
   cpuCarTwo.innerText = 50; // Adds the number to the car
   cpuCarsContainer.append(cpuCarTwo); // Add it to the container DIV

   // Create a new car three
   let cpuCarThree = document.createElement('div'); // Create element DIV
   cpuCarThree.classList.add('cpu-car'); // Add class
   cpuCarThree.innerText = 60; // Adds the number to the car
   cpuCarsContainer.append(cpuCarThree); // Add it to the container    
   
   // RANDOMIZE CAR LEFT POSITIONS
   let rndmNum = Math.floor(Math.random() * 4)

   if (rndmNum <= 0) {
      cpuCar.style.left = 30 + 'px';
      cpuCarTwo.style.left = 150 + 'px';
      cpuCarThree.style.left = 270 + 'px';
   } else if (rndmNum <= 1) {
      cpuCar.style.left = 150 + 'px';
      cpuCarTwo.style.left = 270 + 'px';
      cpuCarThree.style.left = 390 + 'px';
   } else if (rndmNum <= 2) {
      cpuCar.style.left = 30 + 'px';
      cpuCarTwo.style.left = 150 + 'px';
      cpuCarThree.style.left = 390 + 'px';
   } else if (rndmNum <= 3) {
      cpuCar.style.left = 30 + 'px';
      cpuCarTwo.style.left = 270 + 'px';
      cpuCarThree.style.left = 390 + 'px';
   }

   
               // ANIMATION
   
   // Car top position
   let Top = -120;

   cpuCar.style.top = Top + 'px';
   cpuCarTwo.style.top = Top + 'px';
   cpuCarThree.style.top = Top + 'px';

   speed;
   var id='';
   animateCar()
   function animateCar() {
    
       id = setInterval(frame, speed);

      function frame() {
        if (Top < 580) {
            Top += 30
            cpuCar.style.top = +Top + 'px';
            cpuCarTwo.style.top = +Top + 'px';
            cpuCarThree.style.top = +Top + 'px';
        } else {
            clearInterval(id);
            // Reset the car position
            Top = -120;
            // Remove the car
            cpuCar.remove();
            cpuCarTwo.remove();
            cpuCarThree.remove();
        }
         collision(id)
         ptsCounter()
      }
   }
}


                  // GAMEPLAY


// Timer speed reference
let timerSpeed = 1000;
// SpeedUp Timer
let timer;

function speedUp() {
    // Changes the speed every 10sec
    timer = setTimeout(speedTimer, 2000)
    function speedTimer() {
       // Substracts 2 to the car animation speed every 2 sec 
       speed -= 2;
        // Substracts 20 to the timer every 2 sec 
        timerSpeed -= 16
       // Restars the speedUp function 
        resetTimer()
    }
}

function resetTimer() {
        clearTimeout(timer);
        speedUp();
}

// If speed = 90  Timer = 900, and so on
let timeout = '';

function startsGameTimerCountdown(speed) {
   // Show player car
   plyrOne.style.display = 'unset';
   // Car speed reference
   speed;
   
   timeout = setTimeout(runThis, timerSpeed); 
   function runThis() {
      // Assigns how many cars at every speed
      if (speed > 85) {
         // One Car
         cpuCarCreator()
         resetCountdown();
      } else if (speed > 70) {
         // Two Cars
         cpuCarCreatorTwo()
         resetCountdown();
      } else if (speed > 55) {
         // Three Cars
         cpuCarCreatorThree()
         resetCountdown();
      } else {
         // RANDOM SELECT
         function rndmNmbr() {
         return Math.floor(Math.random() * 100)}
            
            if (rndmNmbr() > 60) { // 40%
               // Two Cars
               cpuCarCreatorTwo()
               resetCountdown();
            } else if (rndmNmbr() > 20) { // 40%
               // Three Cars
               cpuCarCreatorThree()
               resetCountdown();
            } else { // 20%
               // One car
               cpuCarCreator()
               resetCountdown();
            }
      }
   }
}

// Resets The Count
function resetCountdown() {
// Clears the timer to 0 
    clearTimeout(timeout);
// Restarts the timer
    startsGameTimerCountdown(speed);
}


                  // COLLISION DETECTION


function collision(id) {
   // I passed the ID value of every animation function...
   //... through the collision argument id to send the information...
   //... so i can stop the animation when cars collide.
   var id;
   // To stop timer that launches cars
   timeout;
   // To stop speed level timer
   timer;
   
   let cpuCars = document.querySelectorAll('.cpu-car');
   
   cpuCars.forEach(cpuCar => {
      
   if ((cpuCar.getBoundingClientRect().bottom - 30) > plyrOne.getBoundingClientRect().top &&
       cpuCar.getBoundingClientRect().x == plyrOne.getBoundingClientRect().x &&
       cpuCar.getBoundingClientRect().top < plyrOne.getBoundingClientRect().bottom) {
       
      // Stops cars animation
      clearInterval(id);
      // Stops launching cars
      clearTimeout(timeout);
      // Stops speed level timer
      clearTimeout(timer);

      // Remove the player movement
      window.removeEventListener('keydown', plyrMove);
      // Hides player car // With none display it doesnt stop the cpu animation
      plyrOne.style.background = 'none';
      // Shows the explossion animation
      crashAnimation.style.display = 'unset';
      // Show stoped sidelines
      sidelineStopL.style.display = 'unset';
      sidelineStopR.style.display = 'unset';
      // Hide animated sidelines
      sidelineLeft.style.display = 'none';
      sidelineRight.style.display = 'none';
      // Shows game over
      gameOver.style.display = 'flex'

      
      // Adds the reset button
      window.addEventListener('keyup', resetGameBttn);

      
      }
   })
}


                     // SCORE COUNTER


function ptsCounter() {

   let cpuCars = document.querySelectorAll('.cpu-car');
   
   cpuCars.forEach(cpuCar => {
      
   if (cpuCar.getBoundingClientRect().y > plyrOne.getBoundingClientRect().y) {
       // Run this code
      score.innerText++;
      }
   })

   
   // SAVE THE HI-SCORE
   if (+score.innerText > +hiScore.innerText) {
      // Saves the score
      localStorage.setItem('super-street-racer-hi-score', score.innerText);
   }

   
   // LEVEL COUNTER
   if (speed > 85) {
       level.innerText = 0
      } else if (speed > 70) {
        level.innerText = 1 
      } else if (speed > 55) {
         level.innerText = 2
      } else if (speed > 40) {
         level.innerText = 3
      } else if (speed > 30) {
         level.innerText = 4 
      } else if (speed > 20) {
         level.innerText = 5
      } else {
         level.innerText = 6
      } 
}

hiScore.innerText = +localStorage.getItem('super-street-racer-hi-score');


