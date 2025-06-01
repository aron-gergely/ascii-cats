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
let currentCatIndex = Math.floor(Math.random() * cats.length);

function padCatToPlate(catStr, plateStr) {
  const catLines = catStr.split('\n').length;
  const plateLines = plateStr.split('\n').length;
  const padLines = Math.max(0, plateLines - catLines);
  return '\n'.repeat(padLines) + catStr;
}

function showCatAndPlate() {
  catContainer.textContent = padCatToPlate(cats[currentCatIndex], emptyPlate);
  foodContainer.textContent = emptyPlate;
}
showCatAndPlate();

const pulsateClass = 'pulsate-magenta';

changeCatBtn.addEventListener('click', () => {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * cats.length);
  } while (newIndex === currentCatIndex);
  currentCatIndex = newIndex;
  showCatAndPlate();
});

foodContainer.addEventListener('click', () => {
  if (isPurring) return;
  isPurring = true;
  foodContainer.textContent = fullPlate;
  purrSound.currentTime = 0;
  purrSound.play();

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


// NEW: Cat click logic with multi-click detection and hiss muting meow

let clickTimes = [];
let isHissing = false;

catContainer.addEventListener('click', () => {
  const now = Date.now();

  // Remove clicks older than 1 second
  clickTimes = clickTimes.filter(t => now - t < 1000);
  clickTimes.push(now);

  if (isHissing) {
    // Currently hissing, ignore meow clicks
    return;
  }

  if (clickTimes.length >= 3) {
    // Play hiss sound and mute meow while hissing
    isHissing = true;
    hissSound.currentTime = 0;
    hissSound.play();

    clickTimes = [];

    hissSound.onended = () => {
      isHissing = false;
    };
  } else {
    // Play a new meow sound instance for overlapping sounds
    const meowInstance = new Audio('sounds/meow.mp3');
    meowInstance.play().catch(err => console.error("Sound play error:", err));
  }
});
