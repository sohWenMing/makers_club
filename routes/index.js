const homeRoutes = require("./homeRoutes");
const testRoutes = require("./testRoutes");
const sqlRoutes = require("./sqlRoutes");
const adminRoutes = require("./adminRoutes");

module.exports = function (app) {
  app.use("/", testRoutes, homeRoutes, sqlRoutes, adminRoutes);
};
