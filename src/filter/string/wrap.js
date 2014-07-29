/**
 * @ngdoc filter
 * @name wrap
 * @kind function
 *
 * @description
 * Wrap a string with another string
 */

angular.module('a8m.wrap', [])

  .filter('wrap', function () {
    return function(input, wrap, ends) {

      if(!isString(input) || isUndefined(wrap)) {
        return input;
      }

      return [wrap, input, ends || wrap].join('');

    }
  });
