/**
 * @ngdoc filter
 * @name removeSpaces
 * @kind function
 *
 * @description
 * remove spaces from string, replace with "-" or given argument
 */

angular.module('is-empty', [])
  .filter('isEmpty', function () {
    return function(collection) {
      return (isObject(collection)) ?
        !toArray(collection).length :
        !collection.length;
    }
  });
