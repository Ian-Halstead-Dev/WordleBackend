const fs = require("fs");

let file = "./words.js";
var allLines = fs.readFileSync(file).toString().split("\n");
fs.writeFileSync(file, "", function () {
  console.log("file is empty");
});
let useCount = false;
let count = 0;
allLines.forEach(function (line, i) {
  line = line.trim();
  line = line.substring(0, line.length - 1);
  if (line.length !== 7) {
    console.log(line);
    useCount = true;
  }
  let newLine;
  if (!useCount) {
    newLine = `possibleAnswers.set(${i}, ${line}),`;
  } else {
    newLine = `possibleGuesses.set(${count}, ${line}),`;
    count++;
  }
  fs.appendFileSync(file, newLine.toString() + "\n");
});

allLines = fs.readFileSync(file).toString().split("\n");
