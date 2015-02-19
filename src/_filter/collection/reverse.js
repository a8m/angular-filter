/**
 * @ngdoc filter
 * @name reverse
 * @kind function
 *
 * @description
 * Reverses a string or collection
 */
angular.module('a8m.reverse', [])
    .filter('reverse',[ function () {
      return function (input) {
        input = (isObject(input)) ? toArray(input) : input;

        if(isString(input)) {
          return input.split('').reverse().join('');
        }

        return isArray(input)
          ? input.slice().reverse()
          : input;
      }
    }]);
