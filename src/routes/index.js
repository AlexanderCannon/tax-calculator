const { getBandBottom, getBandTop, getOwedForBand } = require('../utils/tax');

const taxRules = require('../taxRules');

const getNet = ({ body }, res) => {
  const { salary } = body;
  const gross = salary;
  const boundBandTop = getBandTop(gross);

  const boundBandBottom = getBandBottom(gross);

  const x = taxRules.map(({ incomeTax, nationalInsurance }) =>
    ({
      incomeTax: incomeTax.map(({ start, end, rate }) =>
        getOwedForBand(boundBandBottom(start), boundBandTop(end), rate)),
      nationalInsurance: nationalInsurance.rates.map(({ start, end, rate }) =>
        getOwedForBand(boundBandBottom(start), boundBandTop(end), rate)),
    }));
  res.send(x);
};
module.exports = { getNet };
