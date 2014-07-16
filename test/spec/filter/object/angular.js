'use strict';

describe('angularFilter', function () {

  var isDefined,
      isUndefined,
      isFunction,
      isString,
      isNumber,
      isObject,
      isArray,
      isEqual;

  beforeEach(module('a8m.angular'));

  beforeEach(inject(function ($filter) {
    isDefined = $filter('isDefined');
    isUndefined = $filter('isUndefined');
    isFunction = $filter('isFunction');
    isString = $filter('isString');
    isNumber = $filter('isNumber');
    isObject = $filter('isObject');
    isArray = $filter('isArray');
    isEqual = $filter('isEqual');
  }));

  it('should called angular.isDefined method with the given input', function() {

    spyOn(angular, 'isDefined');
    isDefined(undefined);
    expect(angular.isDefined).toHaveBeenCalledWith(undefined)

  });

  it('should called angular.isUndefined method with the given input', function() {

    spyOn(angular, 'isUndefined');
    isUndefined(undefined);
    expect(angular.isUndefined).toHaveBeenCalledWith(undefined)

  });

  it('should called angular.isFunction method with the given input', function() {

    var func = function() {};
    spyOn(angular, 'isFunction');
    isFunction(func);
    expect(angular.isFunction).toHaveBeenCalledWith(func)

  });

  it('should called angular.isString method with the given input', function() {

    spyOn(angular, 'isString');
    isString('string');
    expect(angular.isString).toHaveBeenCalledWith('string')

  });

  it('should called angular.isNumber method with the given input', function() {

    spyOn(angular, 'isNumber');
    isNumber(777);
    expect(angular.isNumber).toHaveBeenCalledWith(777)

  });

  it('should called angular.isArray method with the given input', function() {

    spyOn(angular, 'isArray');
    isArray([]);
    expect(angular.isArray).toHaveBeenCalledWith([])

  });

  it('should called angular.isObject method with the given input', function() {

    spyOn(angular, 'isObject');
    isObject({});
    expect(angular.isObject).toHaveBeenCalledWith({})

  });

  it('should called angular.equals method with the given input', function() {

    var o1 = {}, o2 = {};
    spyOn(angular, 'equals');
    isEqual(o1, o2);
    expect(angular.equals).toHaveBeenCalledWith(o1, o2)

  });


});
