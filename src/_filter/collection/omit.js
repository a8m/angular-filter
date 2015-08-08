/**
 * @ngdoc filter
 * @name omit
 * @kind function
 *
 * @description
 * filter collection by expression
 */

angular.module('a8m.omit', [])

  .filter('omit', ['$parse', function($parse) {
    return function (collection, expression) {

      collection = isObject(collection)
        ? toArray(collection)
        : collection;

      if(!isArray(collection) || isUndefined(expression)) {
        return collection;
      }

      return collection.filter(function (elm) {
        return !($parse(expression)(elm));
      });
    }
  }]);
