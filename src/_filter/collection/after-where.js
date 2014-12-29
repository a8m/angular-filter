/**
 * @ngdoc filter
 * @name after-where
 * @kind function
 *
 * @description
 * get a collection and properties object, and returns all of the items
 * in the collection after the first that found with the given properties.
 *
 */
angular.module('a8m.after-where', [])
    .filter('afterWhere', function() {
      return function (collection, object) {

        collection = (isObject(collection))
          ? toArray(collection)
          : collection;

        if(!isArray(collection) || isUndefined(object))
          return collection;

        var index = collection.map( function( elm ) {
          return objectContains(object, elm);
        }).indexOf( true );

        return collection.slice((index === -1) ? 0 : index);
      }
    });
