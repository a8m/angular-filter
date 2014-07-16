'use strict';

/**
 * @ngdoc filter
 * @name a8m.angular
 * @kind function
 *
 * @description
 * reference to angular function
 */

angular.module('a8m.angular', [])

    .filter('isUndefined', function () {
      return function (input) {
        return isUndefined(input);
      }
    })
    .filter('isDefined', function() {
      return function (input) {
        return isDefined(input);
      }
    })
    .filter('isFunction', function() {
      return function (input) {
        return isFunction(input);
      }
    })
    .filter('isString', function() {
      return function (input) {
        return isString(input)
      }
    })
    .filter('isArray', function() {
      return function (input) {
        return isArray(input);
      }
    })
    .filter('isObject', function() {
      return function (input) {
        return isObject(input);
      }
    })
    .filter('isEqual', function() {
      return function (o1, o2) {
        return equals(o1, o2);
      }
    });
