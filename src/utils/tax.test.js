const { getBandBottom, getBandCap, getOwedForBand } = require('./tax');

const taxLowerBand = {
  start: 11859,
  rate: 0.20,
  end: 46350.00,
};
const taxHigherBand = {
  start: 46350.00,
  end: 150000.00,
  rate: 0.40,
};
const taxTopBand = {
  start: 150000,
  end: -1,
  rate: 0.45,
};

// const pensionAge = 65;
// const niFree = {
//   start: 0.00,
//   end: 162.00,
//   rate: 0.00,
// };
// const niLower = {
//   start: 162.00,
//   end: 892.00,
//   rate: 0.12,
// };
// const niHigher = {
//   start: 892.00,
//   end: -1,
//   rate: 0.02,
// };

// const studentLoanPlan1 = {
//   threshold: 18330.00,
//   rate: 0.09,
// };
// const studentLoanPlan = {
//   threshold: 25000.00,
//   rate: 0.09,
// };

const salaryBelowMinIncome = 11850;
const salaryEqualMinIncome = 11859;
const salaryAboveMinIncome = 11860;
const salaryBottomBracketMid = 24000;
const salaryBottomBracketTop = 46350;
const salaryMidBracketBottom = 46351;
// const salaryMidBracketTop = 150000;
// const salaryTopBracketBottom = 150001;
const salaryTopBracketHigh = 250000;

describe('getBandBottom', () => {
  it('should return 0 if salary is lower than the band min', () =>
    expect(getBandBottom(salaryBelowMinIncome)(taxLowerBand.start)).toEqual(0));
  it('should return 0 if salary equals the band min', () =>
    expect(getBandBottom(salaryEqualMinIncome)(taxLowerBand.start)).toEqual(0));
  it('should not change the band if salary is in than the band min', () =>
    expect(getBandBottom(salaryAboveMinIncome)(taxLowerBand.start))
      .toEqual(taxLowerBand.start));
});

describe('getBandCap', () => {
  it('should return the band cap if the band cap is less than the salary', () =>
    expect(getBandCap(salaryMidBracketBottom)(taxLowerBand.end))
      .toEqual(taxLowerBand.end));
  it('should return the salary if the band cap is less than the salary', () =>
    expect(getBandCap(salaryBottomBracketMid)(taxLowerBand.end))
      .toEqual(salaryBottomBracketMid));
  it('should return the band cap if the band cap equals than the salary', () =>
    expect(getBandCap(salaryBottomBracketTop)(taxLowerBand.end))
      .toEqual(taxLowerBand.end));
});

describe('getOwedForBand', () => {
  it('should return accurately calculated tax for a given band', () =>
    expect(getOwedForBand(taxLowerBand.start, taxLowerBand.end, taxLowerBand.rate))
      .toEqual(6898.20));
  it('should be accurate for the higher rate of tax', () =>
    expect(getOwedForBand(taxHigherBand.start, taxHigherBand.end, taxHigherBand.rate))
      .toEqual(41460));
  it('should be accurate for the top rate of tax', () =>
    expect(getOwedForBand(taxTopBand.start, salaryTopBracketHigh, taxTopBand.rate))
      .toEqual(45000));
});
