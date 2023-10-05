const express = require("express");
const session = require("express-session");
const app = express();
const { exec } = require("child_process");
const redisServer = exec("redis-server");
require("dotenv").config();

const RedisStore = require("connect-redis").default;
const redis = require("redis");

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379, // Default Redis port
});

redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "makers_club",
});
const maxAge = 30 * 60 * 1000;

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESS_SECRET,
    maxAge: maxAge,
  })
);

const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const port = 3000;

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
