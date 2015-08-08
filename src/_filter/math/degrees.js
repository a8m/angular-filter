/**
 * @ngdoc filter
 * @name degrees
 * @kind function
 *
 * @description
 * Convert angle from radians to degrees
 */
angular.module('a8m.math.degrees', ['a8m.math'])
  .filter('degrees', ['$math', function ($math) {
    return function (radians, decimal) {
      // if decimal is not an integer greater than -1, we cannot do. quit with error "NaN"
      // if degrees is not a real number, we cannot do also. quit with error "NaN"
      if(isNumber(decimal) && isFinite(decimal) && decimal%1===0 && decimal >= 0 &&
        isNumber(radians) && isFinite(radians)) {
        var degrees = (radians * 180) / $math.PI;
        return $math.round(degrees * $math.pow(10,decimal)) / ($math.pow(10,decimal));
      } else {
        return "NaN";
      }
    }
  }]);

 
 