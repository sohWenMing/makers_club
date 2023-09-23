const express = require("express");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
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
