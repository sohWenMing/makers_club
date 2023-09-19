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

app.use(express.static(path.join(__dirname, "public")));

require("./routes")(app)
// app.get("/", (req, res) => {
//   //   res.render("home");
//   res.render("home", { currentPage: "home" });
// });

// app.get("/chickens", (req, res) => {
//   res.send("ok man i hear chickens");
// });
