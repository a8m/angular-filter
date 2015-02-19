/**
 * @ngdoc filter
 * @name contains
 * @kind function
 *
 * @description
 * Checks if given expression is present in one or more object in the collection
 */
angular.module('a8m.contains', [])
  .filter({
    contains: ['$parse', containsFilter],
    some: ['$parse', containsFilter]
  });

function containsFilter( $parse ) {
    return function (collection, expression) {

      collection = (isObject(collection)) ? toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(expression)) {
        return false;
      }

      return collection.some(function(elm) {
        return (isObject(elm) || isFunction(expression))
          ? $parse(expression)(elm)
          : elm === expression;
      });

    }
 }
