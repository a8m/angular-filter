/**
 * @ngdoc filter
 * @name test
 * @kind function
 *
 * @description
 * test if a string match a pattern.
 */
angular.module('a8m.test', [])
  .filter('test', function () {
    return function (input, pattern, flag) {

      var reg = new RegExp(pattern, flag);

      return isString(input)
        ? reg.test(input)
        : input;
    }
  });
