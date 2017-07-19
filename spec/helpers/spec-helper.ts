const EPSILON = 0.00001;

beforeEach(function () {
  jasmine.addMatchers({
    toBeEqualish() {
      return {
        compare: function (actual: any, expected: any) {
          if (typeof (actual) === 'number')
            return { pass: Math.abs(actual - expected) < EPSILON };

          if (actual.length !== expected.length) return { pass: false };
          for (var i = 0; i < actual.length; i++) {
            if (isNaN(actual[i]) !== isNaN(expected[i]))
              return { pass: false };
            if (Math.abs(actual[i] - expected[i]) >= EPSILON)
              return { pass: false };
          }
          return { pass: true };
        }
      }
    }

  });
});

declare namespace jasmine {
    interface Matchers<T> {
        toBeEqualish(expected: number | number[]): boolean;
    }
}
