'use strict';

/**
 * @ngdoc filter
 * @name sum
 * @kind function
 *
 * @description
 * Sums an array. It can sum an array of primitives, or sum a property or nested property on an array of objects.
 *
 */
angular.module('a8m.math.max', ['a8m.math'])

    .filter('sum', function () {
        var getValueByPath = function (member, objPath) {
            // Verify that path was received and that it is a string
            if (member && objPath && typeof objPath === 'string') {
                // Breakdown path
                var pathMembers = objPath.trim().split('.');
                // If pathMembers has only one member then return the value, else call getValueByPath
                if (pathMembers.length === 1) {
                    return parseFloat(member[pathMembers[0]]) || 0;
                }
                else {
                    // member[pathMembers[0]]: Will pass the nested element
                    // pathMembers.slice(1).join('.'): Will create a new string, like objPath, but without first path member
                    return getValueByPath(member[pathMembers[0]], pathMembers.slice(1).join('.'));
                }
            } else {
                // Default value to return in case a user has passed bad parameters
                return 0;
            }
        };


        return function (input, objPath) {
            // Declare sum
            var sum = 0;

            // Determine that input is an array, or else return back the input
            if (!angular.isArray(input)) {
                return input;
            }

            input.forEach(function (member) {
                // If member is an object then getValueByPath else sum the primitive
                if (member && member.toString() === '[object Object]') {
                    sum += getValueByPath(member, objPath);
                } else {
                    sum += parseFloat(member) || 0;
                }
            });

            return sum;
        };
    });