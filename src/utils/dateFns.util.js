const fromUnixTime = require("date-fns/fromUnixTime");
const getUnixTime = require("date-fns/getUnixTime");
const format = require("date-fns/format");

const dateFns = {
  fromUnixTime: (unixtimestamp) => fromUnixTime(unixtimestamp),
  getUnixTime: (date) => getUnixTime(date),
  format: (date, pattern) => format(date, pattern),
};

export default dateFns;
