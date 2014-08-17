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
      getter = (!isNumber(args[0]))  ? args[0] : (!isNumber(args[1])) ? args[1] : undefined;

      result =  collection.filter(function(elm) {
        var get = (getter) ? $parse(getter)(elm) : getter,
          rest = isDefined(getter) ? (count < n && get) : count < n;
          count = rest ? count+1 : count;
        return rest;
      });

      return (n === 1) ? result[0] : result;
    }
  }]);
