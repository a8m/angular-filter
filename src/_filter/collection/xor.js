/**
 * @ngdoc filter
 * @name xor
 * @kind function
 *
 * @description
 * Exclusive or filter by expression
 */

angular.module('a8m.xor', [])

  .filter('xor', ['$parse', function($parse) {
    return function (col1, col2, expression) {

      expression = expression || false;

      col1 = (isObject(col1)) ? toArray(col1) : col1;
      col2 = (isObject(col2)) ? toArray(col2) : col2;

      if(!isArray(col1) || !isArray(col2)) return col1;

      return col1.concat(col2)
        .filter(function(elm) {
          return !(some(elm, col1) && some(elm, col2));
        });

      function some(el, col) {
        var getter = $parse(expression);
        return col.some(function(dElm) {
          return expression
            ? equals(getter(dElm), getter(el))
            : equals(dElm, el);
        });
      }
    }
  }]);
