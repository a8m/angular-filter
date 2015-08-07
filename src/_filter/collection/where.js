/**
 * @ngdoc filter
 * @name where
 * @kind function
 *
 * @description
 * of each element in a collection to the given properties object,
 * returning an array of all elements that have equivalent property values.
 *
 */
angular.module('a8m.where', [])
  .filter('where', function() {
    return function (collection, object) {
      if(isUndefined(object)) return collection;
      collection = isObject(collection)
        ? toArray(collection)
        : collection;

      return collection.filter(function (elm) {
        return objectContains(object, elm);
      });
    }
  });
