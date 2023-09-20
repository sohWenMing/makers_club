const homeRoutes = require("./homeRoutes");
const testRoutes = require("./testRoutes");

module.exports = function (app) {
  app.use("/", testRoutes, homeRoutes);
};
