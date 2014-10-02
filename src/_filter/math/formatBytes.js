/**
 * @ngdoc filter
 * @name formatBytes
 * @kind function
 *
 * @description
 * Convert bytes into appropriate display 
 * 1024 bytes => 1 KB
 */

angular.module('a8m.math.formatBytes', ['a8m.math'])

  .filter('formatBytes', ['$math', function ($math) {
		return function (bytes, decimal) {
		      
			if(typeof decimal== "number" && isFinite(decimal) && decimal%1===0 && decimal > -1 &&
					typeof bytes == "number" && isFinite(bytes)){
                    
                    if(bytes < 1024){ // within 1 KB so B
                        return converToDecimal(bytes, decimal, $math) + ' B';
                    }else if(bytes < 1048576) { // within 1 MB so KB
                        return converToDecimal((bytes / 1024), decimal, $math) + ' KB';
                    }else if(bytes < 1073741824){ // within 1 GB so MB
                        return converToDecimal((bytes / 1048576), decimal, $math) + ' MB'; 
                    }else{ // GB or more
                        return converToDecimal((bytes / 1073741824), decimal, $math) + ' GB'; 
                    }
			}else{
					return "NaN";
			}
		}
	}]);

 
 function converToDecimal(bytes, decimal, $math){
    return $math.round(bytes * $math.pow(10,decimal)) / ($math.pow(10,decimal));
 }
 