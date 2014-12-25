/**
 * @ngdoc filter
 * @name ucfirst
 * @kind function
 *
 * @description
 * ucfirst
 *
 */

angular.module('a8m.lcwords', [])

  .filter('lcwords', [function() {
    return function(input) {
      return angular.isString(input) ? input.split(' ')
        .map(function (char) {
          return char.charAt(0).toLowerCase() + char.substring(1);
        }).join(' ') : input;
    }

  }]);
