/**
 * @ngdoc filter
 * @name average
 * @kind function
 *
 * @description
 * calculate average number of some property in given array
 */

angular.module('a8m.math.average', ['a8m.math'])

  .filter('average', function() {
  return function(collection, prop) {
  	
    if(!angular.isArray(collection)) {
      return collection;
    }
    var sum = 0;
    angular.forEach(collection,function(ele) {
      sum += ele[prop];
    });
    return sum/collection.length;
  };
});