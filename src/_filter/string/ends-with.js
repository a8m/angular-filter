/**
 * @ngdoc filter
 * @name endsWith
 * @kind function
 *
 * @description
 * checks whether string ends with the ends parameter.
 */
angular.module('a8m.ends-with', [])

  .filter('endsWith', function () {
    return function (input, ends, csensitive) {

      var sensitive = csensitive || false,
        position;

      if(!isString(input) || isUndefined(ends)) {
        return input;
      }

      input = (sensitive) ? input : input.toLowerCase();
      position = input.length - ends.length;

      return input.indexOf((sensitive) ? ends : ends.toLowerCase(), position) !== -1;
    }
  });
