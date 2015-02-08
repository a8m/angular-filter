/**
 * @ngdoc filter
 * @name defaults
 * @kind function
 *
 * @description
 * defaultsFilter allows to specify a default fallback value for properties that resolve to undefined.
 */
angular.module('a8m.defaults', [])
  .filter('defaults', ['$parse', function( $parse ) {
    return function(collection, defaults) {

      collection = (isObject(collection)) ? toArray(collection) : collection;

      if(!isArray(collection) || !isObject(defaults)) {
        return collection;
      }

      var keys = deepKeys(defaults);

      collection.forEach(function(elm) {
        //loop through all the keys
        keys.forEach(function(key) {
          var getter = $parse(key);
          var setter = getter.assign;
          //if it's not exist
          if(isUndefined(getter(elm))) {
            //get from defaults, and set to the returned object
            setter(elm, getter(defaults))
          }
        });
      });

      return collection;
    }
  }]);