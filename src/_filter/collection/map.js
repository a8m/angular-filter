/**
 * @ngdoc filter
 * @name map
 * @kind function
 *
 * @description
 * Returns a new collection of the results of each expression execution.
 */
angular.module('a8m.map', [])
  .filter('map', ['$parse', function($parse) {
    return function (collection, expression) {

      collection = isObject(collection)
        ? toArray(collection)
        : collection;

      if(!isArray(collection) || isUndefined(expression)) {
        return collection;
      }

      return collection.map(function (elm) {
        return $parse(expression)(elm);
      });
    }
  }]);
