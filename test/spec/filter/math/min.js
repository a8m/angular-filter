'use strict';

describe('minFilter', function () {

  var filter;

  beforeEach(module('math.min'));

  beforeEach(inject(function ($filter) {
    filter = $filter('min');
  }));

  it('should get an array of numbers and return the lowest one', function() {

    expect(filter([1,2,3,4,5])).toEqual(1);
    expect(filter([2,0,2,2,2])).toEqual(0);
    expect(filter([1])).toEqual(1);

  });

  it('should get an !array and return it as-is', function() {

    expect(filter('string')).toEqual('string');
    expect(filter({})).toEqual({});
    expect(filter(!0)).toBeTruthy();

  });

});
