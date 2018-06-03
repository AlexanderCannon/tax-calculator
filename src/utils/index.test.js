const {
  nearestWholePenny,
  divideRightToLeft,
  curriedDivideRightToLeft,
  pickSmaller,
  curriedPickSmaller,
  pickLarger,
  curriedPickLarger,
  aLessThanB,
  curriedALessThanB,
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
    expect(divideRightToLeft(2, 1)).toEqual(0.5));
});

describe('curriedDivideRightToLeft', () => {
  it('should divide the params in the opposite order they are passed', () =>
    expect(curriedDivideRightToLeft(2)(1)).toEqual(0.5));
});

describe('pickSmaller', () => {
  it('pick the first param if it is smaller', () =>
    expect(pickSmaller(1, 2)).toEqual(1));
  it('pick the second param if it is smaller', () =>
    expect(pickSmaller(2, 1)).toEqual(1));
});

describe('curriedPickSmaller', () => {
  it('pick the first param if it is smaller', () =>
    expect(curriedPickSmaller(1)(2)).toEqual(1));
  it('pick the second param if it is smaller', () =>
    expect(curriedPickSmaller(2)(1)).toEqual(1));
});
describe('pickLarger', () => {
  it('pick the first param if it is larger', () =>
    expect(pickLarger(2, 1)).toEqual(2));
  it('pick the second param if it is larger', () =>
    expect(pickLarger(1, 2)).toEqual(2));
});

describe('curriedPickLarger', () => {
  it('pick the first param if it is larger', () =>
    expect(curriedPickLarger(2)(1)).toEqual(2));
  it('pick the second param if it is larger', () =>
    expect(curriedPickLarger(1)(2)).toEqual(2));
});

describe('aLessThanB', () => {
  it('should return true if a is less than b', () =>
    expect(aLessThanB(1, 2)).toBe(true));
  it('should return true if a is less than b', () =>
    expect(aLessThanB(2, 1)).toBe(false));
});

describe('curriedALessThanB', () => {
  it('should return true if a is less than b', () =>
    expect(curriedALessThanB(1)(2)).toBe(true));
  it('should return true if a is less than b', () =>
    expect(curriedALessThanB(2)(1)).toBe(false));
});
