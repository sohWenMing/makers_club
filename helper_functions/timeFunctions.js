function getISOString(dateString) {
  const singaporeDateString = dateString;
  const UTCDateTime = new Date(singaporeDateString);
  const UTCString = UTCDateTime.toISOString();
  return UTCString;
}

module.exports = {
  getISOString,
};
