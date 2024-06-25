  const inputs = document.querySelector(".inputs");
  let matchCount = 0;
  let correct = [];
  let incorrect = []
  // console.log(inputs);
  const resetBtn = document.querySelector(".reset-btn");
  const hint = document.querySelector(".hint span");
  const typingInput = document.querySelector(".typing-input");
  let WrongLetter = document.querySelector(".wrong-letter span");
  let GuessRemaining = document.querySelector(".guess-left span");
  let word, html, maxguesses;
  function randomWord() {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;
    maxguesses = 4;
    correct = [];
    incorrect = []
    // console.log(ranObj);
    hint.innerText = ranObj.hint;
    GuessRemaining.innerText = maxguesses
    WrongLetter.innerText = incorrect
    html = "";
    for (let i = 0; i < word.length; i++) {
      html += `<input type="text" disabled />`;
    }
    inputs.innerHTML = html;
  }

  randomWord();
  function initGame(e) {

    let key = e.target.value;
    if (key.match(/^[A-Za-z]+$/) && !incorrect.includes(key) && !correct.includes(key)) {
      // console.log(key);

      if (word.includes(key)) {
        let inpArray = inputs.querySelectorAll("input");
        matchCount++;
        console.log(matchCount);
        console.log("letter matched");
        correct.push(key);
        for (let i = 0; i < word.length; i++) {
          if (word[i] == key) {
            inpArray[i].value = key;
          }
        }
      } else {
        incorrect.push(key)
        maxguesses--
        //   console.log("letter not found");

      }

      GuessRemaining.innerText = maxguesses
      WrongLetter.innerText = incorrect

    }
    typingInput.value = ""
    setTimeout(() => {

      if (correct.length === word.length) {
        alert(`Congrats you won ! The word was ${word.toUpperCase()}`)
        randomWord();

      }
      else if (maxguesses < 1) {
        alert("0 guesses are remaining !")
        // show all the letters if 0 guesses are remaining
        for (let i = 0; i < word.length; i++) {
          inputs.querySelectorAll("input")[i].value = word[i]

        }
      }
    }, 1500);
  }
  resetBtn.addEventListener("click", () => {
    randomWord();
  });
  document.addEventListener("keydown", () => {
    typingInput.focus();
  });
  typingInput.addEventListener("input", (e) => {
    initGame(e);
  });