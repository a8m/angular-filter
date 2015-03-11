'use strict';

describe('medianFilter', function () {

  var filter;

  beforeEach(module('a8m.math.median'));

  beforeEach(inject(function ($filter) {
    filter = $filter('median');
  }));

  it('should get an array of numbers and return the median one', function() {
    expect(filter([1,2,3,4,5])).toEqual(3);
    expect(filter([2,8,2,12,2,1,5])).toEqual(2);
    expect(filter([1])).toEqual(1);
  });

  it('should get an !array and return it as-is', function() {
    expect(filter('string')).toEqual('string');
    expect(filter({})).toEqual({});
    expect(filter(!0)).toBeTruthy();
  });

});
