/**
 * @ngdoc filter
 * @name toArray
 * @kind function
 *
 * @description
 * Convert objects into stable arrays.
 * if addKey set to true,the filter also attaches a new property
 * $key to the value containing the original key that was used in
 * the object we are iterating over to reference the property
 */
angular.module('a8m.to-array', [])
  .filter('toArray', function() {
    return function (collection, addKey) {

      if(!isObject(collection)) {
        return collection;
      }

      return !addKey
        ? toArray(collection)
        : Object.keys(collection).map(function (key) {
            return extend(collection[key], { $key: key });
          });
    }
  });
