'use strict';

/**
 * @ngdoc filter
 * @name max
 * @kind function
 *
 * @description
 * Math.max
 *
 */

angular.module('math.max', ['math'])

  .filter('max', ['$math', function ($math) {
    return function (input) {

      return (isArray(input)) ?
        $math.max.apply($math, input) :
        input;
    }

  }]);
