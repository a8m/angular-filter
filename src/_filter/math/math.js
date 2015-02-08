/**
 * @ngdoc module
 * @name math
 * @description
 * reference to global Math object
 */
angular.module('a8m.math', [])
  .factory('$math', ['$window', function ($window) {
    return $window.Math;
  }]);
