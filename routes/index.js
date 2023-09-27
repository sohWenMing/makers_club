const homeRoutes = require("./homeRoutes");
const adminRoutes = require("./adminRoutes");

module.exports = function (app) {
  app.use("/", homeRoutes, adminRoutes);
};
