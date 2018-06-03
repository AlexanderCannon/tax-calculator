const { add } = require('ramda');
const {
  curriedPickLarger,
  aLessThanB,
  getAge,
} = require('../utils/');
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
  const { grossIncome, dateOfBirth } = request.body;
  const age = getAge(dateOfBirth);
  const gross = makePennies(grossIncome);
  const weeklyGross = makeWeekly(gross);

  const bandStart = curriedPickLarger(allowance);
  const bandEnd = curriedGetBandEnd(gross);
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

  const taxes = taxRules.map(({ incomeTax, nationalInsurance, pensionAge }) => (
    {
      incomeTax: fromPennies(incomeTax
        .map(calculateIncomeTax)
        .reduce(add, 0)),
      nationalInsurance: aLessThanB(age, pensionAge)
        ? fromPennies(fromWeekly(nationalInsurance
          .map(calculateNationalInsurance)
          .reduce(add, 0)))
        : 0,
    }));
  reply.send(taxes);
};

module.exports = { getNet };
