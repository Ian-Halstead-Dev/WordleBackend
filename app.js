const express = require("express");
const { generateNewWord } = require("./wordManager.js");
const app = express();
const wordRouter = require("./Routers/word.router.js");
const userRouter = require("./Routers/user.router.js");

const connectToDb = require("./db/mongoose.js");

let dbError = connectToDb();

if (dbError === "error") {
  console.log("DB ERROR");
}

const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use(wordRouter);
app.use("/users", userRouter);

require("./cron.js").start;

const server = require("http").createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New Websocket Connection: " + socket.id);

  socket.on("test", () => {
    console.log("test");
  });
});

const port = 5502;

server.listen(port, function () {
  generateNewWord();
  console.log(`Listening on port ${port}`);
});
