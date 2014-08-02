/**
 * @ngdoc filter
 * @name filterBy
 * @kind function
 *
 * @description
 * filter by specific properties, avoid the rest
 */
angular.module('a8m.filter-by')

  .filter('filterBy', ['$parse', function( $parse ) {
    return function(collection, properties, search) {

      var comparator;

      search = (isString(search)) ? search.toLowerCase() : undefined;

      collection = (isObject(collection)) ? toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(search)) {
        return collection;
      }

      return collection.filter(function(elm) {

        return properties.some( function(prop) {

          comparator  = $parse(prop)(elm);

          return (isString(comparator)) ?
            !comparator.toLowerCase().indexOf(search) :
            false;
        })

      });

    }
  }]);