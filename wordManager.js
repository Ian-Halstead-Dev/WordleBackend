const wordData = require("./words.js");

let currentWord = "";

generateNewWord = () => {
  currentWord = getWordById(getRandomWord());
};

getRandomWord = () => {
  return Math.floor(Math.random() * wordData.possibleAnswers.length);
};

getWord = () => wordData.possibleAnswers.indexOf(currentWord);

getWordById = (id) => wordData.possibleAnswers[id];

module.exports = {
  currentWord,
  generateNewWord,
  getWord,
  getWordById,
  getRandomWord,
};
