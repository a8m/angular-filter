/**
 * @ngdoc filter
 * @name isEmpty
 * @kind function
 *
 * @description
 * get collection or string and return if it empty
 */
angular.module('a8m.is-empty', [])
  .filter('isEmpty', function () {
    return function(collection) {
      return isObject(collection)
        ? !toArray(collection).length
        : !collection.length;
    }
  });
