'use strict';

/**
 * @ngdoc filter
 * @name concat
 * @kind function
 *
 * @description
 * get (array/object, object/array) and return merged collection
 *
 */

function concatFilter() {
  return function(collection, joined) {

    if(angular.isUndefined(joined)) {
      return collection;
    }
    if(angular.isArray(collection)) {
      return (angular.isObject(joined)) ?
        collection.concat(toArray(joined)) :
        collection.concat(joined);
    }

    if(angular.isObject(collection)) {
      var array = toArray(collection);
      return (angular.isObject(joined)) ?
        array.concat(toArray(joined)) :
        array.concat(joined);
    }
    return collection;
  }
}


function toArray(object) {
  var i = -1,
    props = Object.keys(object),
    result = new Array(props.length);

  while(++i < props.length) {
    result[i] = object[props[i]];
  }
  return result;
}
