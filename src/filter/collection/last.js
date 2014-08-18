/**
 * @ngdoc filter
 * @name last
 * @kind function
 *
 * @description
 * Gets the last element or last n elements of an array
 * if callback is provided, is returns as long the callback return truthy
 */
angular.module('a8m.last', [])

  .filter('last', ['$parse', function( $parse ) {
    return function(collection) {

      var n,
        getter,
        args,
        result;

      collection = (isObject(collection)) ? toArray(collection) :
        collection;

      if(!isArray(collection)) {
        return collection;
      }

      args = Array.prototype.slice.call(arguments, 1);
      n = (isNumber(args[0])) ? args[0] : 1;
      getter = (!isNumber(args[0]))  ? args[0] : (!isNumber(args[1])) ? args[1] : undefined;

      return isArray(result = getFirstMatches(collection.reverse(), n,(getter) ? $parse(getter) : getter)) ?
        result.reverse() :
        result;
    }
  }]);
















