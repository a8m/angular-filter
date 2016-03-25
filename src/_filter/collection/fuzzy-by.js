/**
 * @ngdoc filter
 * @name fuzzyByKey
 * @kind function
 *
 * @description
 * fuzzy string searching by key
 */
angular.module('a8m.fuzzy-by', [])
  .filter('fuzzyBy', ['$parse', function ( $parse ) {
    return function (collection, property, search, csensitive, unaccent) {
      var prop, getter;
      var sensitive = csensitive || false;
      var nodiacritics = unaccent || false;

      collection = isObject(collection) ? toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(property)
        || isUndefined(search)) {
        return collection;
      }

      getter = $parse(property);

      return collection.filter(function(elm) {

        prop = getter(elm);
        if(!isString(prop)) {
          return false;
        }

        prop = (sensitive) ? prop : prop.toLowerCase();
        prop = (nodiacritics) ? replaceDiacritics(prop) : prop;
        search = (sensitive) ? search : search.toLowerCase();
        search = (nodiacritics) ? replaceDiacritics(search) : search;

        return hasApproxPattern(prop, search) !== false
      })
    }

 }]);
