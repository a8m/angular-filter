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
      var n
        , getter
        , args
        //cuz reverse change our src collection
        //and we don't want side effects
        , reversed = copy(collection);

      reversed = isObject(reversed)
        ? toArray(reversed)
        : reversed;

      if(!isArray(reversed)) {
        return reversed;
      }

      args = Array.prototype.slice.call(arguments, 1);
      n = (isNumber(args[0])) ? args[0] : 1;
      getter = (!isNumber(args[0]))  ? args[0] : (!isNumber(args[1])) ? args[1] : undefined;

      return (args.length)
        //send reversed collection as arguments, and reverse it back as result
        ? getFirstMatches(reversed.reverse(), n,(getter) ? $parse(getter) : getter).reverse()
        //get the last element
        : reversed[reversed.length-1];
    }
  }]);
