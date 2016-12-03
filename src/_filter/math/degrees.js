/**
 * @ngdoc filter
 * @name degrees
 * @kind function
 *
 * @description
 * Convert angle from radians to degrees
 */
angular.module('a8m.math.degrees', [])
  .filter('degrees', function () {
    return function (radians, decimal) {
      // if decimal is not an integer greater than -1, we cannot do. quit with error "NaN"
      // if degrees is not a real number, we cannot do also. quit with error "NaN"
      if(isNumber(decimal) && isFinite(decimal) && decimal%1===0 && decimal >= 0 &&
        isNumber(radians) && isFinite(radians)) {
        var degrees = (radians * 180) / Math.PI;
        return Math.round(degrees * Math.pow(10,decimal)) / (Math.pow(10,decimal));
      } else {
        return 'NaN';
      }
    }
  });

 
 