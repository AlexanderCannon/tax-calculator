const {
  compose,
  multiply,
  subtract,
  gt,
} = require('ramda');
const { divideRightToLeft, pickSmaller } = require('./');

const makePennies = multiply(100);
const fromPennies = divideRightToLeft(100);
const getOwedForBand = (start, end, rate) => {
  console.log(gt(start, end));
  return (gt(end, start) ? multiply(subtract(end, start), rate) : 0);
};

const uncappedBand = bandEnd => (bandEnd === -1);

const getBandEnd = salary => bandEnd => (
  uncappedBand(bandEnd)
    ? salary
    : pickSmaller(salary, bandEnd));

const getBandStart = salary => bandStart => (gt(salary, bandStart) ? bandStart : 0);

const bandStartLowerThanAllowance = allowance => bandStart =>
  (gt(allowance, bandStart) ? allowance : bandStart);


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
  uncappedBand,
  getBandEnd,
  getBandStart,
  bandStartLowerThanAllowance,
  makeMonthly,
  makeWeekly,
  makeDaily,
  fromMonthly,
  fromWeekly,
  fromDaily,
};
