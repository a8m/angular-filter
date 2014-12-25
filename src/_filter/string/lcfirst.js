/**
 * @ngdoc filter
 * @name lsfirst
 * @kind function
 *
 * @description
 * lcfirst
 *
 */

angular.module('a8m.lcfirst', [])

    .filter('lcfirst', [function() {
        return function(input) {
            return angular.isString(input) ? input.charAt(0).toLowerCase() + input.substring(1) : input;
        }

    }]);
