/**
 * @ngdoc filter
 * @name phone-us
 * @kind function
 *
 * @description
 * format a string or a number into a us-style
 * phone number in the form (***) ***-****
 */
angular.module('a8m.phoneUS', [])
  .filter('phoneUS', function () {
    return function(num) {
      num += '';
      return '(' + num.slice(0, 3) + ') ' + num.slice(3, 6) + '-' + num.slice(6);
    }
  });
