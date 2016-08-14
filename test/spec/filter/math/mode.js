'use strict';

describe('modeFilter', function () {

  var filter;

  beforeEach(module('a8m.math.mode'));

  beforeEach(inject(function ($filter) {
    filter = $filter('mode');
  }));

  it('should get an array of numbers and return the mode', function() {
    expect(filter([1,2,3,4,5])).toEqual(1);
    expect(filter([2,0,2,2,2])).toEqual(2);
    expect(filter([1,2.32,2.32,7,5])).toEqual(2.32);
    expect(filter([4])).toEqual(4);
  });


  it('should get an !array and return it as-is', function() {
    expect(filter('string')).toEqual('string');
    expect(filter({})).toEqual({});
    expect(filter(!0)).toBeTruthy();
  });

});
