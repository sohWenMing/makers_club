const homeRoutes = require("./homeRoutes");
const testRoutes = require("./testRoutes");
const sqlRoutes = require("./sqlRoutes");

module.exports = function (app) {
  app.use("/", testRoutes, homeRoutes, sqlRoutes);
};
