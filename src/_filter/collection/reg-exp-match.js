/**
 * @ngdoc filter
 * @name regExpMatch
 * @kind function
 *
 * @description
 * Matches given value against regular expression
 */

angular.module('a8m.regExpMatch', [])
    .filter({
        regExpMatch: [regExpMatchFilter]
    });

function regExpMatchFilter() {
    return function (input, regExp, ignoreCase) {

        if ( input === undefined || regExp === undefined ) { return false; }

        //Case-sensitive by default
        ignoreCase = ignoreCase || false;

        if (!(regExp instanceof RegExp)) {
            //If user didn't pass an RegExp object we create one
            try {
                var regFlags = '';
                if ( ignoreCase ) {
                    regFlags += 'i';
                }
                //New regex matches the all string, from start to end
                regExp = new RegExp('^' + regExp + '$', regFlags);
            } catch (e) {
                return false;
            }
        }

        if (typeof (input) === 'object') {
            //If the given input is an object, check every property of the input
            //Stop iteration on the first non-matching value
            var matchingMethod = function(obj) {
                    var valid = true,
                        objKeys = Object.keys(obj);

                    for (var i = 0; i < objKeys.length && valid; i++) {
                        var valueToTest = input[objKeys[i]];
                        if ( typeof(valueToTest) === "object" ) {
                            valid = matchingMethod(valueToTest);
                        } else {
                            valid = regExp.test(obj[objKeys[i]]);
                        }
                    }
                    return valid;
                };

            return matchingMethod(input);
        }

        return regExp.test(input);
    }
}
