const {
  makePennies,
  fromPennies,
  getOwedForBand,
  uncappedBand,
  getBandCap,
  getBandStart,
  bandStartLowerThanAllowance,
  makeMonthly,
  makeWeekly,
  makeDaily,
} = require('./tax');

const taxLowerBand = {
  start: 1185900,
  rate: 0.20,
  end: 4635000,
};
const taxHigherBand = {
  start: 4635000,
  end: 15000000,
  rate: 0.40,
};
const taxEndBand = {
  start: 15000000,
  end: -1,
  rate: 0.45,
};
const hidden = {
  one: 1,
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
};
hidden.one = 2;

const salaryBelowMinIncome = 1185000;
const salaryEqualMinIncome = 1185900;
const salaryAboveMinIncome = 1186000;
const salaryStartBracketMid = 2400000;
const salaryStartBracketEnd = 4635000;
const salaryMidBracketStart = 4635100;
// const salaryMidBracketEnd = 150000;
// const salaryEndBracketStart = 150001;
const salaryEndBracketHigh = 25000000;

describe('makePennies', () => {
  it('should return 100 times the value given', () => {
    expect(makePennies(100)).toEqual(10000);
    expect(makePennies(1)).toEqual(100);
    expect(makePennies(25)).toEqual(2500);
    expect(makePennies(0.01)).toEqual(1);
    expect(makePennies(0.10)).toEqual(10);
    expect(makePennies(0.03)).toEqual(3);
  });
});

describe('fromPennies', () => {
  it('should divide the value by 100', () => {
    expect(fromPennies(10000)).toEqual(100.00);
    expect(fromPennies(100)).toEqual(1.00);
    expect(fromPennies(2500)).toEqual(25.00);
    expect(fromPennies(1)).toEqual(0.01);
    expect(fromPennies(10)).toEqual(0.10);
    expect(fromPennies(3)).toEqual(0.03);
  });
});

describe('getBandStart', () => {
  it('should return 0 if salary is lower than the band min', () =>
    expect(getBandStart(salaryBelowMinIncome)(taxLowerBand.start)).toEqual(0));
  it('should return 0 if salary equals the band min', () =>
    expect(getBandStart(salaryEqualMinIncome)(taxLowerBand.start)).toEqual(0));
  it('should not change the band if salary is in than the band min', () =>
    expect(getBandStart(salaryAboveMinIncome)(taxLowerBand.start))
      .toEqual(taxLowerBand.start));
});

describe('getBandCap', () => {
  it('should return the band cap if the band cap is less than the salary', () =>
    expect(getBandCap(salaryMidBracketStart)(taxLowerBand.end))
      .toEqual(taxLowerBand.end));
  it('should return the salary if the band cap is less than the salary', () =>
    expect(getBandCap(salaryStartBracketMid)(taxLowerBand.end))
      .toEqual(salaryStartBracketMid));
  it('should return the band cap if the band cap equals the salary', () =>
    expect(getBandCap(salaryStartBracketEnd)(taxLowerBand.end))
      .toEqual(taxLowerBand.end));
  it('should return the salary if the band cap is -1', () =>
    expect(getBandCap(salaryStartBracketEnd)(taxEndBand.end))
      .toEqual(salaryStartBracketEnd));
});

describe('getOwedForBand', () => {
  it('should return accurately calculated tax for a given band', () =>
    expect(getOwedForBand(taxLowerBand.start, taxLowerBand.end, taxLowerBand.rate))
      .toEqual(689820));
  it('should be accurate for the lower rate with no allowance', () =>
    expect(getOwedForBand(0, taxLowerBand.end, taxLowerBand.rate))
      .toEqual(927000));
  it('should be accurate for the higher rate of tax', () =>
    expect(getOwedForBand(taxHigherBand.start, taxHigherBand.end, taxHigherBand.rate))
      .toEqual(4146000));
  it('should be accurate for the end rate of tax', () =>
    expect(getOwedForBand(taxEndBand.start, salaryEndBracketHigh, taxEndBand.rate))
      .toEqual(4500000));
});

describe('bandStartLowerThanAllowance', () => {
  it('should return the allowance if it is higher than the band start', () =>
    expect(bandStartLowerThanAllowance(salaryAboveMinIncome)(taxLowerBand.start))
      .toEqual(salaryAboveMinIncome));
  it('should return the allowance if the band start is 0', () =>
    expect(bandStartLowerThanAllowance(salaryAboveMinIncome)(0))
      .toEqual(salaryAboveMinIncome));
  it('should return the allowance if the band start is negative', () =>
    expect(bandStartLowerThanAllowance(salaryAboveMinIncome)(-1))
      .toEqual(salaryAboveMinIncome));
  it('should return the band start allowance is smaller', () =>
    expect(bandStartLowerThanAllowance(salaryBelowMinIncome)(taxHigherBand.start))
      .toEqual(taxHigherBand.start));
});

describe('makeMonthly', () => {
  it('should return 1/12th of the value', () => {
    expect(makeMonthly(12)).toEqual(1);
    expect(makeMonthly(3400)).toEqual(283.3333333333333);
    expect(makeMonthly(24000)).toEqual(2000);
  });
});

describe('makeWeekly', () => {
  it('should return 1/12th of the value', () => {
    expect(makeWeekly(52)).toEqual(1);
    expect(makeWeekly(3400)).toEqual(65.38461538461539);
    expect(makeWeekly(24000)).toEqual(461.53846153846155);
  });
});

describe('makeDaily', () => {
  it('should return 1/12th of the value', () => {
    expect(makeDaily(365)).toEqual(1);
    expect(makeDaily(3400)).toEqual(9.315068493150685);
    expect(makeDaily(24000)).toEqual(65.75342465753425);
  });
});
describe('uncappedBand', () => {
  it('should return true if band cap is less than 0', () =>
    expect(uncappedBand(-1)).toEqual(true));
  it('should return false if band cap is 0', () =>
    expect(uncappedBand(0)).toEqual(false));
  it('should return false if band cap is positive', () => {
    expect(uncappedBand(1)).toEqual(false);
    expect(uncappedBand(salaryAboveMinIncome)).toEqual(false);
  });
});
