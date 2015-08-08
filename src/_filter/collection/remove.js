
/**
 * @ngdoc filter
 * @name remove
 * @kind function
 *
 * @description
 * remove specific members from collection
 */

angular.module('a8m.remove', [])

  .filter('remove', function () {
    return function (collection) {
      collection = isObject(collection) ? toArray(collection) : collection;
      var args = Array.prototype.slice.call(arguments, 1);

      if(!isArray(collection)) {
        return collection;
      }

      return collection.filter( function( member ) {
        return !args.some(function(nest) {
          return equals(nest, member);
        })
      });
    }
  });
