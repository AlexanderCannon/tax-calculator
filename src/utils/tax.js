const { gaussianRound } = require('./');


const getOwedForBand = (min, max, rate) =>
  (min < max ? gaussianRound(gaussianRound(max - min) * rate) : 0);

const getBandCap = salary => bandCap => (salary <= bandCap ? salary : bandCap);

const getBandBottom = salary => bandBottom => (salary > bandBottom ? bandBottom : 0);

const bandBottomLowerThanAllowance = allowance => bandBottom =>
  (allowance > bandBottom ? allowance : bandBottom);

module.exports = {
  getOwedForBand,
  getBandCap,
  getBandBottom,
  bandBottomLowerThanAllowance,
};
