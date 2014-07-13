/**
 * @ngdoc filter
 * @name stripTags
 * @kind function
 *
 * @description
 * strip html tags from string
 */

angular.module('strip-tags', [])
  .filter('stripTags', function () {
    return function(input) {
      if(isString) {
        return input.replace(/<\S[^><]*>/g, '');
      }
      return input;
    }
  });
