/**
 * @ngdoc filter
 * @name random
 * @kind function
 *
 * @description
 * Return a random value from collection
 */
angular.module('a8m.random', [])
    .filter('random',[ function () {
      return function (input) {
        input = isObject(input) ? toArray(input) : input;

        return isArray(input)
          ? input[Math.floor(Math.random() * input.length)]
          : input;
      }
    }]);
