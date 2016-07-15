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

  it('should return 10 items starting at 10 incrementing by 1', function() {
    expect(filter([], 10, 10)).toEqual([10,11,12,13,14,15,16,17,18,19]);
    expect(filter([], 10).length).toEqual(10);
  });

  it('should return 10 items starting at 10 incrementing by 10 ', function() {
    expect(filter([], 10, 10, 10)).toEqual([10,20,30,40,50,60,70,80,90,100]);
    expect(filter([], 10).length).toEqual(10);
  });

  it('should return 10 items starting at 10 incrementing by 10 and multiplied by 2.', function() {
    expect(filter([], 10, 10, 10, function(n) { return 2 * n; }))
      .toEqual([20,40,60,80,100,120,140,160,180,200]);
    expect(filter([], 10).length).toEqual(10);
  });

});