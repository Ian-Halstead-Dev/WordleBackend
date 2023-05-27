const CronJob = require("cron").CronJob;
const wordManager = require("./wordManager");
let job = new CronJob(
  "0 0 * * *",
  () => {
    wordManager.generateNewWord();
    console.log("New word generated: " + wordManager.getWord());
    let dateObj = new Date();
    let date = {
      sec: dateObj.getSeconds(),
      min: dateObj.getMinutes(),
      hour: dateObj.getHours(),
    };
    console.log("Current Time: " + date.hour + ":" + date.min + ":" + date.sec);
  },
  null,
  true,
  "America/Chicago"
);

module.exports = job;
