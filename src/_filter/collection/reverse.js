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

        return (isArray(input)) ? reverseArray(input) : input;
      }
    }]);

/**
 * @description
 * Get an array, reverse it manually.
 * @param arr
 * @returns {Array}
 */
function reverseArray(arr) {
  var res = [];
  arr.forEach(function(e, i) {
    res.push(arr[arr.length - i -1]);
  });
  return res;
}