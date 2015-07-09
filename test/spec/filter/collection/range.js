'use strict';

describe('rangeFilter', function() {
  var filter;

  beforeEach(module('a8m.range'));
  beforeEach(inject(function ($filter) {
    filter = $filter('range');
  }));

  it('should return an array of 10 items', function() {
    expect(filter([], 10)).toEqual([0,1,2,3,4,5,6,7,8,9]);
    expect(filter([], 10).length).toEqual(10);
  });
});