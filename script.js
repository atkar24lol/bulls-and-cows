let target = generateRandomFourDigitNumber();
let guess;
let bulls = 0;
let cows = 0;
let attempts = 0;
let turns = 0;
console.log(target);
console.log("игра быки и коровы");

let level = prompt("введи уровень сложности от 1 до 3");

if (level === "1") {
  attempts = 5;
} else if (level === "2") {
  attempts = 4;
} else if (level === "3") {
  attempts = 3;
}

while (bulls < 4) {
  if (attempts === 0) {
    console.log("у вас кончились ходы");
    break;
  }
  guess = prompt("введи 4-х значное число");

  if (!isValidGuess(guess)) {
    console.log(
      "Invalid guess. введи 4 значное число в котором однозначные числа не повторяются"
    );
    continue;
  }

  bulls = countBulls(target, guess);
  cows = countCows(target, guess);

  turns++;
  attempts--;
  console.log(`Ход: ${turns}`);
  console.log(`быки: ${bulls}, коровы: ${cows}`);
  console.log(`попыток осталось: ${attempts}`);
}

if (bulls === 4) {
  console.log("маладец игру выиграл");
}

function generateRandomFourDigitNumber() {
  let num;
  do {
    num = Math.floor(Math.random() * 9000) + 1000;
  } while (hasDuplicateDigits(num));
  return num;
}

function isValidGuess(guess) {
  if (guess.length !== 4 || isNaN(guess) || hasDuplicateDigits(guess)) {
    return false;
  }
  return true;
}

function countBulls(target, guess) {
  let bulls = 0;
  target = target.toString();
  for (let i = 0; i < 4; i++) {
    if (target[i] === guess[i]) {
      bulls++;
    }
  }
  return bulls;
}

function countCows(target, guess) {
  let cows = 0;
  for (let i = 0; i < 4; i++) {
    if (target.toString().indexOf(guess[i]) !== -1 && target[i] !== guess[i]) {
      cows++;
    }
  }
  return cows;
}

function hasDuplicateDigits(num) {
  let digits = num.toString().split("");
  return new Set(digits).size !== digits.length;
}
