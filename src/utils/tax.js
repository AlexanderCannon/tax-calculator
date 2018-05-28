const {
  multiply,
  lte,
  gt,
} = require('ramda');
const { divideRightToLeft } = require('./');

const makePennies = multiply(100);
const fromPennies = divideRightToLeft(100);

const getOwedForBand = (start, end, rate) =>
  (gt(end, start) ? (end - start) * rate : 0);

const getBandCap = salary => bandCap => (lte(salary, bandCap) ? salary : bandCap);

const getBandBottom = salary => bandBottom => (gt(salary, bandBottom) ? bandBottom : 0);

const bandBottomLowerThanAllowance = allowance => bandBottom =>
  (gt(allowance, bandBottom) ? allowance : bandBottom);


const makeMonthly = divideRightToLeft(12);
const makeWeekly = divideRightToLeft(52);
const makeDaily = divideRightToLeft(365);

const fromMonthly = multiply(12);
const fromWeekly = multiply(52);
const fromDaily = multiply(365);

module.exports = {
  makePennies,
  fromPennies,
  getOwedForBand,
  getBandCap,
  getBandBottom,
  bandBottomLowerThanAllowance,
  makeMonthly,
  makeWeekly,
  makeDaily,
  fromMonthly,
  fromWeekly,
  fromDaily,
};
