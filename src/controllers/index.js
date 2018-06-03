const { add } = require('ramda');
const { curriedPickLarger } = require('../utils/');
const {
  makePennies,
  fromPennies,
  curriedGetBandEnd,
  makeWeekly,
  fromWeekly,
  getOwedForBand,
} = require('../utils/tax');

const taxRules = require('../taxRules');

const allowance = 1185900;

const getNet = (request, reply) => {
  const { grossIncome, studentLoanPlan, dateOfBirth } = request.body;
  const age = getAge(dateOfBirth);
  const gross = makePennies(grossIncome);
  const weeklyGross = makeWeekly(gross);

  const bandStart = curriedPickLarger(allowance);
  const bandEnd = curriedGetBandEnd(gross);
  // const weeklyBandStart = curriedPickLarger(allowance);
  const weeklyBandEnd = curriedGetBandEnd(weeklyGross);

  const calculateIncomeTax = ({ start, end, rate }) =>
    getOwedForBand(
      bandStart(start),
      bandEnd(end), rate,
    );
  const calculateNationalInsurance = ({ start, end, rate }) =>
    getOwedForBand(
      start,
      weeklyBandEnd(end), rate,
    );

  const taxes = taxRules.map(({ incomeTax, nationalInsurance }) => (
    {
      incomeTax: fromPennies(incomeTax
        .map(calculateIncomeTax)
        .reduce(add, 0)),
      nationalInsurance: fromPennies(fromWeekly(nationalInsurance
        .map(calculateNationalInsurance)
        .reduce(add, 0))),
    }));
  reply.send(taxes);
};

module.exports = { getNet };
