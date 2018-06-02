const {
  nearestWholePenny,
  divideRightToLeft,
  pickSmaller,
} = require('./');

describe('nearestWholePenny', () => {
  it('should return a rounded number', () => {
    expect(nearestWholePenny(1.000000098)).toEqual(1);
    expect(nearestWholePenny(1.88888889)).toEqual(1.89);
  });
  it('should not round a whole number', () => {
    expect(nearestWholePenny(1)).toEqual(1);
    expect(nearestWholePenny(2)).toEqual(2);
  });
});

describe('divideRightToLeft', () => {
  it('should divide the params in the opposite order they are passed', () =>
    expect(divideRightToLeft(2)(1)).toEqual(0.5));
});
describe('pickSmaller', () => {
  it('pick the first param if it is smaller', () =>
    expect(pickSmaller(1, 2)).toEqual(1));
  it('pick the second param if it is smaller', () =>
    expect(pickSmaller(2, 1)).toEqual(1));
});
