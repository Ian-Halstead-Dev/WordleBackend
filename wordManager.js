const wordData = require("./words.js");

let currentWord = "";

generateNewWord = () => {
  currentWord =
    wordData.possibleAnswers[
      Math.floor(Math.random() * wordData.possibleAnswers.length)
    ];
};

getWord = () => wordData.possibleAnswers.indexOf(currentWord);

getWordById = (id) => wordData.possibleAnswers[id];

module.exports = {
  currentWord,
  generateNewWord,
  getWord,
  getWordById,
};
