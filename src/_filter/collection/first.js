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
  .filter('first', ['$parse', function( $parse ) {
    return function(collection) {

      var n
        , getter
        , args;

      collection = (isObject(collection))
        ? toArray(collection)
        : collection;

      if(!isArray(collection)) {
        return collection;
      }

      args = Array.prototype.slice.call(arguments, 1);
      n = (isNumber(args[0])) ? args[0] : 1;
      getter = (!isNumber(args[0]))  ? args[0] : (!isNumber(args[1])) ? args[1] : undefined;

      return (args.length) ? getFirstMatches(collection, n,(getter) ? $parse(getter) : getter) :
        collection[0];
    }
  }]);
