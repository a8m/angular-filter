/**
 * @ngdoc filter
 * @name removeSpaces
 * @kind function
 *
 * @description
 * remove spaces from string, replace with "-" or given argument
 */

angular.module('a8m.remove-spaces', [])

  .filter('removeSpaces',[ function () {
    return function (input, sub) {

      var replace = sub || '-';

      if(isString(input)) {
        return input.replace(/\s+/g, replace);
      }

      return input;
    }
  }]);
