const { compose } = require('ramda');
const {
  makePennies,
  fromPennies,
  getBandBottom,
  getBandCap,
  getOwedForBand,
  bandBottomLowerThanAllowance,
  makeWeekly,
  fromWeekly,
} = require('../utils/tax');

const taxRules = require('../taxRules');

const allowance = 1185900;

const getNet = (req, res) => {
  const { grossIncome } = req.body;
  const gross = makePennies(grossIncome);
  const weeklyGross = makeWeekly(gross);
  const boundBandCap = getBandCap(gross);
  const boundBandBottom = getBandBottom(gross);
  const boundWeeklyBandCap = getBandCap(weeklyGross);
  const boundWeeklyBandBottom = getBandBottom(weeklyGross);
  const boundBandBottomLowerThanAllowance = bandBottomLowerThanAllowance(allowance);
  const getBottomBand = compose(
    boundBandBottomLowerThanAllowance,
    boundBandBottom,
  );
  const x = taxRules.map(({ incomeTax, nationalInsurance }) =>
    ({
      incomeTax: fromPennies(incomeTax
        .map(({ start, end, rate }) =>
          getOwedForBand(
            getBottomBand(start),
            boundBandCap(end),
            rate,
          ))
        .reduce((a, b) => a + b)),

      nationalInsurance: fromPennies(fromWeekly(nationalInsurance.rates
        .map(({ start, end, rate }) =>
          getOwedForBand(boundWeeklyBandBottom(start), boundWeeklyBandCap(end), rate))
        .reduce((a, b) => a + b))),
    }));
  res.send(x);
};
module.exports = { getNet };
