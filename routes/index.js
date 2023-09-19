const homeRoutes = require("./home");

module.exports = function(app) {
    app.use("/", homeRoutes);
}
