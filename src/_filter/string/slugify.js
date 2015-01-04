/**
 * @ngdoc filter
 * @name slugify
 * @kind function
 *
 * @description
 * remove spaces from string, replace with "-" or given argument
 */

angular.module('a8m.slugify', [])

  .filter('slugify',[ function () {
    return function (input, sub) {

      var replace = (isUndefined(sub)) ? '-' : sub;

      if(isString(input)) {
        return input.toLowerCase()
          .replace(/\s+/g, replace);
      }

      return input;
    }
  }]);
