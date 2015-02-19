/**
 * @ngdoc filter
 * @name formatBytes
 * @kind function
 *
 * @description
 * Convert bytes into appropriate display 
 * 1024 kilobytes => 1 MB
 */
angular.module('a8m.math.kbFmt', ['a8m.math'])
  .filter('kbFmt', ['$math', function ($math) {
    return function (bytes, decimal) {

      if(isNumber(decimal) && isFinite(decimal) && decimal%1===0 && decimal >= 0 &&
        isNumber(bytes) && isFinite(bytes)) {

        if(bytes < 1024) { // within 1 MB so KB
            return convertToDecimal(bytes, decimal, $math) + ' KB';
        } else if(bytes < 1048576) { // within 1 GB so MB
            return convertToDecimal((bytes / 1024), decimal, $math) + ' MB';
        } else {
            return convertToDecimal((bytes / 1048576), decimal, $math) + ' GB';
        }
		  }
			return "NaN";
    }
}]);