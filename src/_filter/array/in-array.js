/**
 * @ngdoc filter
 * @name inArray
 * @kind function
 *
 * @description
 * filter an array by a property in another array based on example http://jsbin.com/owIXEPE/2/edit?html,js,output
 */
angular.module('a8m.in-array', [])
  .filter('inArray', ['$filter', function($filter) {
    return function(list, arrayFilter, element){
      if (arrayFilter) {
        return $filter("filter")(list, function(listItem) {
          return arrayFilter.indexOf(listItem[element]) != -1;
        });
      } else {
        return list;
      }
    }
  }]);

