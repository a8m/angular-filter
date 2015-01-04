/**
 * Bunch of useful filters for angularJS(with no external dependencies!)
 * @version v0.5.2 - 2014-12-10 * @link https://github.com/a8m/angular-filter
 * @author Ariel Mashraki <ariel@mashraki.co.il>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function ( window, angular, undefined ) {
/*jshint globalstrict:true*/
'use strict';

var isDefined = angular.isDefined,
    isUndefined = angular.isUndefined,
    isFunction = angular.isFunction,
    isString = angular.isString,
    isNumber = angular.isNumber,
    isObject = angular.isObject,
    isArray = angular.isArray,
    forEach = angular.forEach,
    extend = angular.extend,
    copy = angular.copy,
    equals = angular.equals;


/**
 * @description
 * get an object and return array of values
 * @param object
 * @returns {Array}
 */
function toArray(object) {
  return isArray(object) ? object :
    Object.keys(object).map(function(key) {
      return object[key];
    });
}

/**
 * @param value
 * @returns {boolean}
 */
function isNull(value) {
    return value === null;
}

/**
 * @description
 * return if object contains partial object
 * @param partial{object}
 * @param object{object}
 * @returns {boolean}
 */
function objectContains(partial, object) {
  var keys = Object.keys(partial);

  return keys.map(function(el) {
    return (object[el] !== undefined) && (object[el] == partial[el]);
  }).indexOf(false) == -1;

}

/**
 * @description
 * search for approximate pattern in string
 * @param word
 * @param pattern
 * @returns {*}
 */
function hasApproxPattern(word, pattern) {
  if(pattern === '')
    return word;

  var index = word.indexOf(pattern.charAt(0));

  if(index === -1)
    return false;

  return hasApproxPattern(word.substr(index+1), pattern.substr(1))
}

/**
 * @description
 * return the first n element of an array,
 * if expression provided, is returns as long the expression return truthy
 * @param array
 * @param n {number}
 * @param expression {$parse}
 * @return array or single object
 */
function getFirstMatches(array, n, expression) {
  var count = 0;

  return array.filter(function(elm) {
    var rest = isDefined(expression) ? (count < n && expression(elm)) : count < n;
    count = rest ? count+1 : count;

    return rest;
  });
}
/**
 * Polyfill to ECMA6 String.prototype.contains
 */
if (!String.prototype.contains) {
  String.prototype.contains = function() {
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

/**
 * @param num {Number}
 * @param decimal {Number}
 * @param $math
 * @returns {Number}
 */
function convertToDecimal(num, decimal, $math){
  return $math.round(num * $math.pow(10,decimal)) / ($math.pow(10,decimal));
}

/**
 * @description
 * Get an object, and return an array composed of it's properties names(nested too).
 * @param obj {Object}
 * @param stack {Array}
 * @param parent {String}
 * @returns {Array}
 * @example
 * parseKeys({ a:1, b: { c:2, d: { e: 3 } } }) ==> ["a", "b.c", "b.d.e"]
 */
function deepKeys(obj, stack, parent) {
  stack = stack || [];
  var keys = Object.keys(obj);

  keys.forEach(function(el) {
    //if it's a nested object
    if(isObject(obj[el]) && !isArray(obj[el])) {
      //concatenate the new parent if exist
      var p = parent ? parent + '.' + el : parent;
      deepKeys(obj[el], stack, p || el);
    } else {
      //create and save the key
      var key = parent ? parent + '.' + el : el;
      stack.push(key)
    }
  });
  return stack
}

/**
 * @description
 * Test if given object is a Scope instance
 * @param obj
 * @returns {Boolean}
 */
function isScope(obj) {
  return obj && obj.$evalAsync && obj.$watch;
}

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
        return angular.isUndefined(input);
      }
    })
    .filter('isDefined', function() {
      return function (input) {
        return angular.isDefined(input);
      }
    })
    .filter('isFunction', function() {
      return function (input) {
        return angular.isFunction(input);
      }
    })
    .filter('isString', function() {
      return function (input) {
        return angular.isString(input)
      }
    })
    .filter('isNumber', function() {
      return function (input) {
        return angular.isNumber(input);
      }
    })
    .filter('isArray', function() {
      return function (input) {
        return angular.isArray(input);
      }
    })
    .filter('isObject', function() {
      return function (input) {
        return angular.isObject(input);
      }
    })
    .filter('isEqual', function() {
      return function (o1, o2) {
        return angular.equals(o1, o2);
      }
    });

/**
 * @ngdoc filter
 * @name a8m.conditions
 * @kind function
 *
 * @description
 * reference to math conditions
 */
 angular.module('a8m.conditions', [])

  .filter({
    isGreaterThan  : isGreaterThanFilter,
    '>'            : isGreaterThanFilter,

    isGreaterThanOrEqualTo  : isGreaterThanOrEqualToFilter,
    '>='                    : isGreaterThanOrEqualToFilter,

    isLessThan  : isLessThanFilter,
    '<'         : isLessThanFilter,

    isLessThanOrEqualTo  : isLessThanOrEqualToFilter,
    '<='                 : isLessThanOrEqualToFilter,

    isEqualTo  : isEqualToFilter,
    '=='       : isEqualToFilter,

    isNotEqualTo  : isNotEqualToFilter,
    '!='          : isNotEqualToFilter,

    isIdenticalTo  : isIdenticalToFilter,
    '==='          : isIdenticalToFilter,

    isNotIdenticalTo  : isNotIdenticalToFilter,
    '!=='             : isNotIdenticalToFilter
  });

  function isGreaterThanFilter() {
    return function (input, check) {
      return input > check;
    };
  }

  function isGreaterThanOrEqualToFilter() {
    return function (input, check) {
      return input >= check;
    };
  }

  function isLessThanFilter() {
    return function (input, check) {
      return input < check;
    };
  }

  function isLessThanOrEqualToFilter() {
    return function (input, check) {
      return input <= check;
    };
  }

  function isEqualToFilter() {
    return function (input, check) {
      return input == check;
    };
  }

  function isNotEqualToFilter() {
    return function (input, check) {
      return input != check;
    };
  }

  function isIdenticalToFilter() {
    return function (input, check) {
      return input === check;
    };
  }

  function isNotIdenticalToFilter() {
    return function (input, check) {
      return input !== check;
    };
  }
/**
 * @ngdoc filter
 * @name isNull
 * @kind function
 *
 * @description
 * checks if value is null or not
 * @return Boolean
 */

angular.module('a8m.is-null', [])

    .filter('isNull', function () {
      return function(input) {
        return isNull(input);
      }
    });

/**
 * @ngdoc filter
 * @name after-where
 * @kind function
 *
 * @description
 * get a collection and properties object, and returns all of the items
 * in the collection after the first that found with the given properties.
 *
 */

angular.module('a8m.after-where', [])
    .filter('afterWhere', function() {
      return function (collection, object) {

        collection = (isObject(collection)) ?
            toArray(collection) :
            collection;

        if(!isArray(collection) || isUndefined(object))
          return collection;

        var index = collection.map( function( elm ) {
          return objectContains(object, elm);
        }).indexOf( true );

        return collection.slice((index === -1) ? 0 : index);
      }
    });

/**
 * @ngdoc filter
 * @name after
 * @kind function
 *
 * @description
 * get a collection and specified count, and returns all of the items
 * in the collection after the specified count.
 *
 */

angular.module('a8m.after', [])
    .filter('after', function() {
      return function (collection, count) {

        collection = (isObject(collection)) ?
            toArray(collection) :
            collection;

        return (isArray(collection)) ?
            collection.slice(count) :
            collection;

      }
    });

/**
 * @ngdoc filter
 * @name before-where
 * @kind function
 *
 * @description
 * get a collection and properties object, and returns all of the items
 * in the collection before the first that found with the given properties.
 *
 */

angular.module('a8m.before-where', [])
  .filter('beforeWhere', function() {
    return function (collection, object) {

      collection = (isObject(collection)) ?
        toArray(collection) :
        collection;

      if(!isArray(collection) || isUndefined(object))
        return collection;

      var index = collection.map( function( elm ) {
        return objectContains(object, elm);
      }).indexOf( true );

      return collection.slice(0, (index === -1) ? collection.length : ++index);
    }
  });

/**
 * @ngdoc filter
 * @name before
 * @kind function
 *
 * @description
 * get a collection and specified count, and returns all of the items
 * in the collection before the specified count.
 *
 */

angular.module('a8m.before', [])
    .filter('before', function() {
      return function (collection, count) {

        collection = (isObject(collection)) ?
            toArray(collection) :
            collection;

        return (isArray(collection)) ?
            collection.slice(0, (!count) ? count : --count) :
            collection;

      }
    });

/**
 * @ngdoc filter
 * @name concat
 * @kind function
 *
 * @description
 * get (array/object, object/array) and return merged collection
 *
 */

angular.module('a8m.concat', [])
  //TODO:unique option ? or use unique filter to filter result
  .filter('concat', [function () {
    return function (collection, joined) {

      if (isUndefined(joined)) {
        return collection;
      }
      if (isArray(collection)) {
        return (isObject(joined)) ?
            collection.concat(toArray(joined)) :
            collection.concat(joined);
      }

      if (isObject(collection)) {
        var array = toArray(collection);
        return (isObject(joined)) ?
            array.concat(toArray(joined)) :
            array.concat(joined);
      }
      return collection;
    };
  }
]);

/**
 * @ngdoc filter
 * @name contains
 * @kind function
 *
 * @description
 * Checks if given expression is present in one or more object in the collection
 */

angular.module('a8m.contains', [])
  .filter({
    contains: ['$parse', containsFilter],
    some: ['$parse', containsFilter]
  });

function containsFilter( $parse ) {
    return function (collection, expression) {

      collection = (isObject(collection)) ? toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(expression)) {
        return true;
      }

      return collection.some( function(elm) {

        return (isObject(elm) || isFunction(expression)) ?
          $parse(expression)(elm) :
          elm === expression;

      });

    }
 }

/**
 * @ngdoc filter
 * @name countBy
 * @kind function
 *
 * @description
 * Sorts a list into groups and returns a count for the number of objects in each group.
 */

angular.module('a8m.count-by', [])

  .filter('countBy', [ '$parse', function ( $parse ) {
    return function (collection, property) {

      var result = {},
        get = $parse(property),
        prop;

      collection = (isObject(collection)) ? toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(property)) {
        return collection;
      }

      collection.forEach( function( elm ) {
        prop = get(elm);

        if(!result[prop]) {
          result[prop] = 0;
        }

        result[prop]++;
      });

      return result;
    }
  }]);

/**
 * @ngdoc filter
 * @name defaults
 * @kind function
 *
 * @description
 * defaultsFilter allows to specify a default fallback value for properties that resolve to undefined.
 */

angular.module('a8m.defaults', [])
  .filter('defaults', ['$parse', function( $parse ) {
    return function(collection, defaults) {

      collection = (isObject(collection)) ? toArray(collection) : collection;

      if(!isArray(collection) || !isObject(defaults)) {
        return collection;
      }

      var keys = deepKeys(defaults);

      collection.forEach(function(elm) {
        //loop through all the keys
        keys.forEach(function(key) {
          var getter = $parse(key);
          var setter = getter.assign;
          //if it's not exist
          if(isUndefined(getter(elm))) {
            //get from defaults, and set to the returned object
            setter(elm, getter(defaults))
          }
        });
      });

      return collection;
    }
  }]);
/**
 * @ngdoc filter
 * @name every
 * @kind function
 *
 * @description
 * Checks if given expression is present in all members in the collection
 *
 */

angular.module('a8m.every', [])
  .filter('every', ['$parse', function($parse) {
    return function (collection, expression) {

      collection = (isObject(collection)) ? toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(expression)) {
        return true;
      }

      return collection.every( function(elm) {

        return (isObject(elm) || isFunction(expression)) ?
          $parse(expression)(elm) :
          elm === expression;
      });

    }
  }]);

/**
 * @ngdoc filter
 * @name filterBy
 * @kind function
 *
 * @description
 * filter by specific properties, avoid the rest
 */
angular.module('a8m.filter-by', [])

  .filter('filterBy', ['$parse', function( $parse ) {
    return function(collection, properties, search) {

      var comparator;

      search = (isString(search) || isNumber(search)) ?
        String(search).toLowerCase() : undefined;

      collection = (isObject(collection)) ? toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(search)) {
        return collection;
      }

      return collection.filter(function(elm) {

        return properties.some(function(prop) {

          /**
           * check if there is concatenate properties
           * example:
           * object: { first: 'foo', last:'bar' }
           * filterBy: ['first + last'] => search by full name(i.e 'foo bar')
           */
          if(!~prop.indexOf('+')) {
            comparator = $parse(prop)(elm)
          } else {
            var propList = prop.replace(new RegExp('\\s', 'g'), '').split('+');
            comparator = propList.reduce(function(prev, cur, index) {
              return (index === 1) ? $parse(prev)(elm) + ' ' + $parse(cur)(elm) :
                prev + ' ' + $parse(cur)(elm);
            });
          }

          return (isString(comparator) || isNumber(comparator)) ?
            String(comparator).toLowerCase().contains(search) :
            false;
        })

      });

    }
  }]);

/**
 * @ngdoc filter
 * @name first
 * @kind function
 *
 * @description
 * Gets the first element or first n elements of an array
 * if callback is provided, is returns as long the callback return truthy
 */
angular.module('a8m.first', [])

  .filter('first', ['$parse', function( $parse ) {
    return function(collection) {

      var n,
        getter,
        args;

      collection = (isObject(collection)) ? toArray(collection) :
        collection;

      if(!isArray(collection)) {
        return collection;
      }

      args = Array.prototype.slice.call(arguments, 1);
      n = (isNumber(args[0])) ? args[0] : 1;
      getter = (!isNumber(args[0]))  ? args[0] : (!isNumber(args[1])) ? args[1] : undefined;

      return (args.length) ? getFirstMatches(collection, n,(getter) ? $parse(getter) : getter) :
        collection[0];
    }
  }]);

/**
 * @ngdoc filter
 * @name flatten
 * @kind function
 *
 * @description
 * Flattens a nested array (the nesting can be to any depth).
 * If you pass shallow, the array will only be flattened a single level
 */

angular.module('a8m.flatten', [])
  .filter('flatten', function () {
    return function(collection, shallow) {

      shallow = shallow || false;
      collection = (isObject(collection)) ? toArray(collection)
        : collection;

      if(!isArray(collection)) {
        return collection;
      }

      return (!shallow) ? flatten(collection, 0) :
        [].concat.apply([], collection);
    }
  });

/**
 * flatten nested array (the nesting can be to any depth).
 * @param array {Array}
 * @param i {int}
 * @returns {Array}
 * @private
 */
function flatten(array, i) {
  i = i || 0;

  if(i >= array.length)
    return array;

  if(isArray(array[i])) {
    return flatten(array.slice(0,i)
      .concat(array[i], array.slice(i+1)), i);
  }
  return flatten(array, i+1);
}

/**
 * @ngdoc filter
 * @name fuzzyByKey
 * @kind function
 *
 * @description
 * fuzzy string searching by key
 */

angular.module('a8m.fuzzy-by', [])
  .filter('fuzzyBy', ['$parse', function ( $parse ) {
    return function (collection, property, search, csensitive) {

      var sensitive = csensitive || false,
        prop, getter;

      collection = (isObject(collection)) ? toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(property)
        || isUndefined(search)) {
        return collection;
      }

      getter = $parse(property);

      return collection.filter(function(elm) {

        prop = getter(elm);
        if(!isString(prop)) {
          return false;
        }

        prop = (sensitive) ? prop : prop.toLowerCase();
        search = (sensitive) ? search : search.toLowerCase();

        return hasApproxPattern(prop, search) !== false
      })
    }

 }]);
/**
 * @ngdoc filter
 * @name fuzzy
 * @kind function
 *
 * @description
 * fuzzy string searching for array of strings, objects
 */

angular.module('a8m.fuzzy', [])
  .filter('fuzzy', function () {
    return function (collection, search, csensitive) {

      var sensitive = csensitive || false;

      collection = (isObject(collection)) ? toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(search)) {
        return collection;
      }

      search = (sensitive) ? search : search.toLowerCase();

      return collection.filter(function(elm) {

        if(isString(elm)) {
          elm = (sensitive) ? elm : elm.toLowerCase();
          return hasApproxPattern(elm, search) !== false
        }

        return (isObject(elm)) ? _hasApproximateKey(elm, search) : false;

      });

      /**
       * checks if object has key{string} that match
       * to fuzzy search pattern
       * @param object
       * @param search
       * @returns {boolean}
       * @private
       */
      function _hasApproximateKey(object, search) {
        var properties = Object.keys(object),
          prop, flag;
        return 0 < properties.filter(function (elm) {
          prop = object[elm];

          //avoid iteration if we found some key that equal[performance]
          if(flag) return true;

          if (isString(prop)) {
            prop = (sensitive) ? prop : prop.toLowerCase();
            return flag = (hasApproxPattern(prop, search) !== false);
          }

          return false;

        }).length;
      }

    }
  });

/**
 * @ngdoc filter
 * @name groupBy
 * @kind function
 *
 * @description
 * Create an object composed of keys generated from the result of running each element of a collection,
 * each key is an array of the elements.
 */

angular.module('a8m.group-by', [ 'a8m.filter-watcher' ])

  .filter('groupBy', [ '$parse', 'filterWatcher', function ( $parse, filterWatcher ) {
    return function (collection, property) {

      if(!isObject(collection) || isUndefined(property)) {
        return collection;
      }

      var getterFn = $parse(property);

      return filterWatcher.isMemoized('groupBy', arguments) ||
        filterWatcher.memoize('groupBy', arguments, this,
          _groupBy(collection, getterFn));

      /**
       * groupBy function
       * @param collection
       * @param getter
       * @returns {{}}
       */
      function _groupBy(collection, getter) {
        var result = {};
        var prop;

        forEach( collection, function( elm ) {
          prop = getter(elm);

          if(!result[prop]) {
            result[prop] = [];
          }
          result[prop].push(elm);
        });
        return result;
      }
    }
 }]);

/**
 * @ngdoc filter
 * @name isEmpty
 * @kind function
 *
 * @description
 * get collection or string and return if it empty
 */

angular.module('a8m.is-empty', [])
  .filter('isEmpty', function () {
    return function(collection) {
      return (isObject(collection)) ?
        !toArray(collection).length :
        !collection.length;
    }
  });

/**
 * @ngdoc filter
 * @name last
 * @kind function
 *
 * @description
 * Gets the last element or last n elements of an array
 * if callback is provided, is returns as long the callback return truthy
 */
angular.module('a8m.last', [])

  .filter('last', ['$parse', function( $parse ) {
    return function(collection) {

      var n,
        getter,
        args,
      //cuz reverse change our src collection
      //and we don't want side effects
        reversed = copy(collection);

      reversed = (isObject(reversed)) ? toArray(reversed) :
        reversed;

      if(!isArray(reversed)) {
        return reversed;
      }

      args = Array.prototype.slice.call(arguments, 1);
      n = (isNumber(args[0])) ? args[0] : 1;
      getter = (!isNumber(args[0]))  ? args[0] : (!isNumber(args[1])) ? args[1] : undefined;

      return (args.length) ?
        //send reversed collection as arguments, and reverse it back as result
        getFirstMatches(reversed.reverse(), n,(getter) ? $parse(getter) : getter).reverse() :
        //get the last element
        reversed[reversed.length-1];
    }
  }]);

/**
 * @ngdoc filter
 * @name map
 * @kind function
 *
 * @description
 * Returns a new collection of the results of each expression execution.
 */

angular.module('a8m.map', [])

  .filter('map', ['$parse', function($parse) {
    return function (collection, expression) {

      collection = (isObject(collection)) ?
        toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(expression)) {
        return collection;
      }

      return collection.map(function (elm) {

        return $parse(expression)(elm);
      });
    }
  }]);

/**
 * @ngdoc filter
 * @name omit
 * @kind function
 *
 * @description
 * filter collection by expression
 */

angular.module('a8m.omit', [])

  .filter('omit', ['$parse', function($parse) {
    return function (collection, expression) {

      collection = (isObject(collection)) ?
        toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(expression)) {
        return collection;
      }

      return collection.filter(function (elm) {

        return !($parse(expression)(elm));
      });
    }
  }]);

/**
 * @ngdoc filter
 * @name omit
 * @kind function
 *
 * @description
 * filter collection by expression
 */

angular.module('a8m.pick', [])

  .filter('pick', ['$parse', function($parse) {
    return function (collection, expression) {

      collection = (isObject(collection)) ?
        toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(expression)) {
        return collection;
      }

      return collection.filter(function (elm) {

        return $parse(expression)(elm);
      });
    }
  }]);

/**
 * @ngdoc filter
 * @name removeWith
 * @kind function
 *
 * @description
 * get collection and properties object, and removed elements
 * with this properties
 */

angular.module('a8m.remove-with', [])
  .filter('removeWith', function() {
    return function (collection, object) {

      if(isUndefined(object)) {
        return collection;
      }
      collection = (isObject(collection)) ?
        toArray(collection) : collection;

      return collection.filter(function (elm) {
        return !objectContains(object, elm);
      });
    }
  });


/**
 * @ngdoc filter
 * @name remove
 * @kind function
 *
 * @description
 * remove specific members from collection
 */

angular.module('a8m.remove', [])

  .filter('remove', function () {
    return function (collection) {

      collection = (isObject(collection)) ? toArray(collection) : collection;

      var args = Array.prototype.slice.call(arguments, 1);

      if(!isArray(collection)) {
        return collection;
      }

      return collection.filter( function( member ) {
        return !args.some(function(nest) {
          return equals(nest, member);
        })
      });

    }
  });

/**
 * @ngdoc filter
 * @name reverse
 * @kind function
 *
 * @description
 * Reverses a string or collection
 */

angular.module('a8m.reverse', [])

    .filter('reverse',[ function () {
      return function (input) {

        input = (isObject(input)) ? toArray(input) : input;

        if(isString(input)) {
          return input.split('').reverse().join('');
        }

        return (isArray(input)) ? input.slice().reverse() : input;
      }
    }]);


/**
 * @ngdoc filter
 * @name searchField
 * @kind function
 *
 * @description
 * for each member, join several strings field and add them to
 * new field called 'searchField' (use for search filtering)
 */

angular.module('a8m.search-field', [])

  .filter('searchField', ['$parse', function ($parse) {
    return function (collection) {

      var get, field;

      collection = (isObject(collection)) ? toArray(collection) : collection;

      var args = Array.prototype.slice.call(arguments, 1);

      if(!isArray(collection) || !args.length) {
        return collection;
      }

      return collection.map(function(member) {

        field = args.map(function(field) {
          get = $parse(field);
          return get(member);
        }).join(' ');

        return extend(member, { searchField: field });
      });
    }
  }]);

/**
 * @ngdoc filter
 * @name toArray
 * @kind function
 *
 * @description
 * Convert objects into stable arrays.
 * if addKey set to true,the filter also attaches a new property
 * $key to the value containing the original key that was used in
 * the object we are iterating over to reference the property
 */

angular.module('a8m.to-array', [])

  .filter('toArray', function() {
    return function (collection, addKey) {

      if(!isObject(collection)) {
        return collection;
      }

      return (!addKey) ? toArray(collection) :

        Object.keys(collection).map(function (key) {
          return extend(collection[key], { $key: key });
        });
    }
  });

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

      collection = (isObject(collection)) ? toArray(collection) : collection;

      if (!isArray(collection)) {
        return collection;
      }

      //store all unique identifiers
      var uniqueItems = [],
          get = $parse(property);

      return (isUndefined(property)) ?
        //if it's kind of primitive array
        collection.filter(function (elm, pos, self) {
          return self.indexOf(elm) === pos;
        }) :
        //else compare with equals
        collection.filter(function (elm) {
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

/**
 * @ngdoc filter
 * @name where
 * @kind function
 *
 * @description
 * of each element in a collection to the given properties object,
 * returning an array of all elements that have equivalent property values.
 *
 */

angular.module('a8m.where', [])
  .filter('where', function() {
    return function (collection, object) {

      if(isUndefined(object)) {
        return collection;
      }
      collection = (isObject(collection)) ?
        toArray(collection) : collection;

      return collection.filter(function (elm) {
        return objectContains(object, elm);
      });
    }
  });

/**
 * @ngdoc filter
 * @name xor
 * @kind function
 *
 * @description
 * Exclusive or filter by expression
 */

angular.module('a8m.xor', [])

  .filter('xor', ['$parse', function($parse) {
    return function (col1, col2, expression) {

      expression = expression || false;

      col1 = (isObject(col1)) ? toArray(col1) : col1;
      col2 = (isObject(col2)) ? toArray(col2) : col2;

      if(!isArray(col1) || !isArray(col2)) return col1;

      return col1.concat(col2)
        .filter(function(elm) {
          return !(some(elm, col1) && some(elm, col2));
        });

      function some(el, col) {
        var getter = $parse(expression);
        return col.some(function(dElm) {
          return expression ?
            equals(getter(dElm), getter(el)) :
            equals(dElm, el);
        })
      }
    }
  }]);

/**
 * @ngdoc filter
 * @name formatBytes
 * @kind function
 *
 * @description
 * Convert bytes into appropriate display 
 * 1024 bytes => 1 KB
 */

angular.module('a8m.math.byteFmt', ['a8m.math'])

  .filter('byteFmt', ['$math', function ($math) {
    return function (bytes, decimal) {

      if(isNumber(decimal) && isFinite(decimal) && decimal%1===0 && decimal >= 0 &&
        isNumber(bytes) && isFinite(bytes)) {

        if(bytes < 1024) { // within 1 KB so B
            return convertToDecimal(bytes, decimal, $math) + ' B';
        } else if(bytes < 1048576) { // within 1 MB so KB
            return convertToDecimal((bytes / 1024), decimal, $math) + ' KB';
        } else if(bytes < 1073741824){ // within 1 GB so MB
            return convertToDecimal((bytes / 1048576), decimal, $math) + ' MB';
        } else { // GB or more
            return convertToDecimal((bytes / 1073741824), decimal, $math) + ' GB';
        }

	  } else {
		return "NaN";
	  }
    }
  }]);
/**
 * @ngdoc filter
 * @name degrees
 * @kind function
 *
 * @description
 * Convert angle from radians to degrees
 *
 */

angular.module('a8m.math.degrees', ['a8m.math'])

  .filter('degrees', ['$math', function ($math) {
    return function (radians, decimal) {
	    // if decimal is not an integer greater than -1, we cannot do. quit with error "NaN"
		// if degrees is not a real number, we cannot do also. quit with error "NaN"
		if(isNumber(decimal) && isFinite(decimal) && decimal%1===0 && decimal >= 0 &&
          isNumber(radians) && isFinite(radians)) {
		    var degrees = (radians * 180) / $math.PI;
		    return $math.round(degrees * $math.pow(10,decimal)) / ($math.pow(10,decimal));
	    } else {
          return "NaN";
		}
	}
}]);

 
 
/**
 * @ngdoc filter
 * @name formatBytes
 * @kind function
 *
 * @description
 * Convert bytes into appropriate display 
 * 1024 kilobytes => 1 MB
 */

angular.module('a8m.math.kbFmt', ['a8m.math'])

  .filter('kbFmt', ['$math', function ($math) {
    return function (bytes, decimal) {

      if(isNumber(decimal) && isFinite(decimal) && decimal%1===0 && decimal >= 0 &&
        isNumber(bytes) && isFinite(bytes)) {

        if(bytes < 1024) { // within 1 MB so KB
            return convertToDecimal(bytes, decimal, $math) + ' KB';
        } else if(bytes < 1048576) { // within 1 GB so MB
            return convertToDecimal((bytes / 1024), decimal, $math) + ' MB';
        } else {
            return convertToDecimal((bytes / 1048576), decimal, $math) + ' GB';
        }

		} else {
			return "NaN";
		}
    }
}]);
/**
 * @ngdoc module
 * @name math
 * @description
 * reference to global Math object
 */

angular.module('a8m.math', [])
  .factory('$math', ['$window', function ($window) {

    return $window.Math;

  }]);

/**
 * @ngdoc filter
 * @name max
 * @kind function
 *
 * @description
 * Math.max will get an array and return the max value. if an expression
 * is provided, will return max value by expression.
 */

angular.module('a8m.math.max', ['a8m.math'])

  .filter('max', ['$math', '$parse', function ($math, $parse) {
    return function (input, expression) {

      if(!isArray(input)) {
        return input;
      }
      return isUndefined(expression)
        ? $math.max.apply($math, input)
        : input[indexByMax(input, expression)];
    };

    /**
     * @private
     * @param array
     * @param exp
     * @returns {number|*|Number}
     */
    function indexByMax(array, exp) {
      var mappedArray = array.map(function(elm){
        return $parse(exp)(elm);
      });
      return mappedArray.indexOf($math.max.apply($math, mappedArray));
    }

  }]);
/**
 * @ngdoc filter
 * @name min
 * @kind function
 *
 * @description
 * Math.min will get an array and return the min value. if an expression
 * is provided, will return min value by expression.
 */

angular.module('a8m.math.min', ['a8m.math'])

  .filter('min', ['$math', '$parse', function ($math, $parse) {
    return function (input, expression) {

      if(!isArray(input)) {
        return input;
      }
      return isUndefined(expression)
        ? $math.min.apply($math, input)
        : input[indexByMin(input, expression)];
    };

    /**
     * @private
     * @param array
     * @param exp
     * @returns {number|*|Number}
     */
    function indexByMin(array, exp) {
      var mappedArray = array.map(function(elm){
        return $parse(exp)(elm);
      });
      return mappedArray.indexOf($math.min.apply($math, mappedArray));
    }

  }]);
/**
 * @ngdoc filter
 * @name Percent
 * @kind function
 *
 * @description
 * percentage between two numbers
 *
 */

angular.module('a8m.math.percent', ['a8m.math'])

  .filter('percent', ['$math', '$window', function ($math, $window) {

    return function (input, divided, round) {

      var divider = (isString(input)) ? $window.Number(input) : input;
      divided = divided || 100;
      round = round || false;

      if (!isNumber(divider) || $window.isNaN(divider)) return input;

      return (round) ? $math.round((divider / divided) * 100) :
        ((divider / divided) * 100);
    }

  }]);

/**
 * @ngdoc filter
 * @name toRadians
 * @kind function
 *
 * @description
 * Convert angle from degrees to radians
 *
 */

angular.module('a8m.math.radians', ['a8m.math'])

  .filter('radians', ['$math', function ($math) {
    return function (degrees, decimal) {
	  // if decimal is not an integer greater than -1, we cannot do. quit with error "NaN"
	  // if degrees is not a real number, we cannot do also. quit with error "NaN"
        if(isNumber(decimal) && isFinite(decimal) && decimal%1===0 && decimal >= 0 &&
          isNumber(degrees) && isFinite(degrees)) {
          var radians = (degrees * 3.14159265359) / 180;
          return $math.round(radians * $math.pow(10,decimal)) / ($math.pow(10,decimal));
		} else {
		    return "NaN";
		}
	}
}]);

 
 
/**
 * @ngdoc filter
 * @name Radix
 * @kind function
 *
 * @description
 * converting decimal numbers to different bases(radix)
 */

angular.module('a8m.math.radix', [])

  .filter('radix', function () {

    return function (input, radix) {

      var RANGE = /^[2-9]$|^[1-2]\d$|^3[0-6]$/;

      if(!isNumber(input) || !RANGE.test(radix)) {
        return input;
      }

      return input.toString(radix).toUpperCase();

    }

  });

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

  .filter('shortFmt', ['$math', function ($math) {
    return function (number, decimal) {
      if(isNumber(decimal) && isFinite(decimal) && decimal%1===0 && decimal >= 0 &&
        isNumber(number) && isFinite(number)){
                    
          if(number < 1e3) {
              return number;
          } else if(number < 1e6) {
              return convertToDecimal((number / 1e3), decimal, $math) + ' K';
          } else if(number < 1e9){
              return convertToDecimal((number / 1e6), decimal, $math) + ' M';
          } else {
            return convertToDecimal((number / 1e9), decimal, $math) + ' B';
          }

	  }else{
        return "NaN";
	  }
	}
}]);
/**
 * @ngdoc filter
 * @name sum
 * @kind function
 *
 * @description
 * Sum up all values within an array
 *
 */

angular.module('a8m.math.sum', [])

  .filter('sum', function () {
    return function (input, initial) {

      return (!isArray(input)) ? input :
        input.reduce(function(prev, curr) {
          return prev + curr;
        }, initial || 0);

    }

  });


/**
 * @ngdoc filter
 * @name timeFmt
 * @kind function
 *
 * @description
 * converting time in seconds to appropriate format (34 minutes ago)
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

/**
 * @ngdoc filter
 * @name endsWith
 * @kind function
 *
 * @description
 * checks whether string ends with the ends parameter.
 */

angular.module('a8m.ends-with', [])

  .filter('endsWith', function () {
    return function (input, ends, csensitive) {

      var sensitive = csensitive || false,
        position;

      if(!isString(input) || isUndefined(ends)) {
        return input;
      }

      input = (sensitive) ? input : input.toLowerCase();
      position = input.length - ends.length;

      return input.indexOf((sensitive) ? ends : ends.toLowerCase(), position) !== -1;
    }
  });

/**
 * @ngdoc filter
 * @name ltrim
 * @kind function
 *
 * @description
 * Left trim. Similar to trimFilter, but only for left side.
 */

angular.module('a8m.ltrim', [])

  .filter('ltrim', function () {
    return function(input, chars) {

      var trim = chars || '\\s';

      if(!isString(input)) {
        return input;
      }

      return input.replace(new RegExp('^' + trim + '+'), '');
    }
  });

/**
 * @ngdoc filter
 * @name repeat
 * @kind function
 *
 * @description
 * Repeats a string n times
 */

angular.module('a8m.repeat', [])

  .filter('repeat',[ function () {
    return function (input, n, separator) {

      var times = ~~n;

      if(!isString(input)) {
        return input;
      }

      return (!times) ? input : strRepeat(input, --n, separator || '');
    }
  }]);

/**
 * Repeats a string n times with given separator
 * @param str string to repeat
 * @param n number of times
 * @param sep separator
 * @returns {*}
 */
function strRepeat(str, n, sep) {
  if(!n) {
    return str;
  }
  return str + sep + strRepeat(str, --n, sep);
}
/**
* @ngdoc filter
* @name rtrim
* @kind function
*
* @description
* Right trim. Similar to trimFilter, but only for right side.
*/

angular.module('a8m.rtrim', [])

  .filter('rtrim', function () {
    return function(input, chars) {

      var trim = chars || '\\s';

      if(!isString(input)) {
        return input;
      }

      return input.replace(new RegExp(trim + '+$'), '');
    }
  });

/**
 * @ngdoc filter
 * @name slugify
 * @kind function
 *
 * @description
 * remove spaces from string, replace with "-" or given argument
 */

angular.module('a8m.slugify', [])

  .filter('slugify',[ function () {
    return function (input, sub) {

      var replace = (isUndefined(sub)) ? '-' : sub;

      if(isString(input)) {
        return input.toLowerCase()
          .replace(/\s+/g, replace);
      }

      return input;
    }
  }]);

/**
 * @ngdoc filter
 * @name startWith
 * @kind function
 *
 * @description
 * checks whether string starts with the starts parameter.
 */

angular.module('a8m.starts-with', [])

  .filter('startsWith', function () {
    return function (input, start, csensitive) {

      var sensitive = csensitive || false;

      if(!isString(input) || isUndefined(start)) {
        return input;
      }

      input = (sensitive) ? input : input.toLowerCase();

      return !input.indexOf((sensitive) ? start : start.toLowerCase());
    }
  });

/**
 * @ngdoc filter
 * @name stringular
 * @kind function
 *
 * @description
 * get string with {n} and replace match with enumeration values
 */

angular.module('a8m.stringular', [])
  .filter('stringular', function () {
    return function(input) {

      var args = Array.prototype.slice.call(arguments, 1);

      return input.replace(/{(\d+)}/g, function (match, number) {
        return isUndefined(args[number]) ? match : args[number];
      });

    }
  });

/**
 * @ngdoc filter
 * @name stripTags
 * @kind function
 *
 * @description
 * strip html tags from string
 */

angular.module('a8m.strip-tags', [])
  .filter('stripTags', function () {
    return function(input) {
      if(isString(input)) {
        return input.replace(/<\S[^><]*>/g, '');
      }
      return input;
    }
  });

/**
 * @ngdoc filter
 * @name trim
 * @kind function
 *
 * @description
 *  Strip whitespace (or other characters) from the beginning and end of a string
 */

angular.module('a8m.trim', [])

  .filter('trim', function () {
    return function(input, chars) {

      var trim = chars || '\\s';

      if(!isString(input)) {
        return input;
      }

      return input.replace(new RegExp('^' + trim + '+|' + trim + '+$', 'g'), '');
    }
  });

/**
 * @ngdoc filter
 * @name truncate
 * @kind function
 *
 * @description
 * truncates a string given a specified length, providing a custom string to denote an omission.
 */

angular.module('a8m.truncate', [])
  .filter('truncate', function () {
    return function(input, length, suffix, preserve) {

      length = isUndefined(length) ? input.length : length;
      preserve = preserve || false;
      suffix = suffix || '';

      if(!isString(input) || (input.length <= length)) return input;

      return input.substring(0, (preserve) ?
          ((input.indexOf(' ', length) === -1) ? input.length : input.indexOf(' ', length)) :
          length) + suffix;

    };
  });

/**
 * @ngdoc filter
 * @name ucfirst
 * @kind function
 *
 * @description
 * ucfirst
 *
 */

angular.module('a8m.ucfirst', [])

  .filter('ucfirst', [function() {
    return function(input) {
      return angular.isString(input) ? input.split(' ')
        .map(function (char) {
          return char.charAt(0).toUpperCase() + char.substring(1);
        }).join(' ') : input;
    }

  }]);

/**
 * @ngdoc filter
 * @name uriComponentEncode
 * @kind function
 *
 * @description
 * get string as parameter and return encoded string
 */

angular.module('a8m.uri-component-encode', [])

  .filter('uriComponentEncode',['$window', function ($window) {
      return function (input) {

        if(isString(input)) {
          return $window.encodeURIComponent(input);
        }

        return input;
      }
    }]);

/**
 * @ngdoc filter
 * @name uriEncode
 * @kind function
 *
 * @description
 * get string as parameter and return encoded string
 */

angular.module('a8m.uri-encode', [])

  .filter('uriEncode',['$window', function ($window) {
      return function (input) {

        if(isString(input)) {
          return $window.encodeURI(input);
        }

        return input;
      }
    }]);

/**
 * @ngdoc filter
 * @name wrap
 * @kind function
 *
 * @description
 * Wrap a string with another string
 */

angular.module('a8m.wrap', [])

  .filter('wrap', function () {
    return function(input, wrap, ends) {

      if(!isString(input) || isUndefined(wrap)) {
        return input;
      }

      return [wrap, input, ends || wrap].join('');

    }
  });

/**
 * @ngdoc provider
 * @name filterWatcher
 * @kind function
 *
 * @description
 * store specific filters result in $$cache, based on scope life time(avoid memory leak).
 * on scope.$destroy remove it's cache from $$cache container
 */

angular.module('a8m.filter-watcher', [])
  .provider('filterWatcher', function() {

    this.$get = ['$window', '$rootScope', function($window, $rootScope) {

      /**
       * Cache storing
       * @type {Object}
       */
      var $$cache = {};

      /**
       * Scope listeners container
       * scope.$destroy => remove all cache keys
       * bind to current scope.
       * @type {Object}
       */
      var $$listeners = {};

      /**
       * $timeout without triggering the digest cycle
       * @type {function}
       */
      var $$timeout = $window.setTimeout;

      /**
       * @description
       * get `HashKey` string based on the given arguments.
       * @param fName
       * @param args
       * @returns {string}
       */
      function getHashKey(fName, args) {
        return [fName, angular.toJson(args)]
          .join('#')
          .replace(/"/g,'');
      }

      /**
       * @description
       * fir on $scope.$destroy,
       * remove cache based scope from `$$cache`,
       * and remove itself from `$$listeners`
       * @param event
       */
      function removeCache(event) {
        var id = event.targetScope.$id;
        forEach($$listeners[id], function(key) {
          delete $$cache[key];
        });
        delete $$listeners[id];
      }

      /**
       * @description
       * for angular version that greater than v.1.3.0
       * if clear cache when the digest cycle end.
       */
      function cleanStateless() {
        $$timeout(function() {
          if(!$rootScope.$$phase)
            $$cache = {};
        });
      }

      /**
       * @description
       * Store hashKeys in $$listeners container
       * on scope.$destroy, remove them all(bind an event).
       * @param scope
       * @param hashKey
       * @returns {*}
       */
      function addListener(scope, hashKey) {
        var id = scope.$id;
        if(isUndefined($$listeners[id])) {
          scope.$on('$destroy', removeCache);
          $$listeners[id] = [];
        }
        return $$listeners[id].push(hashKey);
      }

      /**
       * @description
       * return the `cacheKey` or undefined.
       * @param filterName
       * @param args
       * @returns {*}
       */
      function $$isMemoized(filterName, args) {
        var hashKey = getHashKey(filterName, args);
        return $$cache[hashKey];
      }

      /**
       * @description
       * store `result` in `$$cache` container, based on the hashKey.
       * add $destroy listener and return result
       * @param filterName
       * @param args
       * @param scope
       * @param result
       * @returns {*}
       */
      function $$memoize(filterName, args, scope, result) {
        var hashKey = getHashKey(filterName, args);
        //store result in `$$cache` container
        $$cache[hashKey] = result;
        // for angular versions that less than 1.3
        // add to `$destroy` listener, a cleaner callback
        if(isScope(scope)) {
          addListener(scope, hashKey);
        } else {
          cleanStateless();
        }
        return result;
      }

      return {
        isMemoized: $$isMemoized,
        memoize: $$memoize
      }

    }];
  });




















/**
 * @ngdoc module
 * @name angular.filters
 * @description
 * Bunch of useful filters for angularJS
 */

angular.module('angular.filter', [

  'a8m.ucfirst',
  'a8m.uri-encode',
  'a8m.uri-component-encode',
  'a8m.slugify',
  'a8m.strip-tags',
  'a8m.stringular',
  'a8m.truncate',
  'a8m.starts-with',
  'a8m.ends-with',
  'a8m.wrap',
  'a8m.trim',
  'a8m.ltrim',
  'a8m.rtrim',
  'a8m.repeat',

  'a8m.to-array',
  'a8m.concat',
  'a8m.contains',
  'a8m.unique',
  'a8m.is-empty',
  'a8m.after',
  'a8m.after-where',
  'a8m.before',
  'a8m.before-where',
  'a8m.defaults',
  'a8m.where',
  'a8m.reverse',
  'a8m.remove',
  'a8m.remove-with',
  'a8m.group-by',
  'a8m.count-by',
  'a8m.search-field',
  'a8m.fuzzy-by',
  'a8m.fuzzy',
  'a8m.omit',
  'a8m.pick',
  'a8m.every',
  'a8m.filter-by',
  'a8m.xor',
  'a8m.map',
  'a8m.first',
  'a8m.last',
  'a8m.flatten',

  'a8m.math',
  'a8m.math.max',
  'a8m.math.min',
  'a8m.math.percent',
  'a8m.math.radix',
  'a8m.math.sum',
  'a8m.math.degrees',
  'a8m.math.radians',
  'a8m.math.byteFmt',
  'a8m.math.kbFmt',
  'a8m.math.shortFmt',

  'a8m.angular',
  'a8m.conditions',
  'a8m.is-null',

  'a8m.filter-watcher'
]);
})( window, window.angular );