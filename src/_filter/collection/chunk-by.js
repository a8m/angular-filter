/**
 * @ngdoc filter
 * @name chunkBy
 * @kind function
 *
 * @description
 * Collect data into fixed-length chunks or blocks
 */

angular.module('a8m.chunk-by', [])
  .filter('chunkBy', [function () {
    /**
     * @description
     * Get array with size `n` in `val` inside it.
     * @param n
     * @param val
     * @returns {Array}
     */
    function fill(n, val) {
      var ret = [];
      while(n--) ret[n] = val;
      return ret;
    }

    return function (array, n, fillVal) {
      if (!isArray(array)) return array;
      return array.map(function(el, i, self) {
        i = i * n;
        el = self.slice(i, i + n);
        return !isUndefined(fillVal) && el.length < n
          ? el.concat(fill(n - el.length, fillVal))
          : el;
      }).slice(0, Math.ceil(array.length / n));
    }
  }]);
