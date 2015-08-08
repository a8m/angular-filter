/**
 * @ngdoc filter
 * @name unique/uniq
 * @kind function
 *
 * @description
 * get collection and filter duplicate members
 * if uniqueFilter get a property(nested to) as argument it's
 * filter by this property as unique identifier
 */

angular.module('a8m.unique', [])
  .filter({
      unique: ['$parse', uniqFilter],
      uniq: ['$parse', uniqFilter]
    });

function uniqFilter($parse) {
    return function (collection, property) {

      collection = isObject(collection) ? toArray(collection) : collection;

      if (!isArray(collection)) {
        return collection;
      }

      //store all unique identifiers
      var uniqueItems = [],
          get = $parse(property);

      return (isUndefined(property))
        //if it's kind of primitive array
        ? collection.filter(function (elm, pos, self) {
          return self.indexOf(elm) === pos;
        })
        //else compare with equals
        : collection.filter(function (elm) {
          var prop = get(elm);
          if(some(uniqueItems, prop)) {
            return false;
          }
          uniqueItems.push(prop);
          return true;
      });

      //checked if the unique identifier is already exist
      function some(array, member) {
        if(isUndefined(member)) {
          return false;
        }
        return array.some(function(el) {
          return equals(el, member);
        });
      }
    }
}
