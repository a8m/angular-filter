/**
 * @ngdoc filter
 * @name formatBytes
 * @kind function
 *
 * @description
 * Convert number into K for one thousand, M for Million, B for billion 
 * number of users:235,221, decimal:1 => 235.2 K
 */

angular.module('a8m.math.coolNumber', ['a8m.math'])

  .filter('coolNumber', ['$math', function ($math) {
		return function (number, decimal) {
		      
			if(typeof decimal== "number" && isFinite(decimal) && decimal%1===0 && decimal > -1 &&
					typeof number == "number" && isFinite(number)){
                    
                    if(number < 1000){ 
                        return number;
                    }else if(number < 1000000) {
                        return converToDecimal((number / 1000), decimal, $math) + ' K';
                    }else if(number < 1000000000){ 
                        return converToDecimal((number / 1000000), decimal, $math) + ' M'; 
                    }else{ 
                        return converToDecimal((number / 1000000000), decimal, $math) + ' B'; 
                    }
			}else{
					return "NaN";
			}
		}
	}]);

 
 function converToDecimal(number, decimal, $math){
    return $math.round(number * $math.pow(10,decimal)) / ($math.pow(10,decimal));
 }
 