/**
 * @ngdoc filter
 * @name removeWith
 * @kind function
 *
 * @description
 * get collection and properties object, and removed elements
 * with this properties
 */

angular.module('a8m.remove-with', [])
  .filter('removeWith', function() {
    return function (collection, object) {

      if(isUndefined(object)) {
        return collection;
      }
      collection = isObject(collection)
        ? toArray(collection)
        : collection;

      return collection.filter(function (elm) {
        return !objectContains(object, elm);
      });
    }
  });
