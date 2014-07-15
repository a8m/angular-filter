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
    return function(text, length, preserve, suffix) {
      text = text || '';
      length = length || 30;
      preserve = preserve || false;
      suffix = suffix || '';

      if(text.length > length) {
        text = text.substring(0, length);

        if (preserve) {
          text = text.substring(0, Math.min(text.length, text.lastIndexOf(' ')));
        }

        text = text + suffix;
      }

      return text;
    };
  });
