/**
 * @ngdoc filter
 * @name before-where
 * @kind function
 *
 * @description
 * get a collection and properties object, and returns all of the items
 * in the collection before the first that found with the given properties.
 */
angular.module('a8m.before-where', [])
  .filter('beforeWhere', function() {
    return function (collection, object) {

      collection = isObject(collection)
        ? toArray(collection)
        : collection;

      if(!isArray(collection) || isUndefined(object)) return collection;

      var index = collection.map( function( elm ) {
        return objectContains(object, elm);
      }).indexOf( true );

      return collection.slice(0, (index === -1) ? collection.length : ++index);
    }
  });
