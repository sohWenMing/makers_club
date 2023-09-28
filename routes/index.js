const homeRoutes = require("./homeRoutes");
const loginRoutes = require("./loginRoutes");

module.exports = function (app) {
  app.use("/", homeRoutes);
  app.use("/login", loginRoutes);
};
