const homeRoutes = require("./homeRoutes");
const testRoutes = require("./testRoutes");

module.exports = function (app) {
  // app.use("/test", (req, res) => {
  //     res.send("getting something from test.")
  // });
  app.use("/", testRoutes, homeRoutes);
  //   app.use("/", homeRoutes);
};
