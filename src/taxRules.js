const { getTotalAllowances } = require('./utils/personalAllowance');

module.exports = [
  {
    year: '2018/19',
    allowance: {
      basic: 1185000,
      age6574: 1185000,
      age75over: 1185000,
      blind: 232000,
      thresholds: {
        age: 2770000,
        taper: 10000000,
      },
    },
    incomeTax: [
      {
        startFunction: (allowance, user, grossIncome) =>
          getTotalAllowances(allowance, user, grossIncome),
        start: -1,
        rate: 0.20,
        end: 4635000,
      },
      {
        start: 4635000,
        end: 15000000,
        rate: 0.40,
      },
      {
        start: 15000000,
        end: -1,
        rate: 0.45,
      },
    ],
    nationalInsurance: {
      pensionAge: 65,
      rates: [
        {
          start: 0,
          end: 16200,
          rate: 0,
        },
        {
          start: 16200,
          end: 89200,
          rate: 0.12,
        },
        {
          start: 89200,
          end: -1,
          rate: 0.02,
        },
      ],
    },
    studentLoan: {
      plan1: {
        threshold: 1833000,
        rate: 0.09,
      },
      plan2: {
        threshold: 2500000,
        rate: 0.09,
      },
    },
  },
  {
    year: '2017/18',
    allowance: {
      basic: 1150000,
      age6574: 1150000,
      age75over: 1150000,
      blind: 239000,
      thresholds: {
        age: 2770000,
        taper: 10000000,
      },
    },
    incomeTax: [
      {
        start: 0,
        end: 3350000,
        rate: 0.20,
      },
      {
        start: 3350000,
        end: 15000000,
        rate: 0.40,
      },
      {
        start: 15000000,
        end: -1,
        rate: 0.45,
      },
    ],
    nationalInsurance: {
      pensionAge: 65,
      rates: [
        {
          start: 0,
          end: 15700,
          rate: 0,
        },
        {
          start: 15700,
          end: 86600,
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
        threshold: 1777500,
        rate: 0.09,
      },
      plan2: {
        threshold: 2100000,
        rate: 0.09,
      },
    },
  },
];
