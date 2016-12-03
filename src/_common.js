/*jshint globalstrict:true*/
'use strict';

var isDefined = angular.isDefined,
    isUndefined = angular.isUndefined,
    isFunction = angular.isFunction,
    isString = angular.isString,
    isNumber = angular.isNumber,
    isObject = angular.isObject,
    isArray = angular.isArray,
    forEach = angular.forEach,
    extend = angular.extend,
    copy = angular.copy,
    equals = angular.equals;


/**
 * @description
 * get an object and return array of values
 * @param object
 * @returns {Array}
 */
function toArray(object) {
  return isArray(object) 
    ? object 
    : Object.keys(object).map(function(key) {
      return object[key];
    });
}

/**
 * @param value
 * @returns {boolean}
 */
function isNull(value) {
    return value === null;
}

/**
 * @description
 * return if object contains partial object
 * @param partial{object}
 * @param object{object}
 * @returns {boolean}
 */
function objectContains(partial, object) {
  var keys = Object.keys(partial);

  return keys.map(function(el) {
    return (object[el] !== undefined) && (object[el] == partial[el]);
  }).indexOf(false) == -1;

}

/**
 * @description
 * search for approximate pattern in string
 * @param word
 * @param pattern
 * @returns {*}
 */
function hasApproxPattern(word, pattern) {
  // cheaper version of indexOf; instead of creating each
  // iteration new str.
  function indexOf(word, p, c) {
    var j = 0;
    while ((p + j) <= word.length) {
      if (word.charAt(p + j) == c) return j;
      j++;
    }
    return -1;
  }
  var p = 0;
  for (var i = 0; i <= pattern.length; i++) {
    var index = indexOf(word, p, pattern.charAt(i));
    if (index == -1) return false;
    p += index + 1;
  }
  return true
}

/**
 * @description
 * return the first n element of an array,
 * if expression provided, is returns as long the expression return truthy
 * @param array
 * @param n {number}
 * @param expression {$parse}
 * @return array or single object
 */
function getFirstMatches(array, n, expression) {
  var count = 0;

  return array.filter(function(elm) {
    var rest = isDefined(expression) ? (count < n && expression(elm)) : count < n;
    count = rest ? count+1 : count;

    return rest;
  });
}
/**
 * Polyfill to ECMA6 String.prototype.contains
 */
if (!String.prototype.contains) {
  String.prototype.contains = function() {
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

/**
 * @param num {Number}
 * @param decimal {Number}
 * @returns {Number}
 */
function convertToDecimal(num, decimal){
  return Math.round(num * Math.pow(10,decimal)) / (Math.pow(10, decimal));
}

/**
 * @description
 * Get an object, and return an array composed of it's properties names(nested too).
 * @param obj {Object}
 * @param stack {Array}
 * @param parent {String}
 * @returns {Array}
 * @example
 * parseKeys({ a:1, b: { c:2, d: { e: 3 } } }) ==> ["a", "b.c", "b.d.e"]
 */
function deepKeys(obj, stack, parent) {
  stack = stack || [];
  var keys = Object.keys(obj);

  keys.forEach(function(el) {
    //if it's a nested object
    if(isObject(obj[el]) && !isArray(obj[el])) {
      //concatenate the new parent if exist
      var p = parent ? parent + '.' + el : parent;
      deepKeys(obj[el], stack, p || el);
    } else {
      //create and save the key
      var key = parent ? parent + '.' + el : el;
      stack.push(key)
    }
  });
  return stack
}

/**
 * @description
 * Test if given object is a Scope instance
 * @param obj
 * @returns {Boolean}
 */
function isScope(obj) {
  return obj && obj.$evalAsync && obj.$watch;
}
