/**
 * @ngdoc filter
 * @name formatBytes
 * @kind function
 *
 * @description
 * Convert number into abbreviations.
 * i.e: K for one thousand, M for Million, B for billion
 * e.g: number of users:235,221, decimal:1 => 235.2 K
 */

angular.module('a8m.math.shortFmt', ['a8m.math'])

.filter('shortFmt', ['$math', function($math) {
    return $math.filterFactory(function(number, decimal) {
            if (isNumber(decimal) 
              && isFinite(decimal) 
              && decimal % 1 === 0 
              && decimal >= 0 
              && isNumber(number) 
              && isFinite(number)) {
                var sign = 1;
                if(number < 0){
                    sign = -1;
                    number = number * sign;
                } else if (number == 0) { return '0'; }
                var k = 1000, sizes = ['',' K', ' M', ' B', ' T', ' Q'];
                // i = nth exponent of k by way of the change of base formula for logs
                // then taking the floor of that to get only the integer value of the number
                var i = $math.floor($math.log(number) / $math.log(k));
                return (sign * (number / $math.pow(k, i))).toFixed(decimal) + sizes[i];

            } else {
                return 'NaN';
            }
        })
    }]);
