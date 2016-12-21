/**
 * @ngdoc filter
 * @name titleize
 * @kind function
 *
 * @description
 * title-case a string
 */
angular.module('a8m.titleize', [])
  .filter('titleize', function () {
    return function titleCase(str) {
      if(!str) return undefined
      return str
        .split(' ')
        .map(function(i) {
          return i[0].toUpperCase() + i.substring(1);
        })
        .join(' ');
    }});
