'use strict';

describe('sumFilter', function () {

  var filter;

  beforeEach(module('a8m.math.sum'));

  beforeEach(inject(function ($filter) {
    filter = $filter('sum');
  }));

  it('should return the sum of all members in array', function() {
    expect(filter([1,2,3,4,5,6])).toEqual(21);
    expect(filter([0,0,0,0,0,1])).toEqual(1);
  });

  it('should be able to get an initial value', function() {
    expect(filter([2,3,5], 10)).toEqual(20);
    expect(filter([2,3,5], -10)).toEqual(0);
  });

  it('should return a string if the members type != number', function() {
    expect(typeof filter([{}, 'string', 'foo'])).toEqual('string')
  });

  it('should return the input as-is if is not an array', function() {
    expect(filter('string')).toEqual('string');
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
  })

});
