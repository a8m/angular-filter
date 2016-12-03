/**
 * @ngdoc filter
 * @name formatBytes
 * @kind function
 *
 * @description
 * Convert bytes into appropriate display 
 * 1024 kilobytes => 1 MB
 */
angular.module('a8m.math.kbFmt', [])
  .filter('kbFmt', function () {
    var compared = [{str: 'KB', val: 1024}];
    ['MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'].forEach(function(el, i) {
      compared.push({str: el, val: compared[i].val * 1024 });
    });
    return function (bytes, decimal) {
      if(isNumber(decimal) && isFinite(decimal) && decimal%1===0 && decimal >= 0 &&
        isNumber(bytes) && isFinite(bytes)) {
        var i = 0;
        while (i < compared.length-1 && bytes >= compared[i].val) i++;
        bytes /= i > 0 ? compared[i-1].val : 1;
        return convertToDecimal(bytes, decimal) + ' ' + compared[i].str;
      }
      return 'NaN';
    }
  });