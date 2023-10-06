const fs = require("fs");

function prepBlobData(path) {
  const data = fs.readFileSync(path);
  return data;
}

module.exports = prepBlobData;
