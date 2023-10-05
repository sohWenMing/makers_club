const express = require("express");
const session = require("express-session");
// const RedisStore = require("connect-redis")(session);
// const redis = require("redis");
const app = express();
require("dotenv").config();

console.log(session);
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
// const app = express();
const port = 3000;
// const { exec } = require("child_process");
// //child process is a module that is used to execute actions outside of the script//

// const redisServer = exec("redis-server");
// //this works assuming that redis-server is already in the system's PATH. after running this, the server is going

// const redis = require("redis");
// const redisClient = redis.createClient({
//   port: 6379,
//   host: "localhost",
// });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routes/index")(app);

app.use((req, res) => {
  res.send("Page not found");
});

app.listen(port, () => {
  console.log(`We are getting something on port ${port}`);
});
