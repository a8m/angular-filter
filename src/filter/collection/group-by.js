/**
 * @ngdoc filter
 * @name groupBy
 * @kind function
 *
 * @description
 * Reverses a string or collection
 */

angular.module('a8m.group-by', [])

  .filter('groupBy', [ '$parse', function ( $parse ) {
    return function (collection, property) {

      var result = {},
        get = $parse(property),
        prop;

      collection = (isObject(collection)) ? toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(property)) {
        return collection;
      }

      collection.forEach( function( elm ) {
        prop = get(elm);

        if(!result[prop]) {
          result[prop] = [];
        }

        result[prop].push(elm);
      });

      return result;
    }
 }]);
