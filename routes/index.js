const homeRoutes = require("./homeRoutes");
const loginRoutes = require("./loginRoutes");
const testRoutes = require("./testRoutes");
const adminRoutes = require("./adminRoutes");

module.exports = function (app) {
  app.use("/", homeRoutes);
  app.use("/login", loginRoutes);
  app.use("/testroutes", testRoutes);
  app.use("/admin", adminRoutes);
};
