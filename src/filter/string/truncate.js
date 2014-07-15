'use strict';
/**
 * @ngdoc filter
 * @name truncate
 * @kind function
 *
 * @description
 * truncates a string given a specified length, providing a custom string to denote an omission.
 */

angular.module('a8m.truncate', [])
  .filter('truncate', function () {
    return function(input, length, preserve, suffix) {

      if(!isString(input)) return input;

      length = isUndefined(length) ? input.length : length;
      preserve = preserve || false;
      suffix = suffix || '';

      return input.substring(0, (preserve) ? (input.indexOf(' ', length)) : length) + suffix;

    };
  });
