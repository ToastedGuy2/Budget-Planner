const { DateTime } = require("luxon");

exports.isDateWithinThisMonth = (date) => {
  const newDate = DateTime.fromISO(date).toUTC();
  if (newDate.isValid) {
    const { month, year, daysInMonth } = DateTime.utc();
    const monthFirstDay = DateTime.fromObject({
      day: 1,
      month,
      year,
      hour: 0,
      minute: 0,
      second: 0,
    }).toUTC();
    const monthLastDay = DateTime.fromObject({
      day: daysInMonth,
      month: month,
      year,
      hour: 23,
      minute: 59,
      second: 59,
    }).toUTC();
    return (
      newDate.toMillis() >= monthFirstDay.toMillis() &&
      newDate.toMillis() <= monthLastDay.toMillis()
    );
  }
  return false;
};
