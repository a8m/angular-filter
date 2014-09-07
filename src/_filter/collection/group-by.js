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

  .filter('groupBy', [ 'filterWatcher', function ( filterWatcher ) {
    return function (collection, property) {

      var result,
        prop;

      if(!isObject(collection) || isUndefined(property)) {
        return collection;
      }

      //Add collection instance to watch list
      result = filterWatcher.$watch('groupBy', collection);

      forEach( collection, function( elm ) {
        prop = elm[property];

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
