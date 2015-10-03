/**
 * @ngdoc filter
 * @name sentence-case
 * @kind function
 *
 * @description
 * sentence-case
 */
angular.module('a8m.sentence-case', [])
  .filter('sentenceCase', function() {
    return function(input) {
      return isString(input)
        ? input.split('.')
          .map(function(input){
            var found = /^[!\s]*[a-z]/.exec(input);
            return found.toString().toUpperCase()
            + input.substr(found.toString().length);
          })
          .join('.')
        : input;
      return output;
    }
  });
