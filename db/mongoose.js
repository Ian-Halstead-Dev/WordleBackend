const mongoose = require("mongoose");
const dotenv = require("dotenv");
const chalk = require("chalk");

dotenv.config();

const connectionUrl = process.env.DBNAME;

const connectToDb = () => {
  if (connectionUrl === undefined) {
    console.log(chalk.bgRed("Db Connection Error"));
    return "error";
  }
  mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDb;
