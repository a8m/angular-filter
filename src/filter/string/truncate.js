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
    return function(input, length, suffix, preserve) {

      if(!isString(input)) return input;

      length = isUndefined(length) ? input.length : length;
      preserve = preserve || false;
      suffix = suffix || '';

      return input.substring(0, (preserve) ?
          ((input.indexOf(' ', length) === -1) ? length : input.indexOf(' ', length)) :
          length) + suffix;

    };
  });
