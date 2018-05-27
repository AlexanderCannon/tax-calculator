const { getTotalAllowances } = require('./utils/personalAllowance');

module.exports = [
  {
    year: '2018/19',
    allowance: {
      basic: 11850.00,
      age6574: 11850.00,
      age75over: 11850.00,
      blind: 2320.00,
      thresholds: {
        age: 27700.00,
        taper: 100000.00,
      },
    },
    incomeTax: [
      {
        startFunction: (allowance, user, grossIncome) =>
          getTotalAllowances(allowance, user, grossIncome),
        start: -1,
        rate: 0.20,
        end: 46350.00,
      },
      {
        start: 46350.00,
        end: 150000.00,
        rate: 0.40,
      },
      {
        start: 150000,
        end: -1,
        rate: 0.45,
      },
    ],
    nationalInsurance: {
      pensionAge: 65,
      rates: [
        {
          start: 0.00,
          end: 162.00,
          rate: 0.00,
        },
        {
          start: 162.00,
          end: 892.00,
          rate: 0.12,
        },
        {
          start: 892.00,
          end: -1,
          rate: 0.02,
        },
      ],
    },
    studentLoan: {
      plan1: {
        threshold: 18330.00,
        rate: 0.09,
      },
      plan2: {
        threshold: 25000.00,
        rate: 0.09,
      },
    },
  },
  {
    year: '2017/18',
    allowance: {
      basic: 11500.00,
      age6574: 11500.00,
      age75over: 11500.00,
      blind: 2390.00,
      thresholds: {
        age: 27700.00,
        taper: 100000.00,
      },
    },
    incomeTax: [
      {
        start: 0.00,
        end: 33500.00,
        rate: 0.20,
      },
      {
        start: 33500.00,
        end: 150000.00,
        rate: 0.40,
      },
      {
        start: 150000,
        end: -1,
        rate: 0.45,
      },
    ],
    nationalInsurance: {
      pensionAge: 65,
      rates: [
        {
          start: 0.00,
          end: 157.00,
          rate: 0.00,
        },
        {
          start: 157.00,
          end: 866.00,
          rate: 0.12,
        },
        {
          start: 866.00,
          end: -1,
          rate: 0.02,
        },
      ],
    },
    studentLoan: {
      plan1: {
        threshold: 17775.00,
        rate: 0.09,
      },
      plan2: {
        threshold: 21000.00,
        rate: 0.09,
      },
    },
  },
];
