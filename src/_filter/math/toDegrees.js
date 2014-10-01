/**
 * @ngdoc filter
 * @name toDegrees
 * @kind function
 *
 * @description
 * Convert angle from radians to degrees
 *
 */

angular.module('a8m.math.toDegrees', ['a8m.math'])

  .filter('toDegrees', ['$math', function ($math) {
		return function (radians, decimal) {
		// if decimal is not an integer greater than -1, we cannot do. quit with error "NaN"
		// if degrees is not a real number, we cannot do also. quit with error "NaN"
			if(typeof decimal== "number" && isFinite(decimal) && decimal%1===0 && decimal > -1 &&
					typeof radians== "number" && isFinite(radians)){
					var degrees = (radians * 180) / 3.14159265359;
				return $math.round(degrees * $math.pow(10,decimal)) / ($math.pow(10,decimal));
			}else{
					return "NaN";
			}
		}
	}]);

 
 