'use strict';

/**
 * @ngdoc module
 * @name angular.filters
 * @description
 *  bunch of useful filters for angularJS
 */

angular.module('angular.filters', [

  'a8m.ucfirst',
  'a8m.uri-encode',
  'a8m.remove-spaces',
  'a8m.strip-tags',
  'a8m.stringular',
  'a8m.truncate',

  'a8m.concat',
  'a8m.unique',
  'a8m.is-empty',
  'a8m.after',
  'a8m.after-where',
  'a8m.before',
  'a8m.beforeWhere',
  'a8m.where',

  'a8m.math',
  'a8m.math.max',
  'a8m.math.min',

  'a8m.angular',
  'a8m.is-null'

]);
