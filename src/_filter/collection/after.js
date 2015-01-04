/**
 * @ngdoc filter
 * @name after
 * @kind function
 *
 * @description
 * get a collection and specified count, and returns all of the items
 * in the collection after the specified count.
 *
 */

angular.module('a8m.after', [])
    .filter('after', function() {
      return function (collection, count) {
        collection = (isObject(collection))
          ? toArray(collection)
          : collection;

        return (isArray(collection))
          ? collection.slice(count)
          : collection;
      }
    });
