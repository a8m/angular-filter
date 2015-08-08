/**
 * @ngdoc filter
 * @name searchField
 * @kind function
 *
 * @description
 * for each member, join several strings field and add them to
 * new field called 'searchField' (use for search filtering)
 */
angular.module('a8m.search-field', [])
  .filter('searchField', ['$parse', function ($parse) {
    return function (collection) {

      var get, field;

      collection = isObject(collection) ? toArray(collection) : collection;

      var args = Array.prototype.slice.call(arguments, 1);

      if(!isArray(collection) || !args.length) {
        return collection;
      }

      return collection.map(function(member) {

        field = args.map(function(field) {
          get = $parse(field);
          return get(member);
        }).join(' ');

        return extend(member, { searchField: field });
      });
    }
  }]);
