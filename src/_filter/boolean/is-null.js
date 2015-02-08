/**
 * @ngdoc filter
 * @name isNull
 * @kind function
 *
 * @description
 * checks if value is null or not
 * @return Boolean
 */
angular.module('a8m.is-null', [])
    .filter('isNull', function () {
      return function(input) {
        return isNull(input);
      }
    });
