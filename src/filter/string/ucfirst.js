'use strict';

/**
 * @ngdoc filter
 * @name ucfirst
 * @kind function
 *
 * @description
 * ucfirst
 *
 */

angular.module('ucfirst', [])

  .filter('ucfirst', [function() {
    return function(input) {
      return angular.isString(input) ? input.split(' ')
        .map(function (char) {
          return char.charAt(0).toUpperCase() + char.substring(1);
        }).join(' ') : input;
    }

  }]);
