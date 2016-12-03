/**
 * @ngdoc filter
 * @name toRadians
 * @kind function
 *
 * @description
 * Convert angle from degrees to radians
 */
angular.module('a8m.math.radians', [])
  .filter('radians', function() {
    return function (degrees, decimal) {
      // if decimal is not an integer greater than -1, we cannot do. quit with error "NaN"
      // if degrees is not a real number, we cannot do also. quit with error "NaN"
      if(isNumber(decimal) && isFinite(decimal) && decimal%1===0 && decimal >= 0 &&
        isNumber(degrees) && isFinite(degrees)) {
        var radians = (degrees * 3.14159265359) / 180;
        return Math.round(radians * Math.pow(10,decimal)) / (Math.pow(10,decimal));
      }
      return 'NaN';
    }
  });

 
 