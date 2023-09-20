const homeRoutes = require("./homeRoutes");
const testRoutes = require("./testRoutes")

module.exports = function(app) {
    // app.use("/test", (req, res) => {
    //     res.send("getting something from test.")
    // });
    app.use("/test", testRoutes);
    app.use("/", homeRoutes);
    app.use("/test2", (req, res) => {
        res.send("getting something from test 2")
    })
}
