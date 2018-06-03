const { add, __ } = require('ramda');
const {
  nearestWholePenny,
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
  curriedGetOwedForBand,
} = require('../utils/tax');

const taxRules = require('../taxRules');

const allowance = 1185900;

const getNet = (request, reply) => {
  const { grossIncome, dateOfBirth, studentLoanPlan } = request.body;
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
  const calculateNationalInsurance = ({ start, end, rate }) => getOwedForBand(
    start,
    weeklyBandEnd(end),
    rate,
  );
  const getStudentLoan = curriedGetOwedForBand(__, gross, __);

  const taxes = taxRules.map(({
    incomeTax,
    nationalInsurance,
    pensionAge,
    studentLoan,
  }) => ({
    incomeTax: fromPennies(incomeTax
      .map(calculateIncomeTax)
      .reduce(add, 0)),
    nationalInsurance: aLessThanB(age, pensionAge)
      ? fromPennies(nearestWholePenny(fromWeekly(nationalInsurance
        .map(calculateNationalInsurance)
        .reduce(add, 0))))
      : 0,
    studentLoan: studentLoanPlan && fromPennies(getStudentLoan(
      studentLoan[studentLoanPlan].threshold,
      studentLoan[studentLoanPlan].rate,
    )),
  }));
  reply.send(taxes);
};

module.exports = { getNet };
