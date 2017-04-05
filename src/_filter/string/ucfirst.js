/**
 * @ngdoc filter
 * @name ucfirst
 * @kind function
 *
 * @description
 * ucfirst
 */
angular.module('a8m.ucfirst', [])
  .filter({
    ucfirst: ucfirstFilter,
    titleize: ucfirstFilter
  });

function ucfirstFilter() {
  return function (input, lettersOnly) {
    if (!isString(input)) {
      return input;
    }

    var delimiter = ' ';
    var newWord = input;

    if (!!lettersOnly) {
      delimiter = '';
      newWord = input.replace(/[^a-zA-Z ]/g, '');
    }

    return newWord
      .toLowerCase()
      .split(' ')
      .map(function (ch) {
        return ch.charAt(0).toUpperCase() + ch.substring(1);
      })
      .join(delimiter);
  }
}
