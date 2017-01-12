/**
 * @ngdoc filter
 * @name dotName
 * @kind function
 *
 * @description
 * replace firstname and all middle names with a dot notation.
 */
angular.module('a8m.dot-name', [])

  .filter('dotName', function () {
    return function (input) {

      if(!isString(input)) {
        return input;
      }

      var parts = input.split(' ')
                    .filter(function (part) {
                      return part.charAt(part.length - 1) !== '.';
                    }),
          len = parts.length,
          hasComma = input.indexOf(',') > -1,          
          larstNameIdx = hasComma ? 0 : len - 1;

      if (parts.length < 2) {
        return input;
      }

      return parts.map(function(part, idx){
        if (idx === larstNameIdx) {
          return part;
        }

        return part.charAt(0) + '.';
      }).join(' ');
    }
  });
