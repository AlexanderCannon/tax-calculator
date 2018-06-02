const { compose, add } = require('ramda');
const {
  makePennies,
  fromPennies,
  getBandStart,
  getBandEnd,
  getOwedForBand,
  bandStartLowerThanAllowance,
  makeWeekly,
  fromWeekly,
} = require('../utils/tax');

const taxRules = require('../taxRules');

const allowance = 1185900;

const getNet = (request, reply) => {
  const { grossIncome, studentLoanPlan } = request.body;
  const gross = makePennies(grossIncome);
  const weeklyGross = makeWeekly(gross);
  const partialBandEnd = getBandEnd(gross);
  const partialWeeklyBandEnd = getBandEnd(weeklyGross);
  const partialBandStart = getBandStart(gross);
  const partialWeeklyBandStart = getBandStart(weeklyGross);
  const partialBandStartLowerThanAllowance = bandStartLowerThanAllowance(allowance);
  const startOfBand = compose(
    partialBandStartLowerThanAllowance,
    partialBandStart,
  );

  const calculateBand = (start, end, rate) => getOwedForBand(
    partialBandEnd(start),
    startOfBand(end),
    rate,
  );
  const taxes = taxRules.map(({ incomeTax, nationalInsurance, studentLoan }) => (
    {
      incomeTax: fromPennies(incomeTax
        .map(({ start, end, rate }) => calculateBand(start, end, rate))
        .reduce((a, b) => add(a, b), 0)),

      nationalInsurance: fromPennies(fromWeekly(nationalInsurance.rates
        .map(({ start, end, rate }) =>
          getOwedForBand(partialWeeklyBandStart(start), partialWeeklyBandEnd(end), rate))
        .reduce((a, b) => add(a, b), 0))),
      studentLoan: studentLoanPlan
        ? fromPennies(calculateBand(
          studentLoan[studentLoanPlan].threshold,
          0,
          studentLoan[studentLoanPlan].rate,
        ))
        : 0,
    }));
  reply.send(taxes);
};

module.exports = { getNet };
