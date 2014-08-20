/**
 * @ngdoc filter
 * @name flatten
 * @kind function
 *
 * @description
 * Flattens a nested array (the nesting can be to any depth).
 * If you pass shallow, the array will only be flattened a single level
 */

angular.module('a8m.flatten', [])
  .filter('flatten', function () {
    return function(collection, shallow) {
      //WIP, should be mote forgiving, add shallow option,
      //to be more elegant + test performance
      return flatten(collection);
    }
  });


function flatten(array, i) {
  i = i || 0;
  if(i >= array.length) return array;
  if(isArray(array[i])) {
    var temp = flatten(array[i]);
    return flatten(array.slice(0,i)
      .concat(temp)
      .concat(array.slice(i+1)), 0)
  }
  return flatten(array, i+1)
}
