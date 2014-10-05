/**
 * @ngdoc filter
 * @name timeFmt
 * @kind function
 *
 * @description
 * Convert difference in time to appropriate format 
 * 286 => 4 minutes ago
 */

angular.module('a8m.math.timeFmt', ['a8m.math'])

  .filter('timeFmt', ['$math', function ($math) {
    return function (seconds) {

      if(isNumber(seconds) && isFinite(seconds) && seconds % 1 === 0 && seconds >= 0) { // seconds is for sure an integer
        if(seconds < 5){
            return 'just now';            
        }else if(seconds < 60) { // within 1 minute so seconds
            return seconds + ' seconds ago';
        } else if(seconds < 3600) { // within 1 hour so minutes
            var minute = $math.round(seconds / 60);
            if(minute > 1){
                return minute + ' minutes ago';
            }else{
                return '1 minute ago';
            }          
        } else if(seconds < 86400){ // within 1 day so hours
            var hour = $math.round(seconds / 3600);
            if(hour > 1){
                return hour + ' hours ago';
            }else{
                return '1 hour ago';
            }
        } else if(seconds < 604800){  // within one week so days
            var day = $math.round(seconds / 86400);
            if(day > 1){
                return day + ' days ago';
            }else{
                return '1 day ago';
            }
        } else if(seconds < 2592000){ // within one month so weeks
            var week = $math.round(seconds / 604800);
            if(week > 1){
                return week + ' weeks ago';
            }else{
                return '1 week ago';
            }
        } else if(seconds < 31536000){ // within one year so months
            var month = $math.round(seconds / 2592000);
            if(month > 1){
                return month + ' months ago';
            }else{
                return '1 month ago';
            }
        } else{
            // years
            var year = $math.round(seconds / 31536000);
            if(year > 1){
                return year + ' years ago';
            }else{
                return '1 year ago';
            }
        }
	  } else {
		return "NaN";
	  }
    }
    
  }]);