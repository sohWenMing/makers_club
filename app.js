const express = require("express");
const session = require("express-session");
const app = express();
const { exec } = require("child_process");
//child process is used to execute executables in the background - in this case is executing the "redis-server executable to startup redis-server on localhost for development purposes"
const redisServer = exec("redis-server");

require("dotenv").config();

const RedisStore = require("connect-redis").default;
const redis = require("redis");

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});
//creates a redisClient to connect the the redis-server instance that was started up before. localhost:6379 is the default server configuation

redisClient.connect().catch(console.error);

//

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "makers_club",
});
//this of a each store like an instance of a db

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

const [errorLogger, errorResponder, invalidPathHandler] = require("./error_handlers/handlers");

const multer = require("multer");
const upload = multer({ dest: "./public/resources/uploaded" });

const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(
  express.static(path.join(__dirname, "helper_functions"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.set("Content-Type", "application/javascript");
      }
    },
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routes/index")(app);

app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

app.listen(port, () => {
  console.log(`We are getting something on port ${port}`);
});
