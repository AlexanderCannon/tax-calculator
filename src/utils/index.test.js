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
  getAge,
  addThree,
  curriedAddThree,
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

describe('getAge', () => {
  it('should return the correct age', () => {
    expect(getAge('1989/07/17', '2018/6/3')).toEqual(28);
    expect(getAge('2000/07/17', '2018/7/17')).toEqual(18);
    expect(getAge('2000/07/17', '2018/7/18')).toEqual(18);
    expect(getAge('2000/07/17', '2018/7/16')).toEqual(17);
  });
  it('should not return less than the correct age at the time of writing', () => {
    expect(getAge('1989/07/17')).toBeGreaterThanOrEqual(28);
    expect(getAge('2000/07/17')).toBeGreaterThanOrEqual(17);
  });
});

describe('addThree', () => {
  it('should add three numbers', () => {
    expect(addThree(1, 1, 1)).toEqual(3);
    expect(addThree(1, 2, 3)).toEqual(6);
  });
});
describe('curriedAddThree', () => {
  it('should add three numbers when passed one param then two', () => {
    expect(curriedAddThree(1)(1, 1)).toEqual(3);
    expect(curriedAddThree(1)(2, 3)).toEqual(6);
  });
  it('should add three numbers when passed two param then one', () => {
    expect(curriedAddThree(1, 1)(1)).toEqual(3);
    expect(curriedAddThree(1, 2)(3)).toEqual(6);
  });
  it('should add three numbers when called three times', () => {
    expect(curriedAddThree(1)(1)(1)).toEqual(3);
    expect(curriedAddThree(1)(2)(3)).toEqual(6);
  });
  it('should be a function if it is passed two the params', () => {
    expect(typeof curriedAddThree(1)(1)).toBe('function');
    expect(typeof curriedAddThree(1, 2)).toBe('function');
  });
  it('should be a function if it is passed one param', () => {
    expect(typeof curriedAddThree(1)).toBe('function');
  });
});
