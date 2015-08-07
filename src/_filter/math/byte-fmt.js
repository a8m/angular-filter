/**
 * @ngdoc filter
 * @name formatBytes
 * @kind function
 *
 * @description
 * Convert bytes into appropriate display 
 * 1024 bytes => 1 KB
 */
angular.module('a8m.math.byteFmt', ['a8m.math'])
  .filter('byteFmt', ['$math', function ($math) {
    return function (bytes, decimal) {

      if(isNumber(decimal) && isFinite(decimal) && decimal%1===0 && decimal >= 0 &&
        isNumber(bytes) && isFinite(bytes)) {
        if(bytes < 1024) { // within 1 KB so B
          return convertToDecimal(bytes, decimal, $math) + ' B';
        } else if(bytes < 1048576) { // within 1 MB so KB
          return convertToDecimal((bytes / 1024), decimal, $math) + ' KB';
        } else if(bytes < 1073741824){ // within 1 GB so MB
          return convertToDecimal((bytes / 1048576), decimal, $math) + ' MB';
        } else { // GB or more
          return convertToDecimal((bytes / 1073741824), decimal, $math) + ' GB';
        }

      }
      return "NaN";
    }
  }]);