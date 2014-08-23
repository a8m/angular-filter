/**
 * @ngdoc provider
 * @name filterWatcher
 * @kind function
 *
 * @description
 * filterWatchers is a _privateProvider
 * It's create to solve the problem of $rootScope:infdig(Infinite $digest loop) when using
 * some filters on the view.
 */

angular.module('a8m.filter-watcher', [])
  .provider('filterWatcher', function() {

    var filterPrefix = '_$$';

    /**
     * @description
     * change the prefix name for filters on watch phase
     * @param prefix
     * @returns {filterWatcher}
     */
    this.setPrefix = function(prefix) {
      filterPrefix = prefix;
      return this;
    };

    this.$get = ['$window', function($window) {

      var $$timeout = $window.setTimeout;

      /**
       * @description
       * return the filter full name
       * @param name
       * @returns {string}
       * @private
       */
      function _getFullName(name) {
        return filterPrefix + name;
      }

      /**
       * @description
       * return whether or not this object is watched in current phase
       * @param fName
       * @param object
       * @returns {boolean}
       * @private
       */
      function _isWatched(fName, object) {
        return isDefined(object[fName]);
      }

      /**
       * @description
       * return the object.$$filterName instance in current phase
       * @param name
       * @param object
       * @private
       */
      function _watch(name, object) {
        var fName = _getFullName(name);

        if(!_isWatched(fName, object)) {
          //Create new instance
          Object.defineProperty(object, fName, {
            enumerable: true,
            configurable: true,
            value: {}
          });
        }
        return object[fName];
      }

      /**
       * @description
       * destroy/delete current watch instance
       * @param name
       * @param object
       * @private
       */
      function _destroy(name, object) {
        return $$timeout(function() {
          delete object[_getFullName(name)];
        });
      }

      return {
        $watch: _watch,
        $destroy: _destroy
      }

    }];

  });