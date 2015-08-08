/**
 * @ngdoc filter
 * @name concat
 * @kind function
 *
 * @description
 * get (array/object, object/array) and return merged collection
 */
angular.module('a8m.concat', [])
  .filter('concat', [function () {
    return function (collection, joined) {

      if (isUndefined(joined)) return collection;

      if (isArray(collection)) {
        return isObject(joined)
          ? collection.concat(toArray(joined))
          : collection.concat(joined);
      }

      if (isObject(collection)) {
        var array = toArray(collection);
        return (isObject(joined))
          ? array.concat(toArray(joined))
          : array.concat(joined);
      }
      return collection;
    };
  }
]);
