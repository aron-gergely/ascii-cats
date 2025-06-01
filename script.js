const cats = [
`      |\\      _,,,---,,_
ZZZzz /,\\\`.-'\\\`'    -.  ;-;;,_
     |,4-  ) )-,_. ,\\\\ (  \\\`'-'
    '---''(_/--'  \\\`-\'\\\\_)  `,
` _._     _,-'""\`-._
(,-.\\\`._,'(       |\\\\\`-/|
    \\\`-.-' \\\\ )-\`( , o o)
          \\\`-    \\\\\\\_\\\`"'-`,
` |\\\\__/,|   (\\\\\`
 |_ _  |.--.) )
 ( T   )     /
(((^_(((/(((_/`,
`  /\\\\_/\\\\  (
 ( ^.^ ) _)
   \\"/  (
 ( | | )
(__d b__)`,
`    /\\\\_____/\\\\
   /  o   o  \\\\
  ( ==  ^  == )
   )         (
  (           )
 ( (  )   (  ) )
(__(__)___(__)__)`,
`  /\\\\ ___ /\\\\
 (  o   o  ) 
  \\\\  >#<  /
  /       \\\\  
 /         \\\\       ^
|           |     //
 \\\\         /    //
  ///  ///   --`,
` /\\\\     /\\\\
{  \\\`---'  }
{  O   O  }
~~>  V  <~~
 \\\\  \\\\|/  /
  \\\`-----'____
  /     \\\\    \\\\_
 {       }\\\\  )_\\\\_   _
 |  \\\\_/  |/ /  \\\\_\\\\_/ )
  \\\\__/  /(_/     \\\\__/
    (__/`,
`  ,-.       _,---._ __  / \\\\
 /  )    .-'       \`./ /   \\\\
(  (   ,'            \`/    /|
 \\\\  \`-"             \\'\\\   / |
  \\\`.              ,  \\\\ \\\\ /  |
   /\\\\\`.          ,'-\`----Y   |
  (            ;        |   '
  |  ,-.    ,-'         |  /
  |  | (   |            | /
  )  |  \\\\  \\\`.___________|/
  \\\`--'   \\\`--'`,
`     _ 
    / ) 
   / /  
  / /               /\\\\ 
 / /     .-\\\\\`\\\\\`\\\\\`-.   / ^\`-.  
 \\\\ \\\\    /       \\\\_/  (|) \\\`o 
  \\\\ \\\\  /   .-.   \\\\ _  ,--' 
   \\\\ \\/   /   )   \\\\( \\\`^^^  
    \\\\   \\\\/    (    )  
     \\\\   )     )  /     
      ) /__    | (__  
     (___)))   (__)))`,
`      \\\\    /\\\\
       )  ( ')
      (  /  )
       \\\\(__)|`,
`|\\__/,|   (\\\`
_.|o o  |_   ) )
-(((---(((--------`,
` /\\\\_/\\\\
( o.o )
 > ^ <`,
` ^~^  ,
('Y') )
/   \\\\/ 
(\\|||/)`,
`.       .
|\\_---_/|
/   o_o   \\\\
|    U    |
\\  ._I_.  /
 \`-_____-'`
];

const fartSound = new Audio('sounds/fart.mp3');
const purrSound = new Audio('sounds/purr.mp3');
const meowSound = new Audio('sounds/meow.mp3');
const hissSound = new Audio('sounds/hiss.mp3');

const emptyPlate = `
   _________
  | _______ |
 / \\         \\
/___\\_________\\
|   | \\       |
|   |  \\      |
|   |   \\     |
|   | M  \\    |
|   |     \\   |
|   |\\  I  \\  |
|   | \\     \\ |
|   |  \\  L  \\|
|   |   \\     |
|   |    \\  K |
|   |     \\   |
|   |      \\  |
|___|_______\\_|`;

const fullPlate = `
   _________
  | ~~~~~~~ |
 / \\         \\
/___\\_________\\
|   | \\       |
|   |  \\      |
|   |   \\     |
|   | ~  \\    |
|   |     \\   |
|   |\\  ~  \\  |
|   | \\     \\ |
|   |  \\  ~  \\|
|   |   \\     |
|   |    \\  ~ |
|   |     \\   |
|   |      \\  |
|___|_______\\_|`;

const catContainer = document.getElementById('cat-container');
const foodContainer = document.getElementById('food-container');
const changeCatBtn = document.getElementById('change-cat-btn');

let isPurring = false;
let catClickable = true;

// Shuffle helper function
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Create a shuffled array of cat indices
const catOrder = shuffle(cats.map((_, i) => i));
let currentCatIndex = 0;

// Pad cat so bottom aligns with plate
function padCatToPlate(catStr, plateStr) {
  const catLines = catStr.split('\n').length;
  const plateLines = plateStr.split('\n').length;
  const padLines = Math.max(0, plateLines - catLines);
  return '\n'.repeat(padLines) + catStr;
}

// Show cat and plate
function showCatAndPlate() {
  catContainer.textContent = padCatToPlate(cats[catOrder[currentCatIndex]], emptyPlate);
  foodContainer.textContent = emptyPlate;
}

// Initial display
showCatAndPlate();

// Change cat button logic: show next cat in shuffled order, loop to start
changeCatBtn.addEventListener('click', () => {
  currentCatIndex = (currentCatIndex + 1) % catOrder.length;
  showCatAndPlate();
});

// Pulsate effect when purring
const pulsateClass = 'pulsate-magenta';

// Plate click logic: purring + pulsate + sounds
foodContainer.addEventListener('click', () => {
  if (isPurring) return;

  isPurring = true;
  foodContainer.textContent = fullPlate;

  purrSound.currentTime = 0;
  purrSound.play();

  // Add pulsate effect to cat after 1s delay
  setTimeout(() => {
    catContainer.classList.add(pulsateClass);
  }, 1000);

  setTimeout(() => {
    purrSound.pause();
    purrSound.currentTime = 0;
    foodContainer.textContent = emptyPlate;
    isPurring = false;

    catContainer.classList.remove(pulsateClass);

    if (Math.random() < 0.3) {
      fartSound.currentTime = 0;
      fartSound.play();
    }
  }, 10000);
});

// Cat click logic: meow or hiss
catContainer.addEventListener('click', () => {
  if (!catClickable) return;

  catClickable = false;

  const sound = Math.random() < 0.1 ? hissSound : meowSound;
  sound.currentTime = 0;
  sound.play().catch(err => console.error("Sound error:", err));

  sound.onended = () => {
    catClickable = true;
  };
});
