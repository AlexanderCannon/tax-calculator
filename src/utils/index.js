const nearestWholePenny = x => Math.round(x * 100) / 100;

const divideRightToLeft = a => b => b / a;

module.exports = {
  nearestWholePenny,
  divideRightToLeft,
};
