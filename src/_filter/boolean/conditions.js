/**
 * @ngdoc filter
 * @name a8m.conditions
 * @kind function
 *
 * @description
 * reference to math conditions
 */

angular.module('a8m.conditions', [])

  .filter('isGreaterThan', function () {
    return function (input, check) {
      return input > check;
    };
  })
  .filter('isGreaterThanOrEqualTo', function () {
    return function (input, check) {
      return input >= check;
    };
  })
  .filter('isLessThan', function () {
    return function (input, check) {
      return input < check;
    };
  })
  .filter('isLessThanOrEqualTo', function () {
    return function (input, check) {
      return input <= check;
    };
  })
  .filter('isEqualTo', function () {
    return function (input, check) {
      return input == check;
    };
  })
  .filter('isNotEqualTo', function () {
    return function (input, check) {
      return input != check;
    };
  })
  .filter('isIdenticalTo', function () {
    return function (input, check) {
      return input === check;
    };
  })
  .filter('isNotIdenticalTo', function () {
    return function (input, check) {
      return input !== check;
    };
  });
