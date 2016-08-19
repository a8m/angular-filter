/**
 * @ngdoc filter
 * @name mean
 * @kind function
 *
 * @description
 * Math.mean will get an array and return the mean value. if an expression
 * is provided, will return mean value by expression.
 */

angular.module('a8m.math.mean', ['a8m.math', 'a8m.math.sum'])

  .filter('mean', ['$math', 'sumFilter', function ($math, sumFilter) {
    return function (input) {

	  if(!isArray(input) || !isNumericArray(input)){
	    return input;
	  }
	  
      return sumFilter(input) / input.length;
    };
	
	/**
	 * Check if the given array is numeric.
	 * @private
	 * @param array An array given by the input.
	 * @returns {boolean}
	 */
	function isNumericArray(array){
		var result = true;
		forEach(array, function(element){
			if(!isNumber(element)){
				result = false;
				return;
			}
		});
		return result;
	}

  }]);