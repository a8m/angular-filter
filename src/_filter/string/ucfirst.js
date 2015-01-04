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
      if(!isString(input)) {
        return input;
      }
      return input.split(' ').map(function (ch) {
          return ch.charAt(0).toUpperCase() + ch.substring(1);
        }).join(' ');
    }
  }]);
