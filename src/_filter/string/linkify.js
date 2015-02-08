/**
 * @ngdoc filter
 * @name linkify
 * @kind function
 *
 * @description
 * takes string/html and scans for any links and convert them to links.
 * Supports converting to ftp, mails and normal url links.
 */

angular.module('a8m.linkify', [])

    .filter('linkify',[ function () {
        return function (input) {

            var stringToBeReturn = '';

            // replace for url links and ftp links
            stringToBeReturn = input.replace(/((?:ht|f)tps?:\/?\/?([^\s|^\<]+))/g, "<a target='_blank' href='$1'>$2</a>");

            // replace for email links
            return stringToBeReturn.replace(/(?:([^\s|^\>]+\@[0-9a-zA-Z\_]+\.[^\s|^\<]+))/g, "<a href='mailto:$1'>$1</a>");
        }
    }]);
