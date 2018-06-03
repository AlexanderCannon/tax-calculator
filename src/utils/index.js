const { lt, gt, curry } = require('ramda');
const differenceInYears = require('date-fns/difference_in_years');

const nearestWholePenny = x => Math.round(x * 100) / 100;

const divideRightToLeft = (a, b) => b / a;

const curriedDivideRightToLeft = curry(divideRightToLeft);

const pickSmaller = (a, b) => (lt(a, b) ? a : b);

const curriedPickSmaller = curry(pickSmaller);

const pickLarger = (a, b) => (gt(a, b) ? a : b);

const curriedPickLarger = curry(pickLarger);

const aLessThanB = (a, b) =>
  (!!lt(a, b));

const curriedALessThanB = curry(aLessThanB);

const getAge = (dateOfBirth, ageAtDate = undefined) =>
  differenceInYears(
    ageAtDate
      ? new Date(ageAtDate)
      : new Date(),
    new Date(dateOfBirth),
  );


module.exports = {
  nearestWholePenny,
  divideRightToLeft,
  curriedDivideRightToLeft,
  pickSmaller,
  curriedPickSmaller,
  pickLarger,
  curriedPickLarger,
  aLessThanB,
  curriedALessThanB,
  getAge,
};
