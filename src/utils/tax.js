const { divide, multiply } = require('./');

const makePennies = multiply(100);
const makePounds = divide(100);

const getOwedForBand = (min, max, rate) =>
  (min < max ? (max - min) * rate : 0);

const getBandCap = salary => bandCap => (salary <= bandCap ? salary : bandCap);

const getBandBottom = salary => bandBottom => (salary > bandBottom ? bandBottom : 0);

const bandBottomLowerThanAllowance = allowance => bandBottom =>
  (allowance > bandBottom ? allowance : bandBottom);

const makeMonthly = divide(12);
const makeWeekly = divide(52);
const makeDaily = divide(365);

module.exports = {
  makePennies,
  makePounds,
  getOwedForBand,
  getBandCap,
  getBandBottom,
  bandBottomLowerThanAllowance,
  makeMonthly,
  makeWeekly,
  makeDaily,
};
