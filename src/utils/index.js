
const nearestWholePenny = x => Math.round(x * 100) / 100;

const multiply = a => b => a * b;

const divide = a => b => b / a;

module.exports = {
  nearestWholePenny,
  multiply,
  divide,
};
