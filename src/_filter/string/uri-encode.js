/**
 * @ngdoc filter
 * @name uriEncode
 * @kind function
 *
 * @description
 * get string as parameter and return encoded string
 */
angular.module('a8m.uri-encode', [])
  .filter('uriEncode',['$window', function ($window) {
      return function (input) {
        return isString(input)
          ? $window.encodeURI(input)
          : input;
      }
    }]);
