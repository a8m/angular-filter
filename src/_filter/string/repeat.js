/**
 * @ngdoc filter
 * @name repeat
 * @kind function
 *
 * @description
 * Repeats a string n times
 */
angular.module('a8m.repeat', [])
  .filter('repeat',[ function () {
    return function (input, n, separator) {

      var times = ~~n;

      if(!isString(input)) {
        return input;
      }

      return !times
        ? input
        : strRepeat(input, --n, separator || '');
    }
  }]);

/**
 * Repeats a string n times with given separator
 * @param str string to repeat
 * @param n number of times
 * @param sep separator
 * @returns {*}
 */
function strRepeat(str, n, sep) {
  if(!n) {
    return str;
  }
  return str + sep + strRepeat(str, --n, sep);
}