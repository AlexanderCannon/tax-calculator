const nearestWholePenny = x => Math.round(x * 100) / 100;

const divideRightToLeft = a => b => b / a;

const pickSmaller = (a, b) => (a < b ? a : b);

module.exports = {
  nearestWholePenny,
  divideRightToLeft,
  pickSmaller,
};
