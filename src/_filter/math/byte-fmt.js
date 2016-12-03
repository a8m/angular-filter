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

      if(isNumber(decimal) && isFinite(decimal) && decimal % 1 === 0 && decimal >= 0 &&
        isNumber(bytes) && isFinite(bytes)) {
        if(bytes < 1024) { // within 1 KB so B
          return convertToDecimal(bytes, decimal, $math) + ' B';
        } else if(bytes < 1048576) { // within 1 MB so KB
          return convertToDecimal((bytes / 1024), decimal, $math) + ' KB';
        } else if(bytes < 1073741824) { // within 1 GB so MB
          return convertToDecimal((bytes / 1048576), decimal, $math) + ' MB';
        } else if(bytes < 1099511627776 ) { // 1 TB so GB
          return convertToDecimal((bytes / 1073741824), decimal, $math) + ' GB';
        } else if(bytes < 1125899906842624) { // 1 PB so TB
          return convertToDecimal((bytes / 1099511627776), decimal, $math) + ' TB';
        } else if(bytes < 1152921504606846976) { // 1 EB so ZB
          return convertToDecimal((bytes / 1125899906842624), decimal, $math) + ' PB';
        } else if(bytes < 1180591620717411303424) { // 1 ZB so EB
          return convertToDecimal((bytes / 1152921504606846976), decimal, $math) + ' EB';
        } else if(bytes < 1208925819614629174706176) { // 1 YB so ZB
          return convertToDecimal((bytes / 1180591620717411303424), decimal, $math) + ' ZB';
        } else { // 1 YB or more
          return convertToDecimal((bytes / 1208925819614629174706176), decimal, $math) + ' YB';
        }

      }
      return "NaN";
    }
  }]);