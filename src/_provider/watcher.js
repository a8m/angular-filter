/**
 * @ngdoc provider
 * @name filterWatcher
 * @kind function
 *
 * @description
 * store specific filters result in $$cache, based on scope life time(avoid memory leak).
 * on scope.$destroy remove it's cache from $$cache container
 */

angular.module('a8m.filter-watcher', [])
  .provider('filterWatcher', function() {

    this.$get = [function() {

      /**
       * Cache storing
       * @type {Object}
       */
      var $$cache = {};

      /**
       * Scope listeners container
       * scope.$destroy => remove all cache keys
       * bind to current scope.
       * @type {Object}
       */
      var $$listeners = {};

      /**
       * @description
       * get `HashKey` string based on the given arguments.
       * @param fName
       * @param args
       * @returns {string}
       */
      function getHashKey(fName, args) {
        return [fName, JSON.stringify(args)]
          .join('#')
          .replace(/"/g,'');
      }

      /**
       * @description
       * fir on $scope.$destroy,
       * remove cache based scope from `$$cache`,
       * and remove itself from `$$listeners`
       * @param event
       */
      function removeCache(event) {
        var id = event.targetScope.$id;
        forEach($$listeners[id], function(key) {
          delete $$cache[key];
        });
        delete $$listeners[id];
      }

      /**
       * @description
       * Store hashKeys in $$listeners container
       * on scope.$destroy, remove them all(bind an event).
       * @param scope
       * @param hashKey
       * @returns {*}
       */
      function addListener(scope, hashKey) {
        var id = scope.$id;
        if(isUndefined($$listeners[id])) {
          scope.$on('$destroy', removeCache);
          $$listeners[id] = [];
        }
        return $$listeners[id].push(hashKey);
      }

      /**
       * @description
       * return the `cacheKey` or undefined.
       * @param filterName
       * @param args
       * @returns {*}
       */
      function $$isMemoized(filterName, args) {
        var hashKey = getHashKey(filterName, args);
        return $$cache[hashKey];
      }

      /**
       * @description
       * store `result` in `$$cache` container, based on the hashKey.
       * add $destroy listener and return result
       * @param filterName
       * @param args
       * @param scope
       * @param result
       * @returns {*}
       */
      function $$memoize(filterName, args, scope, result) {
        var hashKey = getHashKey(filterName, args);
        //store result in `$$cache` container
        $$cache[hashKey] = result;
        //add `$destroy` listener
        addListener(scope, hashKey);
        return result;
      }

      return {
        isMemoized: $$isMemoized,
        memoize: $$memoize
      }

    }];
  });



















