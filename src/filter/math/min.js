'use strict';

/**
 * @ngdoc filter
 * @name min
 * @kind function
 *
 * @description
 * Math.min
 *
 */

angular.module('math.min', ['math'])

  .filter('min', ['$math', function ($math) {
    return function (input) {

      return (isArray(input)) ?
        $math.min.apply($math, input) :
        input;
    }

  }]);
