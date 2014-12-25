/**
 * @ngdoc filter
 * @name ucfirst
 * @kind function
 *
 * @description
 * ucfirst
 *
 */

angular.module('a8m.ucfirst', [])

  .filter('ucfirst', [function() {
    return function(input) {
      return angular.isString(input) ? input.charAt(0).toUpperCase() + input.substring(1) : input;
    }

  }]);
