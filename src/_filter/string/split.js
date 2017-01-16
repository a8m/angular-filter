/**
 * @ngdoc filter
 * @name split
 * @kind function
 *
 * @description
 * split a string by a provided delimiter (none '' by default) and skip first n-delimiters
 */
angular.module('a8m.split', [])
  .filter('split', function () {
    function escapeRegExp(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

    return function (input, delimiter, skip) {
      var _regexp, _matches, _splitted, _temp;

      if (isUndefined(input) || !isString(input)) {
        return null;
      }
      if (isUndefined(delimiter)) delimiter = '';
      if (isNaN(skip)) skip = 0;

      _regexp = new RegExp(escapeRegExp(delimiter), 'g');
      _matches = input.match(_regexp);
      
      if (isNull(_matches) || skip >= _matches.length) {
        return [input];
      }

      if (skip === 0) return input.split(delimiter);
      
      _splitted = input.split(delimiter);
      _temp = _splitted.splice(0, skip + 1);
      _splitted.unshift(_temp.join(delimiter));
    
      return _splitted;
    };
  })
;
