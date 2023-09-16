const express = require("express");
const path = require("path");
const ejs = require("ejs");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`We are getting something on port ${port}`);
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/styles", express.static(path.join(__dirname, "styles")));
app.use("/scripts", express.static(path.join(__dirname, "scripts")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  //   res.render("index");
  res.render("index");
});

app.get("/chickens", (req, res) => {
  res.send("ok man i hear chickens");
});
