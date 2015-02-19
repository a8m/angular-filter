/**
 * @ngdoc module
 * @name math
 * @description
 * reference to global Math object
 */

angular.module('a8m.math', [])
  .factory('$math', ['$window', function ($window) {

    var math = $window.Math;
    math.filterFactory = function(fn){
        return function(input){
    	    input = Number(input);
    	    return input != input
    		    ? input
    		    : fn.apply(this, arguments);
        }
    }

    return math;

  }]);
