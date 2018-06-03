const {
  curry,
  multiply,
  subtract,
  gt,
} = require('ramda');
const { curriedDivideRightToLeft, pickSmaller, aLessThanB } = require('./');

const makePennies = multiply(100);
const fromPennies = curriedDivideRightToLeft(100);

const getOwedForBand = (start, end, rate) => (
  aLessThanB(start, end)
    ? multiply(subtract(end, start), rate)
    : 0
);

const curriedGetOwedForBand = curry(getOwedForBand);

const uncappedBand = bandEnd => bandEnd === -1;

const getBandEnd = (salary, bandEnd) => (
  uncappedBand(bandEnd)
    ? salary
    : pickSmaller(salary, bandEnd)
);

const curriedGetBandEnd = curry(getBandEnd);

const getBandStart = (salary, bandStart) => (
  gt(salary, bandStart)
    ? bandStart
    : 0
);

const curriedGetBandStart = curry(getBandStart);

const bandStartLowerThanAllowance = (allowance, bandStart) => (
  gt(allowance, bandStart)
    ? allowance
    : bandStart
);

const curriedBandStartLowerThanAllowance = curry(bandStartLowerThanAllowance);

const makeMonthly = curriedDivideRightToLeft(12);
const makeWeekly = curriedDivideRightToLeft(52);
const makeDaily = curriedDivideRightToLeft(365);

const fromMonthly = multiply(12);
const fromWeekly = multiply(52);
const fromDaily = multiply(365);

module.exports = {
  makePennies,
  fromPennies,
  getOwedForBand,
  curriedGetOwedForBand,
  uncappedBand,
  getBandEnd,
  curriedGetBandEnd,
  getBandStart,
  curriedGetBandStart,
  bandStartLowerThanAllowance,
  curriedBandStartLowerThanAllowance,
  makeMonthly,
  makeWeekly,
  makeDaily,
  fromMonthly,
  fromWeekly,
  fromDaily,
};
