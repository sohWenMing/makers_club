const homeRoutes = require("./homeRoutes");
const loginRoutes = require("./loginRoutes");
const testRoutes = require("./testRoutes");
const adminRoutes = require("./adminRoutes");
const playmakersRoutes = require("./playmakerRoutes")

module.exports = function (app) {
  app.use("/", homeRoutes);
  app.use("/login", loginRoutes);
  app.use("/testroutes", testRoutes);
  app.use("/admin", adminRoutes);
  app.use("/playmakers", playmakersRoutes);
};
