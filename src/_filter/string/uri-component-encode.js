/**
 * @ngdoc filter
 * @name uriComponentEncode
 * @kind function
 *
 * @description
 * get string as parameter and return encoded string
 */

angular.module('a8m.uri-component-encode', [])

  .filter('uriComponentEncode',['$window', function ($window) {
      return function (input) {

        if(isString(input)) {
          return $window.encodeURIComponent(input);
        }

        return input;
      }
    }]);
