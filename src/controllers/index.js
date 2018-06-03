const { add, __ } = require('ramda');
const {
  nearestWholePenny,
  pickLarger,
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
const { curriedTotalAllowances } = require('../utils/personalAllowance');
const taxRules = require('../taxRules');

const getNet = (request, reply) => {
  const {
    grossIncome,
    dateOfBirth,
    studentLoanPlan,
    blind,
    pensionContributions,
  } = request.body;
  const age = getAge(dateOfBirth);
  const gross = makePennies(grossIncome);
  const weeklyGross = makeWeekly(gross);
  const getAllowanceFromSalary = curriedTotalAllowances(gross);

  // const bandStart = curriedPickLarger(allowance);
  const bandEnd = curriedGetBandEnd(gross);
  const weeklyBandEnd = curriedGetBandEnd(weeklyGross);

  const calculateIncomeTax = ({ start, end, rate }, allowance) =>
    getOwedForBand(
      pickLarger(start, allowance),
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
    allowances,
  }) => {
    const allowance = getAllowanceFromSalary(allowances, { blind, pensionContributions, age });
    return ({
      incomeTax: fromPennies(incomeTax
        .map(item => calculateIncomeTax(item, allowance))
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
      allowance: fromPennies(allowance),
    });
  });
  reply.send(taxes);
};

module.exports = { getNet };
