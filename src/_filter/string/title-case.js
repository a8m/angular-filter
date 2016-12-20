/**
 * @ngdoc filter
 * @name title-case
 * @kind function
 *
 * @description
 * get string with {n} and replace match with enumeration values
 */
angular.module('a8m.title-case', [])
  .filter('titleCase', function () {
    return function titleCase(str) {
      if(!str) return undefined
      return str
        .split(' ')
        .map(function(i) {
          return i[0].toUpperCase() + i.substring(1);
        })
        .join(' ');
    }});