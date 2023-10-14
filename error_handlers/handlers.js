const errorLogger = function (err, req, res, next) {
  date = new Date();
  console.log("DateTimeOfError ", date);
  console.log(err);
  next(err);
};

const errorResponder = function (err, req, res, next) {
  const status = err.status || 400;
  res.status(status).send(err.message);
};

const invalidPathHandler = function (req, res, next) {
  res.status = 404;
  res.send("Invalid path");
};

module.exports = [errorLogger, errorResponder, invalidPathHandler];
