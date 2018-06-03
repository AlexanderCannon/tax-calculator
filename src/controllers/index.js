const { add, subtract, __ } = require('ramda');
const {
  nearestWholePenny,
  pickLarger,
  aLessThanB,
  getAge,
  addThree,
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
    const calculatedIncomeTax = incomeTax
      .map(item => calculateIncomeTax(item, allowance))
      .reduce(add, 0);
    const calculatedNationalInsurance = aLessThanB(age, pensionAge)
      ? nearestWholePenny(fromWeekly(nationalInsurance
        .map(calculateNationalInsurance)
        .reduce(add, 0)))
      : 0;
    const calculatedStudentLoan = studentLoanPlan
      ? getStudentLoan(
        studentLoan[studentLoanPlan].threshold,
        studentLoan[studentLoanPlan].rate,
      )
      : 0;

    const netIncome = subtract(
      gross,
      addThree(
        calculatedIncomeTax,
        calculatedNationalInsurance,
        calculatedStudentLoan,
      ),
    );

    return ({
      netIncome: fromPennies(netIncome),
      incomeTax: fromPennies(calculatedIncomeTax),
      nationalInsurance: fromPennies(calculatedNationalInsurance),
      studentLoan: fromPennies(calculatedStudentLoan),
      allowance: fromPennies(allowance),
    });
  });
  reply.send(taxes);
};

module.exports = { getNet };
