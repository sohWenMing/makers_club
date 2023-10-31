function getISOString(dateString) {
  const singaporeDateString = dateString;
  const UTCDateTime = new Date(singaporeDateString);
  const UTCString = UTCDateTime.toISOString();
  return UTCString;
}

function generateDateString(data) {
  const dateData = data;
  const date = new Date(dateData);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const dateString = day + "/" + month + "/" + year;
  return dateString;
}

function getDateTimeFromString(dateString) {
  const dateparts = dateString.split("-");
  const day = parseInt(dateparts[0], 10);
  const month = parseInt(dateparts[1], 10) - 1;
  const year = parseInt(dateparts[2], 10);
  const dateTime = new Date(year, month, day);

  if (!isNaN(dateTime.getTime()) && dateTime.getDate() === day && dateTime.getMonth() === month && dateTime.getFullYear() === year) {
    const dateTimeInUTC = new Date(dateTime.setHours(dateTime.getHours() + 2));
    return dateTimeInUTC;
  } else {
    return null;
  }
}

module.exports = {
  getISOString,
  generateDateString,
  getDateTimeFromString,
};
