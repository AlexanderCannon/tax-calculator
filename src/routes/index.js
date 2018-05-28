const {
  makePennies,
  getBandBottom,
  getBandCap,
  getOwedForBand,
  bandBottomLowerThanAllowance,
} = require('../utils/tax');

const taxRules = require('../taxRules');

const allowance = 1185900;

const getNet = ({ body }, res) => {
  const { grossIncome } = body;
  const gross = makePennies(grossIncome);
  const boundBandCap = getBandCap(gross);

  const boundBandBottom = getBandBottom(gross);
  const boundBandBottomLowerThanAllowance = bandBottomLowerThanAllowance(allowance);
  const x = taxRules.map(({ incomeTax, nationalInsurance }) =>
    ({
      incomeTax: incomeTax.map(({ start, end, rate }) =>
        getOwedForBand(
          boundBandBottomLowerThanAllowance(boundBandBottom(start)),
          boundBandCap(end), rate,
        ))
        .reduce((a, b) => a + b),
      nationalInsurance: nationalInsurance.rates.map(({ start, end, rate }) =>
        getOwedForBand(boundBandBottom(start), boundBandCap(end), rate))
        .reduce((a, b) => a + b),
    }));
  res.send(x);
};
module.exports = { getNet };
