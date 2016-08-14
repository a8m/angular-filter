/**
 * @ngdoc filter
 * @name mode
 * @kind function
 *
 * @description
 * Math.mode will get an array and return the mode value.
 */
angular.module('a8m.math.mode', ['a8m.math'])
  .filter('mode', ['$math', function ($math) {
    return function (input) {

      if(!isArray(input)) {
        return input;
      }
      
      var modeMap = {};
      var mode = input[0];
      var maxCount = 1;
      for (var i = 0; i < input.length; i++) {
          var val = input[i];
          if(isDefined(modeMap[val])){
              modeMap[val]++;
          } else {
              modeMap[val] = 1;
          }
          
          if(modeMap[val] > maxCount){
    		  mode = val;
    		  maxCount = modeMap[val];
    	  }
      }

      return mode;
    };
  }]);