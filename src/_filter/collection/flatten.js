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

      shallow = shallow || false;
      collection = (isObject(collection))
        ? toArray(collection)
        : collection;

      if(!isArray(collection)) {
        return collection;
      }

      return !shallow
        ? flatten(collection, 0)
        : [].concat.apply([], collection);
    }
  });

/**
 * flatten nested array (the nesting can be to any depth).
 * @param array {Array}
 * @param i {int}
 * @returns {Array}
 * @private
 */
function flatten(array, i) {
  i = i || 0;

  if(i >= array.length)
    return array;

  if(isArray(array[i])) {
    return flatten(array.slice(0,i)
      .concat(array[i], array.slice(i+1)), i);
  }
  return flatten(array, i+1);
}
