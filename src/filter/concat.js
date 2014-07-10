'use strict';

/**
 * @ngdoc filter
 * @name concat
 * @kind function
 *
 * @description
 * get (array/object, object/array) and return merged collection
 *
 */

angular.module('concat', [])
  //TODO:unique option ? or use unique filter to filter result
  .filter('concat', [function () {
    return function (collection, joined) {

      if (angular.isUndefined(joined)) {
        return collection;
      }
      if (angular.isArray(collection)) {
        return (angular.isObject(joined)) ?
            collection.concat(toArray(joined)) :
            collection.concat(joined);
      }

      if (angular.isObject(collection)) {
        var array = toArray(collection);
        return (angular.isObject(joined)) ?
            array.concat(toArray(joined)) :
            array.concat(joined);
      }
      return collection;
    };
  }
]);
