/**
 * @ngdoc filter
 * @name fuzzy
 * @kind function
 *
 * @description
 * fuzzy string searching for array of strings, objects
 */
angular.module('a8m.fuzzy', [])
  .filter('fuzzy', function () {
    return function (collection, search, csensitive) {

      var sensitive = csensitive || false;

      collection = (isObject(collection)) ? toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(search)) {
        return collection;
      }

      search = (sensitive) ? search : search.toLowerCase();

      return collection.filter(function(elm) {

        if(isString(elm)) {
          elm = (sensitive) ? elm : elm.toLowerCase();
          return hasApproxPattern(elm, search) !== false
        }

        return (isObject(elm)) ? _hasApproximateKey(elm, search) : false;

      });

      /**
       * checks if object has key{string} that match
       * to fuzzy search pattern
       * @param object
       * @param search
       * @returns {boolean}
       * @private
       */
      function _hasApproximateKey(object, search) {
        var properties = Object.keys(object),
          prop, flag;
        return 0 < properties.filter(function (elm) {
          prop = object[elm];

          //avoid iteration if we found some key that equal[performance]
          if(flag) return true;

          if (isString(prop)) {
            prop = (sensitive) ? prop : prop.toLowerCase();
            return flag = (hasApproxPattern(prop, search) !== false);
          }

          return false;

        }).length;
      }

    }
  });
