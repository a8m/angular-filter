/**
 * @ngdoc filter
 * @name groupBy
 * @kind function
 *
 * @description
 * Create an object composed of keys generated from the result of running each element of a collection,
 * each key is an array of the elements.  Specify null replacement to control sort behavior for null/undefined keys.
 */

angular.module('a8m.group-by', [ 'a8m.filter-watcher' ])

  .filter('groupBy', [ '$parse', 'filterWatcher', function ( $parse, filterWatcher ) {
    return function (collection, property, nullReplacement) {

      var result,
        getParse = $parse(property),
        get = function(el) {
          var val = getParse(el);
          if(nullReplacement !== undefined && (val == null || val == undefined)){
            return nullReplacement;
          }
          return val;
        },
        prop;

      if(!isObject(collection) || isUndefined(property)) {
        return collection;
      }

      //Add collection instance to watch list
      result = filterWatcher.$watch('groupBy', collection);

      forEach( collection, function( elm ) {
        prop = get(elm);

        if(!result[prop]) {
          result[prop] = [];
        }

        if(result[prop].indexOf( elm ) === -1) {
          result[prop].push(elm);
        }

      });

      //kill instance
      filterWatcher.$destroy('groupBy', collection);

      return result;
    }
 }]);
