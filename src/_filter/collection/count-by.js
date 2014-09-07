/**
 * @ngdoc filter
 * @name countBy
 * @kind function
 *
 * @description
 * Sorts a list into groups and returns a count for the number of objects in each group.
 */

angular.module('a8m.count-by', [])

  .filter('countBy', function () {
    return function (collection, property) {

      var result = {},
        prop;

      collection = (isObject(collection)) ? toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(property)) {
        return collection;
      }

      collection.forEach( function( elm ) {
        prop = elm[property];

        if(!result[prop]) {
          result[prop] = 0;
        }

        result[prop]++;
      });

      return result;
    }
  });
