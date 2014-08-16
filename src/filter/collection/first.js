/**
 * @ngdoc filter
 * @name first
 * @kind function
 *
 * @description
 * Gets the first element or first n elements of an array
 * if callback is provided, is returns as long the callback return truthy
 */
angular.module('a8m.first', [])

  .filter('filterBy', ['$parse', function( $parse ) {
    return function(collection) {

      var n,
        count = ~~n,
        getter,
        result,
        args;

      collection = (isObject(collection)) ? toArray(collection) :
        collection;

      if(!isArray(collection)) {
        return collection;
      }

      args = Array.prototype.slice.call(arguments, 1);
      n = (isNumber(args[0])) ? args[0] : 1;
      getter = (isString(args[0]))  ? args[0] : (isString(args[1])) ? (isString(args[1])) : false;

      //in progress(length == 1) ? object : array;
      return collection.filter(function(elm) {
        return (count >= n)
      });

    }
  }]);
