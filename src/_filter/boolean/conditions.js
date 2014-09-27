/**
 * @ngdoc filter
 * @name a8m.conditions
 * @kind function
 *
 * @description
 * reference to math conditions
 */
 angular.module('a8m.conditions', [])

  .filter({
    isGreaterThan  : isGreaterThanFilter,
    '>'            : isGreaterThanFilter
  })
  .filter({
    isGreaterThanOrEqualTo  : isGreaterThanOrEqualToFilter,
    '>='                    : isGreaterThanOrEqualToFilter
  })
  .filter({
    isLessThan  : isLessThanFilter,
    '<'         : isLessThanFilter
  })
  .filter({
    isLessThanOrEqualTo  : isLessThanOrEqualToFilter,
    '<='                 : isLessThanOrEqualToFilter
  })
  .filter({
    isEqualTo  : isEqualToFilter,
    '=='       : isEqualToFilter
  })
  .filter({
    isNotEqualTo  : isNotEqualToFilter,
    '!='          : isNotEqualToFilter
  })
  .filter({
    isIdenticalTo  : isIdenticalToFilter,
    '==='          : isIdenticalToFilter
  })
  .filter({
    isNotIdenticalTo  : isNotIdenticalToFilter,
    '!=='             : isNotIdenticalToFilter
  });

  function isGreaterThanFilter() {
    return function (input, check) {
      return input > check;
    };
  }

  function isGreaterThanOrEqualToFilter() {
    return function (input, check) {
      return input >= check;
    };
  }

  function isLessThanFilter() {
    return function (input, check) {
      return input < check;
    };
  }

  function isLessThanOrEqualToFilter() {
    return function (input, check) {
      return input <= check;
    };
  }

  function isEqualToFilter() {
    return function (input, check) {
      return input == check;
    };
  }

  function isNotEqualToFilter() {
    return function (input, check) {
      return input != check;
    };
  }

  function isIdenticalToFilter() {
    return function (input, check) {
      return input === check;
    };
  }

  function isNotIdenticalToFilter() {
    return function (input, check) {
      return input !== check;
    };
  }