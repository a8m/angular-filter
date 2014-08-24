/**
 * @ngdoc filter
 * @name stripTags
 * @kind function
 *
 * @description
 * strip html tags from string
 */

angular.module('a8m.strip-tags', [])
  .filter('stripTags', function () {
    return function(input) {
      if(isString(input)) {
        return input.replace(/<\S[^><]*>/g, '');
      }
      return input;
    }
  });
