/**
 * @ngdoc filter
 * @name ucwords
 * @kind function
 *
 * @description
 * ucwords
 *
 */

angular.module('a8m.ucwords', [])

  .filter('ucwords', [function() {
    return function(input) {
      return angular.isString(input) ? input.split(' ')
        .map(function (char) {
          return char.charAt(0).toUpperCase() + char.substring(1);
        }).join(' ') : input;
    }

  }]);
