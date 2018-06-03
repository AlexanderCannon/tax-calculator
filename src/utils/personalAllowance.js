const { curry } = require('ramda');

const { nearestWholePenny } = require('./');

const getAgeRelatedContributions = (allowance, user) => {
  if (user.age >= 75) {
    return allowance.basic - allowance.age75over;
  }
  if (user.age >= 65) {
    return allowance.basic - allowance.age6574;
  }
  return 0;
};

const getAgeRelatedTaperDeductions = (
  allowance,
  user,
  grossIncome,
) => {
  const incomeMinusTaperThreshold =
    grossIncome - allowance.thresholds.taper;
  if (incomeMinusTaperThreshold < 0) return 0;

  const halfIncomeMinusTaperThreshold = incomeMinusTaperThreshold / 2;
  const ageRelatedContributions = getAgeRelatedContributions(allowance, user);
  if (halfIncomeMinusTaperThreshold > ageRelatedContributions) return ageRelatedContributions;

  return halfIncomeMinusTaperThreshold;
};

const getAllowanceAfterAgeAdjust = (
  allowance,
  user,
  grossIncome,
) => {
  const ageAllowance =
    allowance.basic + getAgeRelatedContributions(allowance, user);
  return ageAllowance - getAgeRelatedTaperDeductions(allowance, user, grossIncome);
};


const getTaperDeductions = (
  allowance,
  user,
  grossIncome,
) => {
  const incomeMinusPensionContributions =
    grossIncome - user.pensionContributions;
  const incomeMinusPensionMinusTaperThreshold =
    incomeMinusPensionContributions - allowance.thresholds.taper;
  if (incomeMinusPensionMinusTaperThreshold < 0) return 0;

  const halfIncomeMinusPensionMinusTaperThreshold =
    incomeMinusPensionMinusTaperThreshold / 2;
  const allowanceAfterAgeAdjust = getAllowanceAfterAgeAdjust(allowance, user, grossIncome);
  if (halfIncomeMinusPensionMinusTaperThreshold > allowanceAfterAgeAdjust) {
    return allowanceAfterAgeAdjust;
  }
  return halfIncomeMinusPensionMinusTaperThreshold;
};

const getPersonalAllowance = (
  allowance,
  user,
  grossIncome,
) =>
  nearestWholePenny(getAllowanceAfterAgeAdjust(allowance, user, grossIncome)
    - getTaperDeductions(allowance, user, grossIncome));

const getBlindAllowance = (allowance, user) => {
  if (!user.blind) return 0;

  return allowance.blind;
};

const getTotalAllowances = (
  grossIncome,
  allowance,
  user,
) => getPersonalAllowance(allowance, user, grossIncome) + getBlindAllowance(allowance, user);

const curriedTotalAllowances = curry(getTotalAllowances);

module.exports = {
  getAgeRelatedContributions,
  getAgeRelatedTaperDeductions,
  getAllowanceAfterAgeAdjust,
  getTaperDeductions,
  getPersonalAllowance,
  getBlindAllowance,
  getTotalAllowances,
  curriedTotalAllowances,
};
