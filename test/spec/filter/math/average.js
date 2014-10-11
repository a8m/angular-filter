'use strict';

describe('averageFilter', function () {

  var filter;

  beforeEach(module('a8m.math.average'));

  beforeEach(inject(function ($filter) {
    filter = $filter('average');
  }));

  it('should get an array of numbers and return its average', function() {

    expect(filter([1,2,3,4,5])).toEqual(3);
    expect(filter([1,2,3,4,5,6])).toEqual(3.5);
    expect(filter([2,2,2,2,2])).toEqual(2);
    expect(filter([1])).toEqual(1);

  });

  it('should get an !array and return it as-is', function() {

    expect(filter('angular')).toEqual('angular');
    expect(filter({})).toEqual({});
    expect(filter(!0)).toBeTruthy();

  });

});
