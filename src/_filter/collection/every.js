/**
 * @ngdoc filter
 * @name every
 * @kind function
 *
 * @description
 * Checks if given expression is present in all members in the collection
 *
 */
angular.module('a8m.every', [])
  .filter('every', ['$parse', function($parse) {
    return function (collection, expression) {
      collection = isObject(collection) ? toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(expression)) {
        return true;
      }

      return collection.every( function(elm) {
        return (isObject(elm) || isFunction(expression))
          ? $parse(expression)(elm)
          : elm === expression;
      });
    }
  }]);
