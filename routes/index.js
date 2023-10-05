const homeRoutes = require("./homeRoutes");
const loginRoutes = require("./loginRoutes");
const testRoutes = require("./testRoutes");

module.exports = function (app) {
  app.use("/", homeRoutes);
  app.use("/login", loginRoutes);
  app.use("/testroutes", testRoutes);
};
