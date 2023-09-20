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
require("./routes")(app);
app.use("/", (res, req) => {
  res.send("getting something from /");
});

// app.get("/test", (req, res) => {
//   res.send("getting something from test");
// })

// app.get("/chickens", (req, res) => {
//   res.send("ok man i hear chickens");
// });
