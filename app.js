const express = require("express");
const { possibleAnswers, possibleGuesses } = require("./words.js");
const { generateNewWord, getWord, getWordById } = require("./wordManager.js");
const app = express();

app.get("/wordInList", (req, res) => {
  word = req.query.word;

  if (possibleAnswers.includes(word) || possibleGuesses.includes(word)) {
    res.status(200).send({ wordInList: true });
  } else {
    res.status(200).send({ wordInList: false });
  }
});

app.get("/currentWord", (req, res) => {
  res.status(200).send({ word: getWord() });
});

app.get("/compareWord", (req, res) => {
  let arr = [];

  let wordToCompare = getWordById(req.query.id);
  let guess = req.query.guess;

  if (guess.length != 5) {
    return res.status(400).send({ e: "Word must be exactly 5 letters long" });
  }

  if (!(possibleAnswers.includes(guess) || possibleGuesses.includes(guess))) {
    return res.status(400).send({ e: "Guess must be a word" });
  }

  let adjustedWord = wordToCompare.split("");
  let adjustedGuess = guess.split("");

  let hash = {};
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === wordToCompare[i]) {
      arr[i] = 2;
      delete adjustedWord[i];
      delete adjustedGuess[i];
    } else {
      arr[i] = 0;
      if (!hash[adjustedWord[i]]) {
        hash[adjustedWord[i]] = 0;
      }
      hash[adjustedWord[i]]++;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (adjustedGuess[i] == undefined) continue;

    if (hash[adjustedGuess[i]] > 0) {
      arr[i] = 1;
      hash[adjustedGuess[i]]--;
    }
  }

  res.status(200).send({ comparedList: arr });
});

const port = 5500;

app.listen(port, () => {
  generateNewWord();
  console.log(`Listening on port ${port}`);
});
