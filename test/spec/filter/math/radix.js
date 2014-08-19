'use strict';

describe('radixFilter', function () {

  var filter;

  beforeEach(module('a8m.math.radix'));

  beforeEach(inject(function ($filter) {
    filter = $filter('radix');
  }));

  it('should converting decimal numbers to different bases(radix)', function() {
    expect(filter(8, 2)).toEqual('1000');
    expect(filter(15, 16)).toEqual('F');
    expect(filter(32586, 16)).toEqual('7F4A');
    expect(filter(32, 8)).toEqual('40');
  });

  it('should not be able to convert base less than 2 , and bigger than 36', function() {
    expect(filter(998, 37)).toEqual(998);
    expect(filter(15, 1)).toEqual(15);
  });

  it('should get a !number and return it as-is', function() {

    expect(filter('string')).toEqual('string');
    expect(filter({})).toEqual({});
    expect(filter(!0)).toBeTruthy();

  });

});
