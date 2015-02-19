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
      return isString(input)
        ? input.replace(/<\S[^><]*>/g, '')
        : input;
    }
  });
