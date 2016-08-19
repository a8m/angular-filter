'use strict';

describe('meanFilter', function () {

  var filter;

  beforeEach(module('a8m.math.mean'));

  beforeEach(inject(function ($filter) {
    filter = $filter('mean');
  }));

  it('should return the mean of all members in array', function() {
    expect(filter([1,2,3,4,5,6])).toEqual(3.5);
    expect(filter([0,0,0,0,0,3])).toEqual(0.5);
  });

  it('should return an object if the members type != number', function() {
    expect(typeof filter([{}, 'string', 'foo'])).toEqual('object')
  });

  it('should return the input as-is if is not an array', function() {
    expect(filter('string')).toEqual('string');
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
  })

});
