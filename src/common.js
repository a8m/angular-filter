/*jshint globalstrict:true*/
'use strict';

var isDefined = angular.isDefined,
    isUndefined = angular.isUndefined,
    isFunction = angular.isFunction,
    isString = angular.isString,
    isObject = angular.isObject,
    isArray = angular.isArray,
    forEach = angular.forEach,
    extend = angular.extend,
    copy = angular.copy,
    equals = angular.equals;


/**
 * get an object and return array of values
 * @param object
 * @returns {Array}
 */
function toArray(object) {
    var i = -1,
        props = Object.keys(object),
        result = new Array(props.length);

    while(++i < props.length) {
        result[i] = object[props[i]];
    }
    return result;
}

/**
 *
 * @param value
 * @returns {boolean}
 */
function isNull(value) {
    return value === null;
}

/**
 * return if object contains partial object
 * @param partial{object}
 * @param object{object}
 * @returns {boolean}
 */
function objectContains(partial, object) {
  var keys = Object.keys(partial);

  return keys.map(function(el) {
    return !(!object[el] || (object[el] != partial[el]));
  }).indexOf(false) == -1;

}
