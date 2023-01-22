let target = generateRandomFourDigitNumber();
let guess;
let bulls = 0;
let cows = 0;
let attempts = 5;
let turns = 0;
console.log(target);
console.log("быки и коровы");

let levelSelect = document.getElementById("level");
let guessInput = document.getElementById("guess-input");
let submitBtn = document.getElementById("submit-guess");
let resultDiv = document.getElementById("result");
let turnsBody = document.getElementById("turns-body");

levelSelect.addEventListener("change", function () {
  if (levelSelect.value === "1") {
    attempts = 5;
  } else if (levelSelect.value === "2") {
    attempts = 4;
  } else if (levelSelect.value === "3") {
    attempts = 3;
  }
});

submitBtn.addEventListener("click", function () {
  if (attempts === 0) {
    resultDiv.innerHTML = "у тебя кончились попытки. игра окончена.";
    return;
  }

  guess = guessInput.value;

  if (!isValidGuess(guess)) {
    resultDiv.innerHTML =
      "Invalid guess. введи 4х значное число, в котором 1 значные числа не повторяются";
    return;
  }

  bulls = countBulls(target, guess);
  cows = countCows(target, guess);

  turns++;
  attempts--;
  console.log(`ход: ${turns}`);
  console.log(`быки: ${bulls}, коровы: ${cows - bulls}`);
  console.log(`попыток осталось: ${attempts}`);
  resultDiv.innerHTML = `попыток осталось: ${attempts}`;
  guessInput.value = "";

  let row = document.createElement("tr");
  let turnCell = document.createElement("td");
  let guessCell = document.createElement("td");
  let bullsCell = document.createElement("td");
  let cowsCell = document.createElement("td");
  turnCell.innerHTML = turns;
  guessCell.innerHTML = guess;
  bullsCell.innerHTML = bulls;
  cowsCell.innerHTML = cows - bulls;
  row.appendChild(turnCell);
  row.appendChild(guessCell);
  row.appendChild(bullsCell);
  row.appendChild(cowsCell);
  turnsBody.appendChild(row);

  if (bulls === 4) {
    resultDiv.innerHTML = "маладец игру выиграл.";
  }
});

const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", function () {
  target = generateRandomFourDigitNumber();
  guess = 0;
  bulls = 0;
  cows = 0;
  attempts = 5;
  turns = 0;
  document.getElementById("level").selectedIndex = 0;
  document.getElementById("guess-input").value = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("turns-body").innerHTML = "";
  console.log("игра перезапущена");
  console.log(target);
});

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
