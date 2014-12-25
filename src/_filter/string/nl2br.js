/**
 * @ngdoc filter
 * @name nl2br
 * @kind function
 *
 * @description
 * nl2br - newline `\n` to `<br />`
 *
 */

angular.module('a8m.nl2br', [])

  .filter('nl2br', [function() {
    return function(input) {
      return angular.isString(input) ?
          input.replace(/(?:\r\n|\r|\n)/g, '<br/>') : input;
    }

  }]);
