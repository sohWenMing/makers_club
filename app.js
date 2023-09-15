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

app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use("/styles", express.static(path.join(__dirname, "styles")));
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

app.get("/", (req, res) => {
  //   res.render("index");
  res.render("index");
});

app.get("/chickens", (req, res) => {
  res.send("ok man i hear chickens");
});
