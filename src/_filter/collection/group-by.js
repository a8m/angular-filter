/**
 * @ngdoc filter
 * @name groupBy
 * @kind function
 *
 * @description
 * Create an object composed of keys generated from the result of running each element of a collection,
 * each key is an array of the elements.
 */


angular.module('a8m.group-by', [ 'a8m.filter-watcher' ])
  .filter('groupBy', [ '$parse', 'filterWatcher', function ( $parse, filterWatcher ) {
    return function (collection, property) {

      if(!isObject(collection) || isUndefined(property)) {
        return collection;
      }

      if (filterWatcher.isMemoized('groupBy', arguments))
        return filterWatcher.isMemoized('groupBy', arguments);

      var getters = [];
      if (angular.isArray(property)) {
        forEach(property, function(prop) {
          getters.push($parse(prop));
        })
      } else {
        getters.push($parse(property));
      }
      return filterWatcher.memoize('groupBy', arguments, this,
        _groupBy(collection, getters));

      /**
       * groupBy function
       * @param collection
       * @param getters
       * @returns {{}}
       */
      function _groupBy(collection, getters) {
        var result = {};

        forEach( collection, function( elm ) {
          var prop = [];

          forEach(getters, function(getter) {
            var p = getter(elm);
            if (angular.isUndefined(p))
              p = 'undefined';
            prop.push(p); 
          })

          if(!result[prop]) {
            result[prop] = [];
          }
          result[prop].push(elm);
        });
        return result;
      }
    }
 }]);
