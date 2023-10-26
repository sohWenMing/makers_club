function getISOString(dateString) {
  const singaporeDateString = dateString;
  const UTCDateTime = new Date(singaporeDateString);
  const UTCString = UTCDateTime.toISOString();
  return UTCString;
}

export function generateDateString(data) {
  const dateData = data;
  const date = new Date(dateData);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const dateString = day + "/" + month + "/" + year;
  return dateString;
};

module.exports = {
  getISOString, generateDateString
};
