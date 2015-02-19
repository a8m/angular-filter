/**
 * @ngdoc filter
 * @name startWith
 * @kind function
 *
 * @description
 * checks whether string starts with the starts parameter.
 */
angular.module('a8m.starts-with', [])
  .filter('startsWith', function () {
    return function (input, start, csensitive) {

      var sensitive = csensitive || false;

      if(!isString(input) || isUndefined(start)) {
        return input;
      }

      input = (sensitive) ? input : input.toLowerCase();

      return !input.indexOf((sensitive) ? start : start.toLowerCase());
    }
  });
